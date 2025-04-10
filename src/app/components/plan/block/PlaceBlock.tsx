import { Location } from '@/app/Type'
import React from 'react'

function PlaceBlock({location}: {location: Location}) {
  return (
    <div className="flex flex-col p-4 mb-4 bg-white rounded-2xl shadow-md">
  <p className="text-lg font-semibold text-gray-800">{location.name}</p>
  <p className="text-sm text-gray-500">{location.address}</p>
</div>
  )
}

export default PlaceBlock