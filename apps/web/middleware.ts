import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { RouteEnums } from "./constants/router/route-constants";
import { getAuthUserAction } from "./helpers/server/auth-user-action";
import { routePermissionsMap } from "./constants/permissions/permission-constants";

// Public routes
const publicRoutes = [RouteEnums.SIGNIN, RouteEnums.SIGNUP, RouteEnums.VERIFY, RouteEnums.RESET_PASSWORD, RouteEnums.CHANGE_PASSWORD, RouteEnums.LOBBY, RouteEnums.HOME];

// Protected routes (prefix-based matching)
const protectedRoutes = [RouteEnums.DASHBOARD, RouteEnums.STAFF, RouteEnums.STUDENT, RouteEnums.SCHOOL, RouteEnums.CLASS, RouteEnums.SUBJECT_LIST];

// Helper to check if path starts with any protected route
function isProtectedRoute(pathname: string) {
  return protectedRoutes.some((route) => pathname.startsWith(route));
}

function isPublicRoute(pathname: string) {
  return publicRoutes.includes(pathname as any);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authUser = await getAuthUserAction();
  const isAuthenticated = !!authUser;

  // Redirect authenticated users away from public routes
  if (isAuthenticated && isPublicRoute(pathname)) {
    return NextResponse.redirect(new URL(RouteEnums.DASHBOARD, request.url));
  }

  // Redirect unauthenticated users away from protected routes
  if (!isAuthenticated && isProtectedRoute(pathname)) {
    return NextResponse.redirect(new URL(RouteEnums.LOBBY, request.url));
  }

  // Permission-based route protection
  const routeEntry = Object.entries(routePermissionsMap).find(([route]) => pathname.startsWith(route));
  if (routeEntry) {
    const requiredPermissions = routeEntry[1];
    const userPermissions = authUser?.data?.staff?.role?.permissions || [];

    const hasPermission = requiredPermissions.every((perm) => userPermissions.some((p: { name: string }) => p.name === perm));

    if (!hasPermission) {
      return NextResponse.redirect(new URL(RouteEnums.DASHBOARD, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|_static|_vercel|favicon.ico|sitemap.xml).*)"],
};
