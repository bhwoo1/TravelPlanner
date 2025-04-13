// import { NextResponse } from "next/server";

// const api_key = process.env.NEXT_PUBLIC_RAPID_API;

// export async function POST(req: Request) {
//     const destination = await req.json();
//     console.log(destination);
//   try {
//     const formatDate = (date: Date) => {
//       const year = date.getFullYear();
//       const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 1을 더함
//       const day = String(date.getDate()).padStart(2, "0"); // 일자리도 두 자릿수로 맞추기
//       return `${year}-${month}-${day}`; // 'YYYYMMDD' 형식으로 반환
//     };

//     // 출발일: 오늘 + 1일 (내일)
//     const departureDate = new Date();
//     departureDate.setDate(departureDate.getDate() + 1); // 하루 뒤로 설정

//     // 리턴일: 출발일 + plan.days
//     const returnDate = new Date(departureDate);
//     returnDate.setDate(departureDate.getDate() + 3); // plan.days 만큼 더함

//     // 날짜 포맷팅
//     const formattedDeparture = formatDate(departureDate); // 'YYYYMMDD'
//     const formattedReturn = formatDate(returnDate); // 'YYYYMMDD'

//     const incompleteUrl = `https://sky-scanner3.p.rapidapi.com/web/flights/search-roundtrip?placeIdFrom=GMP&placeIdTo=KIX&departDate=${formattedDeparture}&returnDate=${formattedReturn}`;

//     const incompleteRes = await fetch(incompleteUrl, {
//       method: "GET",
//       headers: {
//         "x-rapidapi-key": String(api_key),
//         "x-rapidapi-host": "sky-scanner3.p.rapidapi.com",
//       },
//     });

//     const incompleteData = await incompleteRes.json();

//     const flight = incompleteData.data?.itineraries.results.slice(0, 3)[0];
//     console.log(flight); // 결과 확인을 위해 로그 찍기

//     const carriers = flight?.legs?.[0]?.carriers?.marketing; // 옵셔널 체이닝을 사용
//     if (carriers && carriers.length > 0) {
//       const airline = carriers[0]?.name ?? "알 수 없음";
//       const airlineCode = carriers[0]?.id ?? "N/A";
//       const airlineLogo = carriers[0]?.logoUrl ?? "";
//       console.log(`항공사: ${airline} (${airlineCode})`);
//       console.log(`로고 URL: ${airlineLogo}`);
//     } else {
//       console.log("항공사 정보가 없습니다.");
//     }

//     return NextResponse.json({ status: 200 });

//     // const sessionId = incompleteData.data.context.sessionId;
//     // let status = "incomplete";
//     // let resultData = null;

//     // while (status !== "complete") {
//     //   const url = `https://sky-scanner3.p.rapidapi.com/web/flights/search-incomplete?sessionId=${sessionId}`;
//     //   const res = await fetch(url, {
//     //     headers: {
//     //       "x-rapidapi-key": "YOUR_KEY",
//     //       "x-rapidapi-host": "sky-scanner3.p.rapidapi.com",
//     //     },
//     //   });

//     //   const data = await res.json();
//     //   status = data.data.context.status;

//     //   console.log("현재 상태:", status);

//     //   if (status === "complete") {
//     //     resultData = data.data.itineraries.results;
//     //   }

//     //   // ✨ 너무 빠르게 반복하면 서버 과부하 → 약간의 delay (0.5초 정도)
//     //   if (status !== "complete") {
//     //     await new Promise((resolve) => setTimeout(resolve, 500));
//     //   }
//     // }

//     // return NextResponse.json({ status: "success", results: resultData });
//   } catch (err) {
//     console.error(err);

//     return NextResponse.json({ err }, { status: 500 });
//   }
// }
