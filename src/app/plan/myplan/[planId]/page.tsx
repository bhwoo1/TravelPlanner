import MyPlanPage from "@/app/components/mypage/MyPlanPage";
import React from "react";

async function page({ params }: { params: Promise<{ planId: string }> }) {
  const { planId } = await params;
  return <MyPlanPage planID={planId} />;
}

export default page;
