// import { NextResponse } from "next/server";

// export function middleware(request) {
//   return NextResponse.redirect(new URL("/about", request.url));
// }

// export const config = {
//   matcher: ["/account", "/cabins"],
// };

import { auth } from "@/app/_lib/auth";
import { NextResponse } from "next/server";

// export const middleware = auth;

export async function middleware(request) {
  const session = await auth();
  const { pathname } = request.nextUrl;

  if (pathname === "/login" && session?.user) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (pathname.startsWith("/account") && !session?.user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*", "/login", "/cabins"],
};
