/**
 * middleware.ts — keeps the Supabase login fresh on every page load.
 *
 * A login lasts about an hour before its token needs renewing. Server pages
 * can't save the renewed token, so this small step runs first, renews it if
 * needed, and saves it in the cookie. Without it, people get signed out
 * partway through a workshop session.
 *
 * Before Session 2 there are no Supabase keys, so it does nothing.
 */

import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    return NextResponse.next();
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  // Asking for the user is what triggers the renewal. Do not remove.
  await supabase.auth.getUser();

  return response;
}

export const config = {
  // Skip Next.js internals and static files (images, icons).
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
