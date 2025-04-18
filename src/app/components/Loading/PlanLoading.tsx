import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

function PlanLoading() {
  return (
    <div
      className={`fixed flex-col gap-4 top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-70 z-50 bg-white
          }`}
    >
      <ClipLoader
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <div className="text-xl font-bold animate-pulse">생성 중입니다...</div>
    </div>
  );
}

export default PlanLoading;
