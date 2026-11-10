/**
 * /auth/callback — where Supabase's confirmation email link lands.
 *
 * The workshop guide has you turn "Confirm email" off, so most people never
 * hit this. If it is on, the email link brings a one-time code here. We swap
 * the code for a signed-in session and send the user to the home page.
 */

import { NextResponse } from "next/server";

import { createServerSupabaseClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (code) {
    const supabase = createServerSupabaseClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(new URL("/", url.origin));
    }
  }

  // Missing or expired code: send them to sign in with a short note.
  return NextResponse.redirect(new URL("/login?confirm=failed", url.origin));
}
