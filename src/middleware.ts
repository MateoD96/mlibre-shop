import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { verifyAuth } from "./app/(routes)/hub/lib/auth";

export const config = {
  matcher: [
    "/hub/:path*",
    "/cart/:path*",
    "/hub/my-profile",
    "/:path/checkout",
  ],
};

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("currentUser")?.value;

  const tokenVerify =
    token && (await verifyAuth(token).catch((err) => console.log(err)));

  if (tokenVerify && !request.nextUrl.pathname.startsWith("/hub/my-profile")) {
    return NextResponse.next();
    //return NextResponse.redirect(new URL("/hub/my-profile", request.url));
  }

  if (!tokenVerify && !request.nextUrl.pathname.startsWith("/hub/login")) {
    if (request.nextUrl.pathname.startsWith("/hub/registration")) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/hub/login", request.url));
  }
}
