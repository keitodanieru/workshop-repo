/**
 * seed-sql.ts — builds the "load my listings" SQL from content/listings.ts.
 *
 * The /setup page shows this SQL so you can paste it into the Supabase SQL
 * Editor in Session 2. It carries over the listings you edited in Session 1.
 * Each insert skips a listing whose title already exists, so running it twice
 * is safe.
 */

import type { Listing } from "@/content/listings";

/** Escapes a value for a single-quoted SQL string ('' doubles a quote). */
function sqlText(value: string): string {
  return `'${value.replace(/'/g, "''")}'`;
}

export function buildSeedSql(listings: readonly Listing[]): string {
  const lines: string[] = [
    "-- Load your listings from content/listings.ts.",
    "-- Paste this into the Supabase SQL Editor and click Run.",
    "-- Safe to run more than once: existing titles are skipped.",
    "",
  ];

  for (const l of listings) {
    lines.push(
      "insert into public.listings (title, category, description, inquiry_type, image_url, is_published)",
      `select ${sqlText(l.title)}, ${sqlText(l.category)}, ${sqlText(l.description)}, ${sqlText(l.inquiry_type)}, ${sqlText(l.image_url)}, true`,
      `where not exists (select 1 from public.listings where title = ${sqlText(l.title)});`,
      "",
    );
  }

  return lines.join("\n");
}
