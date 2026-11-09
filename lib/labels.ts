/**
 * labels.ts — friendly words for the codes stored in the database.
 *
 * The database stores short codes like CUSTOM_SOFTWARE or IN_PROGRESS. Visitors
 * should see plain words instead, so every screen turns codes into labels here.
 */

import type { InquiryType, ListingCategory } from "@/content/listings";

export const CATEGORY_LABELS: Record<ListingCategory, string> = {
  CONSULTING: "Consulting",
  WEB_DEV: "Web development",
  CUSTOM_SOFTWARE: "Custom software",
};

export const INQUIRY_TYPE_LABELS: Record<InquiryType, string> = {
  DEMO: "Book a demo",
  QUOTE: "Get a quote",
  INQUIRE: "Ask a question",
};

export function categoryLabel(code: string): string {
  return CATEGORY_LABELS[code as ListingCategory] ?? code;
}

export function inquiryTypeLabel(code: string): string {
  return INQUIRY_TYPE_LABELS[code as InquiryType] ?? code;
}
