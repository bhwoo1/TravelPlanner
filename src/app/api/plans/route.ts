import { NextResponse } from "next/server";
import OpenAI from "openai";
import { ResultSetHeader } from "mysql2/promise";
import { Pool } from "@/app/lib/db";

const gptClient = new OpenAI({
  apiKey: process.env.OPEN_AI_API,
});

function generateUUID() {
  return "xxxx-xxxx-xxxx-xxxx".replace(/[x]/g, () =>
    Math.floor(Math.random() * 16).toString(16)
  );
}

export async function POST(req: Request) {
  try {
    const { from, to, transport, nights, days, keywords } = await req.json();

    const stringNights = String(nights);
    const stringDays = String(days);

    if (!from || !to || !transport || !stringNights || !stringDays) {
      return NextResponse.json(
        { error: "Required field is missing." },
        { status: 400 }
      );
    }

    const response = await gptClient.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: `다음 조건에 맞는 여행 일정을 만들어 주세요.
              - 출발지: ${from},
              - 여행지: ${to},
              - 이동수단: ${transport}
              - 기간: ${nights}박 ${days}일
              - 하고 싶은 활동: ${keywords}

              조건:
              - 한국어로 답변해주세요.
              - 일정은 'itinerary'와 'places' 두 개로 나누어 주세요.
              - 'itinerary'에는 day, time, activity, details만 포함하고, 'places'에는 name, address만 포함해주세요.
              - 하루 일정은 최대 2개, 최대 5일차까지 생성해주세요.
              - 불필요한 주석이나 예약어는 포함하지 말아주세요.
              - 결과는 반드시 JSON 형식으로만 응답해주세요. 기타 주석, 설명, const, export 등은 절대 포함하지 마세요.`,

          // 조건:
          // - 답변은 한국어로 해주세요.
          // - 출발지에서 도착지까지 제시한 이동수단으로 이동하는 경로를 알려주세요.
          // - 날짜와 시간을 따로 만들어주세요. 시간은 어디 시간 기준인지 표시해야 합니다. 예: day: 1 , time: 12:00(1일차 12시)
          // - 입장 시간 제한이 있는 곳을 고려해서 답변해주세요.
          // - 각 장소의 실제 운영 시간을 고려해서 방문 시간을 정해 주세요. 예: 월~일 10:00~18:00.
          // - 운영 시간 밖의 일정은 배정하지 마세요.
          // - 운영 시간을 확인할 수 없는 장소는 일정에서 제외하거나 '운영 시간 확인 불가'로 표기해 주세요.
          // - 실제 존재하는 장소로 추천해주세요.
          // - 일정에 나온 장소 이름과 주소를 따로 목록으로 만들어 알려주세요.
          // - 주소에는 한글 혹은 영문 알파벳으로만 표기해주세요.
          // - 이름이 같은 장소가 있다면 반드시 ${to}에 있는 장소로 알려주세요.
          // - 만약 출발지에서 여행지까지 사용자가 선택한 교통수단으로 갈 수 없는 곳이면 대체 교통을 해당 이동수단의 details에 알려주세요.
          // - 하루 일정은 최대 4개까지만 만들어주세요.
          // - 결과는 React에서 사용할 수 있는 형식으로 itinerary(day, time, activity, details), places(name, address)로 응답해주세요.
          // - itinerary와 places는 별개로 분리해서 답변해주세요.
          // - 결과에 주석은 포함하지 말아주세요.
          // - 최대 10일차까지 생성해주시고 지정한 날짜는 반드시 지켜주세요.
          // - 결과에는 데이터만 포함해주세요. 기타 다른 예약어, 주석 등은 절대 삽입하지 말아주세요.`,
        },
      ],
    });

    const resultText = response.choices[0]?.message?.content;

    if (!resultText) {
      return NextResponse.json({ error: "GPT 응답 없음" }, { status: 500 });
    }
    const cleanJsonText = resultText
      .replace(/```[a-z]*\n?/gi, "")
      .replace(/```/g, "")
      .replace(/^```json\s*/, "")
      .replace(/```$/, "")
      .trim();

    const jsonData = JSON.parse(cleanJsonText);
    const { itinerary, places } = jsonData;

    const [planResult] = await Pool.execute<ResultSetHeader>(
      `INSERT INTO plans (from_city, to_city, transport, nights, days, keywords) VALUES (?, ?, ?, ?, ?, ?)`,
      [from, to, transport, nights, days, keywords]
    );

    const planId = planResult.insertId;

    for (const item of itinerary) {
      await Pool.execute(
        `INSERT INTO itineraries (plan_id, day, time, activity, details) VALUES (?, ?, ?, ?, ?)`,
        [planId, item.day, item.time, item.activity, item.details]
      );
    }

    for (const place of places) {
      await Pool.execute(
        `INSERT INTO places (plan_id, name, address) VALUES (?, ?, ?)`,
        [planId, place.name, place.address]
      );
    }

    const oneTimeId = generateUUID(); // 일회성 ID 생성
    const expirationTime = Date.now() + 3600 * 1000; // 1시간 후 만료
    await Pool.execute(
      `INSERT INTO one_time_links (one_time_id, plan_id, expiration_time, from_city, to_city, transport, nights, days, keywords)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        oneTimeId,
        planId,
        expirationTime,
        from,
        to,
        transport,
        nights,
        days,
        keywords,
      ]
    );

    return NextResponse.json({ planId, oneTimeId }, { status: 200 });
  } catch (err) {
    console.error("Error: ", err);

    return NextResponse.json({ err }, { status: 500 });
  }
}
