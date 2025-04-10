import { Pool } from "@/app/lib/db";
import { Plan } from "@/app/Type";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const planId = searchParams.get("planId");

    if (!planId) {
      return NextResponse.json(
        { error: "planId is missing." },
        { status: 400 }
      );
    }

    const [plan] = await Pool.execute("SELECT * FROM plans WHERE id = ?", [
      planId,
    ]);
    if (!plan) {
      return NextResponse.json({ error: "Plan not found." }, { status: 400 });
    }

    const planRow = (plan as Plan[])[0];
    const toCity = planRow.to_city;
    const [city] = await Pool.execute("SELECT * FROM TOUR WHERE city = ?", [toCity])

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
