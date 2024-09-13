import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export function middleware(req: NextRequest) {
  const token = cookies().get("token")?.value;
  const protectedPaths = ["/dashboard", "/admin"];

  if (protectedPaths.includes(req.nextUrl.pathname)) {
    // If the token is not found, redirect to login page
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}
