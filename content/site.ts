/**
 * site.ts: YOUR SITE TEXT (you edit this file in Session 1)
 *
 * Change your site name, headline, and intro text below. The home page and the
 * top menu read from here. Save the file and refresh your browser to see it.
 *
 * Editing tips (so the file keeps working):
 *   - Change only the words between the double quotes " ".
 *   - Keep the quotes, the comma at the end of each line, and the + that joins
 *     long text across lines.
 *   - Apostrophes are fine ("We're open"). For a quote inside your text, use
 *     single quotes ("Our 'quick start' plan").
 *   - Red error screen after saving? You probably deleted a quote or a comma.
 *     Press Ctrl+Z (Cmd+Z on Mac), save, and it comes back.
 *
 * The files you customize:
 *   - content/site.ts      <- this file (name, headline, intro)
 *   - content/listings.ts  <- your catalog items
 *   - content/payment.ts   <- your GCash payment details (Session 2)
 */

export interface SiteContent {
  /** Short brand/site name shown in the navigation and page title. */
  name: string;
  /** Big headline on the landing page hero. */
  headline: string;
  /** One-line tagline shown under the headline. */
  tagline: string;
  /** Longer intro paragraph describing what the site offers. */
  intro: string;
  /** Label for the primary call-to-action button that links to the catalog. */
  catalogCtaLabel: string;
  /**
   * Photo next to the headline: "/images/" + a file in public/images/.
   * Leave it as "" to show the home page without a photo.
   */
  heroImage: string;
  /** A short description of the photo, read aloud by screen readers. */
  heroImageAlt: string;
}

export const site: SiteContent = {
  name: "Acme Consulting",
  headline: "Software and consulting that fits your business",
  tagline: "Web development, custom software, and expert IT consulting.",
  intro:
    "We help teams ship the right software. Browse our catalog to see what we " +
    "offer, then send us a demo request, a quote request, or a general inquiry. " +
    "No account needed to get in touch.",
  catalogCtaLabel: "Browse the catalog",
  heroImage: "/images/home-hero.jpg",
  heroImageAlt: "A team working together at a desk with laptops and notes",
};
