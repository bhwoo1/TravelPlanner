import React from 'react'
import PlaceBlock from './block/PlaceBlock'
import { Location } from '@/app/Type'

function AttractionList({locationArr}: {locationArr: Location[]}) {
  return (
    <div className="flex flex-col h-[600px] w-full overflow-y-scroll">
            {locationArr.map((location) => (
              <div key={location.id}>
                <PlaceBlock location={location} />
              </div>
            ))}
          </div>
  )
}

export default AttractionList