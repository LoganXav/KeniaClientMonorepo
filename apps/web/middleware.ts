import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { RouteEnums } from "./constants/router/route-constants";
import { getAuthUserAction } from "./helpers/server/auth-user-action";

// Public routes
const publicRoutes = [RouteEnums.SIGNIN, RouteEnums.SIGNUP, RouteEnums.VERIFY, RouteEnums.RESET_PASSWORD, RouteEnums.CHANGE_PASSWORD, RouteEnums.LOBBY, RouteEnums.HOME];

// Protected routes
const protectedRoutes = [
  RouteEnums.DASHBOARD,
  RouteEnums.STAFF,
  RouteEnums.STAFF_CREATE,
  RouteEnums.STAFF_LIST,
  RouteEnums.STUDENT,
  RouteEnums.STUDENT_CREATE,
  RouteEnums.STUDENT_LIST,
  RouteEnums.SCHOOL,
  RouteEnums.SCHOOL_PROFILE,
  RouteEnums.SCHOOL_CALENDAR,
  RouteEnums.SCHOOL_CALENDAR_CREATE,
  RouteEnums.SCHOOL_TIMETABLE,
  RouteEnums.SCHOOL_TIMETABLE_CREATE,
  RouteEnums.SCHOOL_SUBJECT_LIST,
  RouteEnums.SCHOOL_SUBJECT_CREATE,
  RouteEnums.CLASS,
  RouteEnums.CLASS_LIST,
  RouteEnums.CLASS_DIVISION,
  RouteEnums.CLASS_DIVISION_LIST,
  RouteEnums.CLASS_DIVISION_CREATE,
  RouteEnums.SUBJECT_LIST,
  RouteEnums.SUBJECT_CREATE,
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authUser = await getAuthUserAction();

  const isAuthenticated = !!authUser;

  // If user is authenticated and tries to access public routes
  if (isAuthenticated && publicRoutes.includes(pathname as any)) {
    return NextResponse.redirect(new URL(RouteEnums.DASHBOARD, request.url));
  }

  // If user is not authenticated and tries to access protected routes
  if (!isAuthenticated && protectedRoutes.includes(pathname as any)) {
    return NextResponse.redirect(new URL(RouteEnums.LOBBY, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all routes except:
     * 1. /api (API routes)
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. /_vercel (Vercel internals)
     * 5. /favicon.ico, /sitemap.xml (static files)
     */
    "/((?!api|_next|_static|_vercel|favicon.ico|sitemap.xml).*)",
  ],
};
