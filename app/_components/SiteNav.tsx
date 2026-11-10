import Link from "next/link";

import { site } from "@/content/site";
import { signOutAction } from "@/app/auth/actions";
import { getRoleFromSession, type RoleResolution } from "@/lib/auth";
import { NavLinks, type NavItem } from "./NavLinks";

/**
 * SiteNav — shared navigation rendered on every page via the root layout.
 *
 * Links to the public pages, plus Sign in / Sign out. The Dashboards link only
 * shows for Staff and Admin. Hiding it is just for tidiness: the dashboards
 * check the role again, and the database rules (RLS) are the real guard.
 */
export default async function SiteNav() {
  let session: RoleResolution = { authenticated: false };
  try {
    session = await getRoleFromSession();
  } catch {
    // If the auth check fails, show the signed-out nav instead of breaking
    // every page.
  }

  const items: NavItem[] = [
    { href: "/catalog", label: "Catalog" },
    { href: "/membership", label: "Membership" },
    { href: "/donate", label: "Donate" },
  ];
  if (
    session.authenticated &&
    (session.role === "STAFF" || session.role === "ADMIN")
  ) {
    items.push({ href: "/admin", label: "Dashboards" });
  }

  return (
    <nav className="site-nav" aria-label="Primary">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="site-nav__inner">
        <Link href="/" className="site-nav__brand">
          {site.name}
        </Link>
        <div className="site-nav__links">
          <NavLinks items={items} />
          {session.authenticated ? (
            <form action={signOutAction}>
              <button type="submit" className="btn btn--secondary btn--sm">
                Sign out
              </button>
            </form>
          ) : (
            <Link href="/login" className="btn btn--secondary btn--sm">
              Sign in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
