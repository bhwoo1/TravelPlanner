import { Location, Place } from "@/app/Type";
import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";
import React, { useEffect, useState } from "react";
import PlaceBlock from "./block/PlaceBlock";

const api_key = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!;
const map_id = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID;

function MapComponent({ places }: { places: Place[] }) {
  const [locationArr, setLocationArr] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPlace = async () => {
      setIsLoading(true); // 로딩 시작
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
      } finally {
        setIsLoading(false); // 로딩 끝
      }
    };
    fetchPlace();
  }, [places]);
  return (
    <div className="flex flex-row gap-4">
      {isLoading ? (
        <p>🗺️ 로딩 중...</p>
      ) : (
        <>
          <div className="hidden lg:block">
            <APIProvider apiKey={api_key}>
              {locationArr.length > 0 ? (
                <Map
                  mapId={map_id}
                  style={{ width: "600px", height: "600px" }}
                  defaultZoom={12}
                  defaultCenter={{
                    lat: locationArr[0].lat,
                    lng: locationArr[0].lng,
                  }}
                >
                  {locationArr.map((location) => (
                    <AdvancedMarker
                      key={location.id}
                      position={{ lat: location.lat, lng: location.lng }}
                    />
                  ))}
                </Map>
              ) : (
                <div
                  style={{
                    width: "600px",
                    height: "600px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <p>📍 장소 정보가 없습니다.</p>
                </div>
              )}
            </APIProvider>
          </div>
          <div className="flex flex-col h-[600px] w-[900px] overflow-y-scroll">
            {locationArr.map((location) => (
              <div key={location.id}>
                <PlaceBlock location={location} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default MapComponent;
