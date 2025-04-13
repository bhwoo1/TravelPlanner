import { Hotel, Location } from "@/app/Type";
import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";
import React, { useEffect, useState } from "react";

const api_key = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!;
const map_id = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID;

function useWindowSize() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const updateSize = () => {
      setWidth(window.innerWidth);
    };

    updateSize(); // 초기 값 설정
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return width;
}

function MapComponent({locations}: {locations: Location[] | Hotel[]}) {
  const width = useWindowSize();
  const [mapWidth, setMapWidth] = useState("600px");
  

  useEffect(() => {
    if (width < 1260) {
      setMapWidth("100%");
    } else {
      setMapWidth("600px");
    }
  }, [width]);

  if (!locations || locations.length === 0) {
    return <div>지도에 표시할 위치 정보가 없습니다.</div>;
  }
  
  return (
      <div className="">
        <APIProvider apiKey={api_key}>
          <Map
            mapId={map_id}
            style={{ width: mapWidth, height: "600px" }}
            defaultZoom={12}
            defaultCenter={{
              lat: locations[0].lat,
              lng: locations[0].lng,
            }}
          >
            {locations.map((location) => (
              <AdvancedMarker
                key={location.id}
                position={{ lat: location.lat, lng: location.lng }}
              />
            ))}
          </Map>
        </APIProvider>
      </div>
  );
}

export default MapComponent;
