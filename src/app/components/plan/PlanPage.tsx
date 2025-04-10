"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";

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

  return <div>{planId} page</div>;
}

export default PlanPage;
