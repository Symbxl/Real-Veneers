import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_COOKIE, AUTH_TOKEN } from "@/lib/auth";

// Gate for the /leads dashboard. Unauthenticated requests are redirected
// to the /login page. (In Next.js 16, Middleware is called "Proxy".)
export function proxy(request: NextRequest) {
  const session = request.cookies.get(AUTH_COOKIE)?.value;

  if (session === AUTH_TOKEN) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: "/leads",
};
