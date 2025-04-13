import { Hotel } from "@/app/Type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function HotelBlock({ hotel }: { hotel: Hotel }) {
  const fullQuery = `${hotel.name} ${hotel.address}`;
  const googleMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    fullQuery
  )}`;

  return (
    <Link target="_blank" href={googleMapUrl}>
      <div className="flex flex-row p-4 mb-4 bg-white rounded-2xl shadow-md gap-4 cursor-pointer">
        <div className="relative w-[100px] h-[100px] overflow-hidden rounded-xl bg-gray-100 hidden md:block">
          <Image
            src={hotel.photo === null ? "/No_IMG.jpg" : hotel.photo}
            alt="place_photo"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col">
          <p className="text-lg font-semibold text-gray-800">{hotel.name}</p>
          <p className="text-sm text-gray-500">{hotel.address}</p>
          <p className="text-sm text-gray-500">⭐{hotel.rating}</p>
        </div>
      </div>
    </Link>
  );
}

export default HotelBlock;
