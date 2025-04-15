import { Pool } from "@/app/lib/db";
import { Plan, User } from "@/app/Type";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { userId, planId } = body;

  if (!userId) {
    return NextResponse.json(
      { error: "PlanId or UserId not found." },
      { status: 400 }
    );
  }

  if (!planId) {
    try {
      const [userRow] = await Pool.execute("SELECT * FROM users WHERE id = ?", [
        userId,
      ]);
      const user = userRow as User[];
      if (user.length === 0) {
        return NextResponse.json({ error: "User not found." }, { status: 400 });
      }

      const [plans] = await Pool.execute(
        "SELECT * FROM user_plan WHERE user_id = ?",
        [userId]
      );
      console.log(plans);
      return NextResponse.json({ plans }, { status: 200 });
    } catch (err) {
      console.error(err);
      return NextResponse.json({ status: 500 });
    }
  }

  try {
    const [userRow] = await Pool.execute("SELECT * FROM users WHERE id = ?", [
      userId,
    ]);
    const user = userRow as User[];
    console.log(user);
    if (!user[0]) {
      return NextResponse.json({ error: "User not found." }, { status: 400 });
    }

    const [userPlanRow] = await Pool.execute(
      "SELECT * FROM user_plan WHERE user_id = ? AND plan_id=?",
      [userId, planId]
    );
    const user_plan = userPlanRow as [];
    console.log(user_plan);

    if (user_plan.length === 0) {
      return NextResponse.json(
        { error: "Saved Plan not found." },
        { status: 400 }
      );
    }

    const [planRow] = await Pool.execute("SELECT * FROM plans WHERE id = ?", [
      planId,
    ]);
    const plan = planRow as Plan[];
    console.log(plan);
    if (!plan[0]) {
      return NextResponse.json({ error: "Plan not found." }, { status: 400 });
    }

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
      itinerary: itinerary,
      places: places,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: 500 });
  }
}
