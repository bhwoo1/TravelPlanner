import { Place } from "@/app/Type";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import React from "react";

const api_key = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!;

const containerStyle = {
  width: "800px",
  height: "600px",
};

const center = {
  lat: 14.018,
  lng: 120.835941,
};



function Map({places}: {places: Place[]}) {
    console.log(places)
  return (
    <div>
      <div className="hidden lg:block">
        <LoadScript googleMapsApiKey={api_key}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={14}
          >
            <></>
          </GoogleMap>
        </LoadScript>
      </div>
      {places.map((place) => (
        <div key={place.id}>
            {place.name}
        </div>
      ))}
    </div>
  );
}

export default Map;
