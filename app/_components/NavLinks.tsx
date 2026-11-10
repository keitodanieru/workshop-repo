"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type NavItem = { href: string; label: string };

/**
 * NavLinks — the nav's page links. Marks the current page with
 * aria-current="page" so it is highlighted and screen readers announce it.
 */
export function NavLinks({ items }: { items: NavItem[] }) {
  const pathname = usePathname() ?? "/";
  return (
    <ul className="site-nav__list">
      {items.map((item) => {
        const active =
          pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              className="site-nav__link"
              aria-current={active ? "page" : undefined}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
