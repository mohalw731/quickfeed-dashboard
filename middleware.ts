import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/projects(.*)", "/payments(.*)", '/sign-in(.*)', '/sign-up(.*)']);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();

  if (req.nextUrl.pathname === "/" && auth().userId) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};