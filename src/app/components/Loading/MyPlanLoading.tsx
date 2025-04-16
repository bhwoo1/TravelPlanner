import React from 'react'

const SkeletonCard = () => (
    <div className="animate-pulse bg-gray-200 rounded-xl h-[180px] w-full" />
  );

function MyPlanLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 py-8">
    {Array.from({ length: 3 }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
  )
}

export default MyPlanLoading