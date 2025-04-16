import { Pool } from "@/app/lib/db";
import { Plan } from "@/app/Type";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { userId, planId } = body;

  console.log(userId, planId);

  if (!planId || !userId) {
    return NextResponse.json(
      { error: "PlanId or UserId not found." },
      { status: 400 }
    );
  }

  try {
    const [user] = await Pool.execute("SELECT * FROM users WHERE id = ?", [
        userId,
      ]);
      if (!user) {
        return NextResponse.json({ error: "User not found." }, { status: 400 });
      }

    const [plan] = await Pool.execute("SELECT * FROM plans WHERE id = ?", [
      planId,
    ]);
    if (!plan) {
      return NextResponse.json({ error: "Plan not found." }, { status: 400 });
    }


    const [userPlans] = await Pool.execute("SELECT * FROM user_plan WHERE user_id = ? AND plan_id = ?", [userId, planId]);
    console.log(userPlans);

    const user_plan = userPlans as Plan[];

    if (user_plan.length != 0) {
        return NextResponse.json({ error: "Plan already saved." }, { status: 409 }); 
    }


    await Pool.execute("INSERT INTO user_plan VALUES(?, ?)", [userId, planId]);

    return NextResponse.json({status: 200});
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: 500 });
  }
}


export async function DELETE(req: Request) {
    const body = await req.json();
    const { userId, planId } = body;
  
    if (!planId || !userId) {
      return NextResponse.json(
        { error: "PlanId or UserId not found." },
        { status: 400 }
      );
    }
  
    try {
      const [user] = await Pool.execute("SELECT * FROM user_plan WHERE user_id = ?", [
          userId,
        ]);
        if (!user) {
          return NextResponse.json({ error: "Plan not found." }, { status: 400 });
        }
  
      const [plan] = await Pool.execute("SELECT * FROM user_plan WHERE plan_id = ?", [
        planId,
      ]);
      if (!plan) {
        return NextResponse.json({ error: "Plan not found." }, { status: 400 });
      }
  
  
      await Pool.execute("DELETE FROM user_plan WHERE user_id = ? AND plan_id = ?", [userId, planId]);
  
      return NextResponse.json({status: 200});
    } catch (err) {
      console.error(err);
      return NextResponse.json({ status: 500 });
    }
  }
  