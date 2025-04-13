import React, { useEffect, useState } from "react";
import { Hotel, Location, Place } from "@/app/Type";
import AttractionList from "./AttractionList";
import HotelList from "./HotelList";
import MapComponent from "./MapComponent";

function PlaceComponent({ places }: { places: Place[] }) {
  const [hotelMode, sethotelMode] = useState<boolean>(false);
  const [locationArr, setLocationArr] = useState<Location[]>([]);
  const [hotelArr, setHotelArr] = useState<Hotel[]>([]);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const res = await fetch("/api/place", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ places }),
        });

        const data = await res.json();
        setLocationArr(data.results);
        setHotelArr(data.hotelData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPlace();
  }, [places]);

  return (
    <div className="flex flex-col 2xl:flex-row gap-4">
      <MapComponent locations={hotelMode === false ? locationArr : hotelArr} />
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
    </div>
  );
}

export default PlaceComponent;
