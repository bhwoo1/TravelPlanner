import { Tour } from "@/app/Type";
import React from "react";

function Title({ city }: { city: Tour }) {
  return (
    <div className="w-11/12 2xl:w-full text-center lg:text-start flex flex-col gap-4">
      <p className="font-bold text-[20px] leading-none">{city?.country}</p>
      <p className="text-[30px] lg:text-[120px] 2xl:text-[120px] font-bold leading-none">{city?.city}</p>
      <p className="text-[11px] lg:text-[30px] font-medium">{city?.description}</p>
    </div>
  );
}

export default Title;
