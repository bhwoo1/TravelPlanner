import { Plan } from "@/app/Type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const cityToSkyscannerCode: Record<string, string> = {
    서울: "SELA",          // 인천(ICN), 김포(GMP)
    부산: "PUSA",          // 김해(PUS)
    제주: "CJUA",          // 제주(CJU)
    경주: "PUSA",          // 부산 공항 사용 (김해)
    런던: "LONA",          // LHR, LGW, STN, LCY, SEN
    교토: "OSAA",          // 간사이공항(KIX) 또는 오사카(ITM)
    도쿄: "TYOA",          // NRT, HND
    파리: "PARA",          // CDG, ORY, BVA
    로마: "ROMA",          // FCO, CIA
    바르셀로나: "BCNA",    // BCN
    싱가포르: "SINA",       // SIN
    시드니: "SYDA",         // SYD
    프라하: "PRGA",         // PRG
    뉴욕: "NYCA",           // JFK, LGA, EWR
    이스탄불: "ISTA"        // IST, SAW
  };

function SkyBlock({ plan }: { plan: Plan[] }) {
  console.log(plan[0].to_city);
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
  
    console.log(formattedDeparture);
    console.log(formattedReturn);
  
    // Skyscanner 링크 생성
    const destinationCode = cityToSkyscannerCode[plan[0].to_city]; // 도시명 → 공항 코드 변환
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
