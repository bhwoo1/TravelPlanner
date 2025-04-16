import React from "react";
import SkeletonBox from "./SkeletonBox";

function PlanContentLoading() {
  return (
    <main className="flex flex-col">
      <section className="relative z-10 mx-24 mt-12 lg:mx-24 2xl:mx-96">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <SkeletonBox width="200px" height="40px" />
          <SkeletonBox width="300px" height="80px" />
        </div>
        <div className="m-4">
          <SkeletonBox width="120px" height="36px" />
        </div>
        <div className="mt-12 grid grid-rows lg:grid-cols-3 gap-4">
          <SkeletonBox height="150px" />
          <SkeletonBox height="150px" />
          <SkeletonBox height="150px" />
        </div>
        <div className="mt-12">
          <SkeletonBox height="600px" />
        </div>
        <div className="flex flex-col md:flex-row mt-12 gap-2">
          <div className="w-full md:w-1/2">
            <SkeletonBox height="120px" />
          </div>
          <div className="w-full md:w-1/2">
            <SkeletonBox height="120px" />
          </div>
        </div>
      </section>
    </main>
  );
}

export default PlanContentLoading;
