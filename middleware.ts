import { NextRequest, NextResponse } from "next/server";
import withAuth from "./middlewares/WithAuth";

export function mainMiddleware(request: NextRequest) {
  const res = NextResponse.next();

  return res;
}

export default withAuth(mainMiddleware, ["/dashboard"]);
