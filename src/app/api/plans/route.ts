import { NextResponse } from "next/server";
import OpenAI from "openai";
import { ResultSetHeader } from "mysql2/promise";
import { Pool } from "@/app/lib/db";

const gptClient = new OpenAI({
  apiKey: process.env.OPEN_AI_API,
});


function generateUUID() {
  return 'xxxx-xxxx-xxxx-xxxx'.replace(/[x]/g, () => Math.floor(Math.random() * 16).toString(16));
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
              - 하루 일정은 최대 4개, 최대 10일차까지 생성해주세요.
              - 불필요한 주석이나 예약어는 포함하지 말아주세요.`,
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


    const oneTimeId = generateUUID();  // 일회성 ID 생성
    const expirationTime = Date.now() + 3600 * 1000;  // 1시간 후 만료
    await Pool.execute(
      `INSERT INTO one_time_links (one_time_id, plan_id, expiration_time, from_city, to_city, transport, nights, days, keywords)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [oneTimeId, planId, expirationTime, from, to, transport, nights, days, keywords]
    );

    return NextResponse.json({ planId, oneTimeId }, { status: 200 });
  } catch (err) {
    console.error("Error: ", err);

    return NextResponse.json({ err }, { status: 500 });
  }
}
