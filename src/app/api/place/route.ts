import { NextResponse } from "next/server";

const api_key = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!;

export async function POST(req: Request) {
    const { places } = await req.json();
    const results = [];
  try {
    for (const place of places) {
        const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?fields=formatted_address,geometry&input=${encodeURIComponent(place.name)}&inputtype=textquery&key=${api_key}`;

        const res = await fetch(url);
        const data = await res.json();

        const candidates = data.candidates?.[0];
        if (candidates) {
            results.push({
                id: place.id,
                name: place.name,
                address: candidates.formatted_address,
                lat: candidates.geometry.location.lat,
                lng: candidates.geometry.location.lng
            })
        }
    }

    console.log(results)


    return NextResponse.json({results}, { status: 200 });
  } catch (err) {
    console.error("Error: ", err);

    return NextResponse.json({ err }, { status: 500 });
  }
}
