import React from "react";

function SkeletonBox({
  width,
  height
}: {
  width?: string;
  height?: string;
}) {
  return (
    <div
      className="animate-pulse bg-gray-300 rounded-md"
      style={{ width, height }}
    />
  );
}

export default SkeletonBox;
