interface OneTimeLink {
  one_time_id: string;
  plan_id: number;
  expiration_time: number;
  from_city: string;
  to_city: string;
  transport: string;
  nights: number;
  days: number;
  keywords: string;
  created_at: string;
}

import { Pool } from "@/app/lib/db";
import { Plan } from "@/app/Type";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const oneTimeId = searchParams.get("oneTimeId");

    if (!oneTimeId) {
      return NextResponse.json(
        { error: "oneTimeId is missing." },
        { status: 400 }
      );
    }

    // 일회성 링크 데이터 조회
    const [link] = await Pool.execute(
      `SELECT * FROM one_time_links WHERE one_time_id = ?`,
      [oneTimeId]
    );

    const linkRow = (link as OneTimeLink[])[0];
    const expirationTime = linkRow.expiration_time;
    const now = Date.now();

    if (expirationTime < now) {
      return NextResponse.json({ error: "Link expired." }, { status: 400 });
    }

    const planId = linkRow.plan_id;

    const [plan] = await Pool.execute("SELECT * FROM plans WHERE id = ?", [
      planId,
    ]);
    if (!plan) {
      return NextResponse.json({ error: "Plan not found." }, { status: 400 });
    }

    const planRow = (plan as Plan[])[0];
    const toCity = planRow.to_city;
    const [city] = await Pool.execute("SELECT * FROM TOUR WHERE city = ?", [
      toCity,
    ]);

    const [itinerary] = await Pool.execute(
      "SELECT * FROM itineraries WHERE plan_id = ?",
      [planId]
    );
    if (!itinerary) {
      return NextResponse.json(
        { error: "Itinerary not found." },
        { status: 400 }
      );
    }

    const [places] = await Pool.execute(
      "SELECT * FROM places WHERE plan_id = ?",
      [planId]
    );
    if (!places) {
      return NextResponse.json(
        { error: "Places are not found." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      planId,
      plan: plan,
      city: city,
      itinerary: itinerary,
      places: places,
    });
  } catch (err) {
    console.error("Error: ", err);
    return NextResponse.json({ err }, { status: 500 });
  }
}
