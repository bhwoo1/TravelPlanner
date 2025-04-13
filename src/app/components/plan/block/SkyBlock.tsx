import { Plan } from "@/app/Type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const cityToSkyscannerCode: Record<string, string> = {
    "서울": "ICN",  // 인천공항
    "부산": "PUS",  // 김해공항
    "제주": "CJU",  // 제주공항
    "경주": "PUS",  // 김해공항
    "파리": "CDG",  // 샤를드골공항
    "로마": "FCO",  // 로마공항
    "바르셀로나": "BCN",  // 바르셀로나공항
    "런던": "LHR",  // 히드로공항
    "뉴욕": "JFK",  // JFK공항
    "도쿄": "HND",  // 하네다공항
    "교토": "KIX",  // 간사이공항
    "시드니": "SYD",  // 시드니공항
    "싱가포르": "SIN",  // 창이공항
    "이스탄불": "IST",  // 이스탄불공항
    "프라하": "PRG",  // 프라하공항
  };

function SkyBlock({ plan }: { plan: Plan[] }) {
    const destinationCode = cityToSkyscannerCode[plan[0].to_city]; // 도시명 → 공항 코드 변환
    // useEffect(() => {
    //     const fetchFlights = async (destinationCode: string) => {
          
    //       try {
    //         await fetch("/api/flight", {
    //           method: "POST",
    //           headers: {
    //             "Content-Type": "application/json",
    //           },
    //           body: JSON.stringify(destinationCode),
    //         });
    
    //       } catch (err) {
    //         console.error(err);
    //       }
    //     };
    //     fetchFlights(destinationCode);
    //   }, [destinationCode]);

  const generateSkyscannerRoundTripLink = (plan: Plan[]) => {
    const formatDate = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더함
      const day = String(date.getDate()).padStart(2, '0'); // 일자리도 두 자릿수로 맞추기
      return `${year}${month}${day}`; // 'YYYYMMDD' 형식으로 반환
    };
  
    // 출발일: 오늘 + 1일 (내일)
    const departureDate = new Date();
    departureDate.setDate(departureDate.getDate() + 1); // 하루 뒤로 설정
  
    // 리턴일: 출발일 + plan.days
    const returnDate = new Date(departureDate);
    returnDate.setDate(departureDate.getDate() + Number(plan[0].days)); // plan.days 만큼 더함
  
    // 날짜 포맷팅
    const formattedDeparture = formatDate(departureDate); // 'YYYYMMDD'
    const formattedReturn = formatDate(returnDate); // 'YYYYMMDD'

  
    // Skyscanner 링크 생성
    
    if (!destinationCode) {
      throw new Error(`알 수 없는 도시: ${plan[0].to_city}`);
    }
  
    return `https://www.skyscanner.co.kr/transport/flights/ICN/${destinationCode}/${formattedDeparture}/${formattedReturn}/?adults=1`;
  };
  return (
    <div className="w-full md:w-1/2">
    <Link href={generateSkyscannerRoundTripLink(plan)} target="_blank">
        <div className="flex flex-row text-center cursor-pointer items-center gap-4 justify-center bg-[#0770E3] text-white px-4 py-2 rounded-lg">
          <Image
            src="/skyscanner_logo.jpg"
            alt="skyscanner_logo"
            width={50}
            height={50}
          />
          <p className="text-2xl font-bold">항공편 검색</p>
        </div>
    </Link>
    </div>
  );
}

export default SkyBlock;
