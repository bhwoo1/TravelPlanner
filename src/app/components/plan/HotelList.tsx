import { Hotel } from '@/app/Type'
import React from 'react'
import HotelBlock from './block/HotelBlock'

function HotelList({hotelArr}: {hotelArr: Hotel[]}) {
  return (
    <div className="flex flex-col h-[600px] w-full overflow-y-scroll">
            {hotelArr.map((hotel) => (
              <div key={hotel.id}>
                <HotelBlock hotel={hotel} />
              </div>
            ))}
          </div>
  )
}

export default HotelList