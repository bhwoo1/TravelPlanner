import { NextResponse } from "next/server";
import OpenAI from "openai";

const gptClient = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPEN_AI_API
});

export async function POST(req: Request) {
    try {
        const { from, to, transport, nights, days, keywords } = await req.json();

        const stringNights = String(nights);
        const stringDays = String(days);

        if (!from || !to || !transport || !stringNights || !stringDays) {
            return NextResponse.json({error: "Required field is missing."}, {status: 400});           
        }

        const response = await gptClient.responses.create({
            model: "gpt-4o",
            input: `다음 조건에 맞는 여행 일정을 만들어 주세요.
                - 출발지: ${from},
                - 여행지: ${to},
                - 이동수단: ${transport}
                - 기간: ${nights}박 ${days}일
                - 하고 싶은 활동: ${keywords}


                조건:
                - 출발지에서 도착지까지 제시한 이동수단으로 이동하는 경로를 알려주세요.
                - 실제 존재하는 장소로 추천해주세요.
                - 일정에 나온 장소 이름과 주소를 따로 목록으로 만들어 알려주세요.
                - 만약 출발지에서 여행지까지 사용자가 선택한 교통수단으로 갈 수 없는 곳이면 대체 교통을 해당 이동수단의 details에 알려주세요.
                - 결과는 JSON 형식으로 itinerary(time, activity, details), places(name, address)로 응답해주세요.
            `
        });


        if (!response) return NextResponse.json({error: "Failed to Plan"}, {status: 400});  
        console.log(response.output_text);
        return NextResponse.json({ result: response.output_text }, { status: 200 });
    } catch (err) {
        console.error("Error: ", err);

        return NextResponse.json({err}, {status: 500});
    }
}