import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export async function middleware(request) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // 1. Get the current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 2. Define protected routes
  //    If url starts with /admin and user is NOT logged in...
  if (request.nextUrl.pathname.startsWith("/admin") && !user) {
    // Exception: Allow access to the login page itself
    if (request.nextUrl.pathname !== "/admin/login") {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // 3. If user IS logged in but tries to go to Login page, send them to Dashboard
  if (request.nextUrl.pathname === "/admin/login" && user) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    // Apply this check to all admin routes
    "/admin/:path*",
  ],
};
