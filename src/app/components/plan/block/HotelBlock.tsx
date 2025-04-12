import { Plan } from "@/app/Type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const cityToTripAdvisorCode: { [key: string]: string } = {
  서울: "g294196",
  부산: "g294198",
  제주: "g294181",
  경주: "g294192",
  파리: "g187147",
  로마: "g187791",
  바르셀로나: "g187497",
  런던: "g186338",
  뉴욕: "g60763",
  도쿄: "g298184",
  교토: "g298564",
  시드니: "g255060",
  싱가포르: "g294265",
  이스탄불: "g293974",
  프라하: "g274684",
};

function HotelBlock({ plan }: { plan: Plan[] }) {
  const generateTripAdvisorHotelLink = (plan: Plan[]) => {

    const destinationCode = cityToTripAdvisorCode[plan[0].to_city]; // 도시명 → TripAdvisor 코드 변환
    if (!destinationCode) {
      throw new Error(`알 수 없는 도시: ${plan[0].to_city}`);
    }


    return `https://www.tripadvisor.co.kr/Hotels-${destinationCode}-호텔.html`;
  };

  return (
    <div className="w-full md:w-1/2">
      <Link href={generateTripAdvisorHotelLink(plan)} target="_blank">
        <div className="flex flex-row items-center gap-4 justify-center bg-[#34E0A1] text-white px-4 py-2 rounded-lg cursor-pointer">
          <Image
            src="/tripadvisor-icon.png"
            alt="tripadvisor_logo"
            width={50}
            height={50}
          />
          <p className="text-2xl font-bold">숙소 검색</p>
        </div>
      </Link>
    </div>
  );
}

export default HotelBlock;
