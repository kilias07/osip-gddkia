import { NextRequest, NextResponse } from "next/server";
export default function middleware(req: NextRequest) {
  const url = req.url;
  console.log("testa sdadasd");
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/transform"],
};
