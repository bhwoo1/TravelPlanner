import { Pool } from "@/app/lib/db";
import { Plan, User } from "@/app/Type";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const planId = searchParams.get("planId");
  const userId = searchParams.get("userId");


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

      const [myPlanRow] = await Pool.execute(
        "SELECT * FROM user_plan WHERE user_id = ?",
        [userId]
      );
      const myPlans = myPlanRow as { user_id: number; plan_id: number }[];
      const planIds = myPlans.map((p) => p.plan_id);

      if (planIds.length > 0) {
        const [rows] = await Pool.execute(
          `SELECT * FROM plans WHERE id IN (${planIds
            .map(() => "?")
            .join(",")})`,
          planIds
        );

        const plans = rows as Plan[];
        console.log(plans);
        return NextResponse.json({ plans }, { status: 200 });
      } else {
        console.log("저장된 계획이 없습니다.");
        return NextResponse.json({ status: 500 });
      }
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
    const toCity = plan[0].to_city;
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
    console.error(err);
    return NextResponse.json({ status: 500 });
  }
}
