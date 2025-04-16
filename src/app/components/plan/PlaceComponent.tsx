import React, { useEffect, useState } from "react";
import { Hotel, Location, Place } from "@/app/Type";
import AttractionList from "./AttractionList";
import HotelList from "./HotelList";
import MapComponent from "./MapComponent";
import SkeletonBox from "../Loading/SkeletonBox";

function PlaceComponent({ places, to }: { places: Place[]; to: string }) {
  const [hotelMode, sethotelMode] = useState<boolean>(false);
  const [locationArr, setLocationArr] = useState<Location[]>([]);
  const [hotelArr, setHotelArr] = useState<Hotel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log(places);
    const fetchPlace = async () => {
      setIsLoading(true); // 요청 시작 시 로딩 시작
      try {
        const res = await fetch("/api/place", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ places, to }),
        });

        const data = await res.json();
        setLocationArr(data.results);
        setHotelArr(data.hotelData);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false); // 요청 끝나면 로딩 끝
      }
    };
    fetchPlace();
  }, [places, to]);

  return (
    <div className="flex flex-col 2xl:flex-row gap-4">
      <MapComponent locations={hotelMode === false ? locationArr : hotelArr} />
      {isLoading ? (
        <div className="flex flex-col gap-4">
          <SkeletonBox height="120px" />
          <SkeletonBox height="120px" />
          <SkeletonBox height="120px" />
        </div>
      ) : (
        <div className="flex flex-col h-[600px] w-full 2xl:w-2/3 gap-4">
          <label className="flex items-center gap-3 cursor-pointer self-end">
            <span className="text-sm font-medium text-gray-700">
              주변 호텔 찾기
            </span>
            <div className="relative">
              <input
                type="checkbox"
                checked={hotelMode}
                onChange={(e) => sethotelMode(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-blue-500 transition-colors duration-300"></div>
              <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow peer-checked:translate-x-full transition-transform duration-300"></div>
            </div>
          </label>
          {hotelMode === false ? (
            <AttractionList locationArr={locationArr} />
          ) : (
            <HotelList hotelArr={hotelArr} />
          )}
        </div>
      )}

      
    </div>
  );
}

export default PlaceComponent;
