import Link from "next/link";

import { Card } from "@/app/_components/ui";
import { isSupabaseConfigured } from "@/lib/env";
import { AuthForm } from "./AuthForm";

/**
 * Login page — sign in or create an account (Supabase Auth).
 *
 * Before Session 2 there is no database, so the page explains that sign-in
 * starts working once the keys are connected. Browsing and inquiries never
 * need an account.
 */
export const dynamic = "force-dynamic";

export default function LoginPage({
  searchParams,
}: {
  searchParams: { confirm?: string };
}) {
  const note =
    searchParams.confirm === "failed"
      ? "That confirmation link didn't work or has expired. Try signing in, or create the account again."
      : undefined;

  return (
    <section className="section">
      <div className="container">
        <h1 className="section__title">Your account</h1>
        <p className="section__lead">
          You only need an account to become a member. Browsing, inquiries, and
          donations work without one.
        </p>
        {isSupabaseConfigured() ? (
          <AuthForm initialNote={note} />
        ) : (
          <Card className="panel-narrow">
            <p className="muted panel-copy">
              Sign-in starts working after you connect your Supabase project in
              Session 2.
            </p>
            <p className="panel-copy">
              <Link href="/catalog">Browse the catalog →</Link>
            </p>
          </Card>
        )}
      </div>
    </section>
  );
}
