import { NextRequest, NextResponse } from "next/server";

// List of routes accessible only when logged in
const protectedRoutes = ["/home", "/profile", "/messages", "/settings"];

// List of routes accessible only when not logged in
const authRoutes = ["/auth/signin", "/auth/signup"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("authTokenDecentra");
  const { pathname } = req.nextUrl;

  // If the user is logged in, restrict access to /auth routes
  if (token && authRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  // If the user is not logged in, restrict access to protected paths
  if (!token && protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  // Allow the request to continue if it matches the conditions above
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
