import { auth } from "@/app/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const session = await auth();

  const protectedPaths = ["/mypage", "/plan/myplan"];

  const authPaths = ["/signin", "/signup"];

  // 보호된 경로에 접근하려는 경우 세션이 없으면 로그인 페이지로 리다이렉트
  const isProtected = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtected && !session) {
    const loginUrl = new URL("/signin", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // 이미 로그인한 경우 signin/signup 페이지에 접근하려는 경우 리다이렉트
  const isAuthPage = authPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isAuthPage && session) {
    const homeUrl = new URL("/", request.url); // 홈 페이지 또는 원하는 페이지로 리다이렉트
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}