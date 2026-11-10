/**
 * listings.ts: YOUR CATALOG (you edit this file in Session 1)
 *
 * Each { ... } block below is one card in your catalog. Change the values,
 * add a block, or delete one. Put matching pictures in public/images/ and set
 * image_url to "/images/your-file-name.png".
 *
 * Before Session 2, the catalog shows these listings directly. In Session 2 you
 * copy them into your database from the /setup page, and from then on the
 * catalog reads from the database.
 *
 * Fields:
 *   - slug:         short name used in the page address (lowercase-with-dashes)
 *   - category:     CONSULTING | WEB_DEV | CUSTOM_SOFTWARE
 *   - inquiry_type: DEMO | QUOTE | INQUIRE  (decides which contact form shows)
 *   - image_url:    "/images/" + a file name in public/images/ (lowercase, exact)
 *
 * Editing tips (so the file keeps working):
 *   - Change only the words between the double quotes " ".
 *   - Keep the quotes, the comma at the end of each line, and the + that joins
 *     long text across lines.
 *   - Apostrophes are fine ("We're open"). For a quote inside your text, use
 *     single quotes ("Our 'quick start' plan").
 *   - Red error screen after saving? You probably deleted a quote or a comma.
 *     Press Ctrl+Z (Cmd+Z on Mac), save, and it comes back.
 */

export type ListingCategory = "CONSULTING" | "WEB_DEV" | "CUSTOM_SOFTWARE";

export type InquiryType = "DEMO" | "QUOTE" | "INQUIRE";

export interface Listing {
  /** Stable slug used in the detail page URL. */
  slug: string;
  title: string;
  category: ListingCategory;
  description: string;
  inquiry_type: InquiryType;
  /** Site-relative path under /images/ (file must exist in public/images/). */
  image_url: string;
}

export const listings: Listing[] = [
  {
    slug: "it-strategy-consulting",
    title: "IT Strategy Consulting",
    category: "CONSULTING",
    description:
      "Work with our consultants to map your technology roadmap, assess risk, " +
      "and plan the systems your business needs over the next 12 months.",
    inquiry_type: "INQUIRE",
    image_url: "/images/placeholder-consulting.svg",
  },
  {
    slug: "business-website-build",
    title: "Business Website Build",
    category: "WEB_DEV",
    description:
      "A fast, modern marketing website with a content system you can update " +
      "yourself. Request a quote and we will scope it with you.",
    inquiry_type: "QUOTE",
    image_url: "/images/placeholder-web-dev.svg",
  },
  {
    slug: "inventory-management-app",
    title: "Custom Inventory Management App",
    category: "CUSTOM_SOFTWARE",
    description:
      "A tailored inventory and ordering application built around your workflow. " +
      "Book a live demo to see a working example.",
    inquiry_type: "DEMO",
    image_url: "/images/placeholder-custom-software.svg",
  },
];
