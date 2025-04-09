"use client";

import React, { FormEvent, useState } from "react";

type Plan = {
  from: string;
  to: string;
  transport: string;
  nights: string;
  days: string;
  keywords?: string;
};

const initialPlan = {
  from: "",
  to: "",
  transport: "",
  nights: "",
  days: "",
  keywords: "",
};

function SearchBar() {
  const [plan, setPlan] = useState<Plan>(initialPlan);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(plan)
    const res = await fetch("/api/plan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(plan),
    });

    const data = await res.json();
    console.log(data);
    setPlan(initialPlan);
  };


  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 p-6 rounded-2xl shadow-md mx-auto w-11/12 lg:w-2/3 2xl:w-1/3 text-[12px] md:text-lg font-medium text-center justify-center items-center"
    >
      <div className="flex flex-wrap items-center gap-2">
        <p>나는</p>
        <input
          type="text"
          placeholder="출발지"
          className="border-b-2 border-gray-300 focus:outline-none focus:border-blue-400 px-2 py-1 w-32"
          value={plan.from}
          onChange={(e) => setPlan({ ...plan, from: e.target.value })}
        />
        <p>에서</p>
        <input
          type="text"
          placeholder="여행지"
          className="border-b-2 border-gray-300 focus:outline-none focus:border-blue-400 px-2 py-1 w-32"
          value={plan.to}
          onChange={(e) => setPlan({ ...plan, to: e.target.value })}
        />
        <p>로</p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <select className="border rounded-lg px-3 py-2" value={plan.transport} onChange={(e) => setPlan({ ...plan, transport: e.target.value })}>
          <option value="">교통수단 선택</option>
          <option value="car">자동차</option>
          <option value="train">기차</option>
          <option value="plane">비행기</option>
          <option value="bus">버스</option>
        </select>
        <p>를 타고</p>
        <input
          type="number"
          min={0}
          className="border rounded-lg w-16 px-2 py-1"
          placeholder="박"
          value={plan.nights}
          onChange={(e) => setPlan({ ...plan, nights: e.target.value })}
        />
        <p>박</p>
        <input
          type="number"
          min={1}
          className="border rounded-lg w-16 px-2 py-1"
          placeholder="일"
          value={plan.days}
          onChange={(e) => setPlan({ ...plan, days: e.target.value })}
        />
        <p>일 동안</p>
      </div>

      <div className="flex flex-wrap items-center gap-2 ">
        <input
          type="text"
          placeholder="하고 싶은 일"
          className="border-b-2 border-gray-300 focus:outline-none focus:border-blue-400 px-2 py-1 w-64"
          value={plan.keywords}
          onChange={(e) => setPlan({ ...plan, keywords: e.target.value })}
        />
        <p>(을)를 할거야</p>
      </div>
      <button className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-xl shadow-md w-full hover:bg-blue-400 transition-colors duration-300 text-lg font-semibold">
        여행 계획 추천해줘~
      </button>
    </form>
  );
}

export default SearchBar;
