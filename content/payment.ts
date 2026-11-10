/**
 * payment.ts: YOUR GCASH PAYMENT DETAILS (you edit this file in Session 2)
 *
 * These show on the Membership and Donate pages, next to your QR code.
 * Save your GCash QR picture as public/images/gcash-qr.png, then change the
 * label, account name, and instructions below.
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

export interface PaymentConfig {
  /** Display label shown above the QR, e.g. "Scan to pay via GCash". */
  label: string;
  /** Account/business name shown next to the QR. */
  accountName: string;
  /** Site-relative path to the GCash QR image under /images/. */
  qrImageUrl: string;
  /** Short instructions shown to the payer. */
  instructions: string;
}

export const payment: PaymentConfig = {
  label: "Scan to pay via GCash",
  accountName: "Acme Consulting",
  qrImageUrl: "/images/gcash-qr.png",
  instructions:
    "Scan the QR with your GCash app, pay the amount, then upload your receipt " +
    "so we can verify it.",
};
