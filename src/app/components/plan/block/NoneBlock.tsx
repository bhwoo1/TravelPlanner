import React from "react";

function NoneBlock({transport}: {transport: string}) {
  return (
    <div className="w-full md:w-1/2 flex flex-row items-center gap-4 justify-center bg-gray-600 text-white px-4 py-2 rounded-lg">
      <p className="font-bold">{transport}편은 검색이 지원되지 않습니다</p>
    </div>
  );
}

export default NoneBlock;