import mysql from "mysql2/promise";
import { NextResponse } from "next/server";

const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const db = process.env.DB_DBNAME;
const port = 3306;

// MySQL 데이터베이스 연결 설정
const pool = mysql.createPool({
  host: host,
  port: port,
  user: user,
  password: password,
  database: db,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function GET(req: Request) {
  try {
    const { planId } = await req.json();

    if (!planId) {
      return NextResponse.json(
        { error: "planId is missing." },
        { status: 400 }
      );
    }

    const [plan] = await pool.execute("SELECT * FROM plans WHERE id = ?", [
      planId,
    ]);
    if (!plan) {
      return NextResponse.json({ error: "Plan not found." }, { status: 400 });
    }

    const [itinerary] = await pool.execute("SELECT * FROM itineraries WHERE plan_id = ?", [planId]);
    if (!itinerary) {
        return NextResponse.json({ error: "Itinerary not found." }, { status: 400 });
    }

    const [places] = await pool.execute('SELECT * FROM places WHERE plan_id = ?', [planId]);
    if (!places) {
        return NextResponse.json({ error: "Places are not found." }, { status: 400 });
    }

    return NextResponse.json({
        planId,
        itinerary: itinerary,
        places: places,
      });
      
  } catch (err) {
    console.error("Error: ", err);

    return NextResponse.json({ err }, { status: 500 });
  }
}
