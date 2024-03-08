import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: ["/hub/:path*"],
};

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("currentUser")?.value;

  if (currentUser && !request.nextUrl.pathname.startsWith("/hub/my-profile")) {
    return NextResponse.redirect(new URL("/hub/my-profile", request.url));
  }

  if (!currentUser && !request.nextUrl.pathname.startsWith("/hub/login")) {
    if (request.nextUrl.pathname.startsWith("/hub/registration")) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/hub/login", request.url));
  }
}
