"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import Background from "../layout/Background";
import Title from "./Title";
import PlanBlock from "./block/PlanBlock";

const fetchPlan = async (planId: number) => {
  try {
    const res = await fetch(`/api/plan?planId=${planId}`, {
      method: "GET",
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

function PlanPage({ planId }: { planId: number }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["plan", planId],
    queryFn: () => fetchPlan(planId),
  });

  console.log(data);

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생</div>;

  return (
    <main className="flex flex-col">
      <div className="absolute top-0 w-full mt-[80px]">
        <Background imgSrc={String(data.city[0]?.image)} />
      </div>
      <section className="relative z-10 mx-24 mt-12 lg:mx-24 2xl:mx-96 flex flex-col lg:flex-row gap-12 items-center">
        <div>
          <Title city={data.city[0]} />
        </div>
        <PlanBlock plan={data.plan}/>
      </section>
    </main>
  );
}

export default PlanPage;
