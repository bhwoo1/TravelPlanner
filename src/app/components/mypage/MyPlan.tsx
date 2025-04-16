"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import PlanBlock from "../plan/block/PlanBlock";
import { Plan } from "@/app/Type";
import Link from "next/link";
import MyPlanLoading from "../Loading/MyPlanLoading";

const fetchMyPlan = async ({ userId }: { userId: string }) => {
  try {
    const res = await fetch(`/api/user/readplan?userId=${userId}`, {
      method: "GET",
    });

    const data = await res.json();
    console.log(data.plans);
    return data;
  } catch (err) {
    console.error(err);
  }
};

function MyPlan({ userId }: { userId: string }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["myPlan", userId],
    queryFn: () => fetchMyPlan({ userId }),
  });

  if (isLoading) return <MyPlanLoading/>;
  if (isError) return <div>에러 발생</div>;

  return (
    <div className="flex justify-center items-center">
      {!data.plans ? (
        <div className="flex items-center justify-center h-96">
        <div className="p-8 text-center max-w-md">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">아직 여행 계획이 없어요! ✈️</h1>
          <p className="text-gray-600 mb-6">지금 멋진 여행 계획을 세워보세요. 새로운 모험이 기다리고 있어요!</p>
          <Link
            href="/"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            여행 계획하러 가기
          </Link>
        </div>
      </div>
      ) : (
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4">
          {data.plans.map((plan: Plan) => {
            return (
              <div key={plan.id}>
                <Link href={`/plan/myplan/${plan.id}`}>
                  <PlanBlock plan={plan} />
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MyPlan;
