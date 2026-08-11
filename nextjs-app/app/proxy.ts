// app/proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/admin"];
const authRoutes = ["/auth"];

export function proxy(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    const { pathname } = request.nextUrl;
    const isProtectedRoute = protectedRoutes.some((route) =>
        pathname.startsWith(route)
    );
    const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
    if (isProtectedRoute && !token) {
        const loginUrl = new URL("/auth", request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
    }
    if (isAuthRoute && token) {
        return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/auth"],
};