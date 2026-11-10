"use client";

import { useState } from "react";

import { Button } from "@/app/_components/ui";

/** Copies the given text to the clipboard and says so for a moment. */
export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState<"idle" | "done" | "failed">("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied("done");
    } catch {
      setCopied("failed");
    }
    setTimeout(() => setCopied("idle"), 2000);
  }

  return (
    <Button variant="secondary" size="sm" onClick={copy}>
      {copied === "done"
        ? "Copied"
        : copied === "failed"
          ? "Select the text and copy it"
          : "Copy SQL"}
    </Button>
  );
}
