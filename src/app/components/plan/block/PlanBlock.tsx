import { Plan } from "@/app/Type";
import React from "react";

function PlanBlock({ plan }: { plan: Plan[] }) {
  console.log(plan);
  return (
    <div className="relative w-full max-w-md p-6 bg-[#fff8dc] text-gray-800 rounded-lg shadow-[6px_6px_10px_rgba(0,0,0,0.1)] border-[1px] border-yellow-200 font-serif">
      <p className="text-lg font-semibold mb-2">📝 My Travel Plan</p>
      <div className="flex flex-row gap-2">
      <p className="mb-1">{plan[0].from_city}에서</p>
      <p className="mb-1">{plan[0].to_city}(으)로</p>
      </div>
      <p className="mb-1">{plan[0].transport}(을)를 타고</p>
      <div className="flex flex-col md:flex-row gap-2">
      <p className="mb-1">
        {plan[0].nights}박 {plan[0].days}일 동안
      </p>
      <p className="mb-1">{plan[0].keywords} 하기</p>
      </div>
    </div>
  );
}

export default PlanBlock;
