import { Itinerary } from "@/app/Type";
import React from "react";

function DayBlock({ day, items }: { day: string; items: Itinerary[] }) {
  return (
    <div className="relative rounded-lg shadow-lg border border-gray-200">
      <div className="absolute inset-0 bg-white opacity-35 rounded-lg z-0" />
      <div className="relative z-10 p-3 lg:p-6 space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          {day}일차
        </h2>
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-1 p-3 bg-gray-50 rounded-md border border-gray-100"
          >
            <span className="text-sm text-gray-500 font-medium">
              {item.time}
            </span>
            <span className="text-lg font-semibold text-gray-700">
              {item.activity}
            </span>
            <span className="text-sm text-gray-600">{item.details}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DayBlock;
