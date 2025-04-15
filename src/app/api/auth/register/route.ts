import { Pool } from "@/app/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { z } from "zod";
import { RowDataPacket } from "mysql2";

// 데이터 유효성 검사에 사용할 객체 정의
const schema = z
  .object({
    email: z.string().email(), // 이메일 : 문자열
    password: z.string().min(5), // 비밀번호 : 문자열 + 최소 5글자
    confirmPassword: z.string().min(5),
    name: z.string().min(1),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export async function POST(request: Request) {
  const body = await request.json();

  const validation = schema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const { email, password, name } = body;

  const [rows] = await Pool.execute<RowDataPacket[]>(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );
  const user = rows[0];

  if (user) {
    return NextResponse.json({ error: "이미 가입된 회원입니다." }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await Pool.execute(
    "INSERT INTO users(email, password, name) VALUES (?, ?, ?)",
    [email, hashedPassword, name]
  );

  return NextResponse.json(
    { message: "User created successfully!" },
    { status: 201 }
  );
}
