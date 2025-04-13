"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import Background from "../layout/Background";
import Title from "./Title";
import PlanBlock from "./block/PlanBlock";
import { Itinerary } from "@/app/Type";
import DayBlock from "./block/DayBlock";
import SkyBlock from "./block/SkyBlock";
import NoneBlock from "./block/NoneBlock";
import PlaceComponent from "./PlaceComponent";
import HotelButton from "./block/HotelButton";

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

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생</div>;

  const groupByDay = data.itinerary.reduce(
    (acc: Record<number, Itinerary[]>, item: Itinerary) => {
      if (!acc[item.day]) {
        acc[item.day] = [];
      }
      acc[item.day].push(item);
      return acc;
    },
    {} as Record<number, Itinerary[]>
  );


  return (
    <main className="flex flex-col">
      <div className="absolute top-0 w-full mt-[80px]">
        <Background imgSrc={String(data.city[0]?.image)} />
      </div>
      <section className="relative z-10 mx-24 mt-12 lg:mx-24 2xl:mx-96">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <Title city={data.city[0]} />
          <PlanBlock plan={data.plan} />
        </div>
        <div className="flex flex-col gap-4 mt-12">
          <p className="text-center font-bold text-sm">
            🛬 교통편은 실제와 다를 수 있습니다.
          </p>
          <div className="grid grid-rows lg:grid-cols-3 gap-2">
            {Object.entries(groupByDay as Record<number, Itinerary[]>).map(
              ([day, items]) => (
                <div key={day} className="">
                  <DayBlock day={day} items={items} />
                </div>
              )
            )}
          </div>
        </div>
        <div className="mt-12 w-full">
          <PlaceComponent places={data.places} />
        </div>
        <section className="flex flex-col md:flex-row mt-12 gap-2">
          {data.plan[0].transport === "비행기" ? <SkyBlock plan={data.plan} /> : <NoneBlock transport={data.plan[0].transport}/>}
          <HotelButton plan={data.plan} />
        </section>
      </section>
    </main>
  );
}

export default PlanPage;
