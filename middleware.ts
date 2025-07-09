import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const authCookie = req.cookies.get("auth");
  const isLoggedIn = authCookie?.value === "true";

  const pathname = req.nextUrl.pathname;
  const isProtectedRoute = pathname.startsWith("/dashboard");

  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/", req.url)); // go to login
  }

  if (pathname === "/" && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/dashboard/:path*", "/"],
};
