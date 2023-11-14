import { NextRequest, NextResponse } from "next/server";
export default function middleware(req: NextRequest) {
  const url = req.url;

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/transform"],
};
