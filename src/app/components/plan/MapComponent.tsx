import { Place } from "@/app/Type";
import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";
import React, { useEffect, useState } from "react";

const api_key = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!;
const map_id = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID;

type Location = {
  id: number;
  name: string;
  address: string;
  lat: number;
  lng: number;
};

function MapComponent({ places }: { places: Place[] }) {
  const [locationArr, setLocationArr] = useState<Location[]>([]);
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
      } catch (err) {
        console.error(err);
      }
    };
    fetchPlace();
  }, [places]);
  return (
    <div>
      <APIProvider apiKey={api_key}>
        {Array.isArray(locationArr) && locationArr.length > 0 && (
          <Map
            mapId={map_id}
            style={{ width: "600px", height: "400px" }}
            defaultZoom={12}
            defaultCenter={{ lat: locationArr[0].lat, lng: locationArr[0].lng }}
          >
            {locationArr.map((location) => (
              <AdvancedMarker
                key={location.id}
                position={{ lat: location.lat, lng: location.lng }}
              />
            ))}
          </Map>
        )}
      </APIProvider>
      {places.map((place) => (
        <div key={place.id}>{place.name}</div>
      ))}
    </div>
  );
}

export default MapComponent;
