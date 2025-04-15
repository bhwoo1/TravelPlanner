import { NextResponse } from "next/server";

const api_key = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!;

export async function POST(req: Request) {
  const { places } = await req.json();
  const results = [];
  const hotelData = [];
  try {
    for (const place of places) {
      const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?fields=formatted_address,geometry,photos&input=${encodeURIComponent(place.name)}&inputtype=textquery&key=${api_key}`;

      const res = await fetch(url);
      const data = await res.json();

      const candidates = data.candidates?.[0];
      if (candidates) {
        const photoRef = candidates.photos?.[0]?.photo_reference;

        const photoUrl = photoRef
          ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${photoRef}&key=${api_key}`
          : null;


        results.push({
          id: place.id,
          name: place.name,
          address: candidates.formatted_address,
          lat: candidates.geometry.location.lat,
          lng: candidates.geometry.location.lng,
          photo: photoUrl,
        });
      }
    }

    const hotelResponse = await fetch('https://places.googleapis.com/v1/places:searchNearby', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': api_key,
        'X-Goog-FieldMask': 'places.displayName,places.location,places.formattedAddress,places.photos,places.rating'
      },
      body: JSON.stringify({
        includedTypes: ['lodging'], // 또는 'hotel'
        maxResultCount: 10,
        locationRestriction: {
          circle: {
            center: {
              latitude: results[0].lat,
              longitude: results[0].lng
            },
            radius: 5000.0
          }
        }
      })
    });

    const data = await hotelResponse.json();
    const hotelArray = data.places;

    for (const [index, hotel] of hotelArray.entries()) {
      hotelData.push({
        id: index,
        name: hotel.displayName.text,
        address: hotel.formattedAddress,
        lat: hotel.location.latitude,
        lng: hotel.location.longitude,
        photo: hotel.photos[0].authorAttributions[0].photoUri,
        rating: hotel.rating,
        
      });
    }

    



    return NextResponse.json({ results, hotelData }, { status: 200 });
  } catch (err) {
    console.error("Error: ", err);

    return NextResponse.json({ err }, { status: 500 });
  }
}
