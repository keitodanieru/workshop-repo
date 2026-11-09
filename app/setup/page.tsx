import { listings } from "@/content/listings";
import { buildSeedSql } from "@/lib/seed-sql";
import { CopyButton } from "./CopyButton";

/**
 * /setup — Session 2 helper. Shows the SQL that loads YOUR listings (from
 * content/listings.ts) into your Supabase database.
 *
 * Nothing secret is shown here: it is the same text as your public catalog.
 */
export default function SetupPage() {
  const sql = buildSeedSql(listings);

  return (
    <section className="section">
      <div className="container">
        <h1 className="section__title">Load your listings</h1>
        <p className="section__lead">
          This SQL adds the {listings.length} listings from your
          content/listings.ts file to your database. Copy it, paste it into the
          Supabase SQL Editor, and click Run.
        </p>
        <div className="stack-4">
          <CopyButton text={sql} />
        </div>
        <pre className="code-block stack-4">
          <code>{sql}</code>
        </pre>
      </div>
    </section>
  );
}
