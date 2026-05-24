"use client";

import { useEffect } from "react";

interface Props {
  ebookId: string;
  title: string;
  price: number;
}

/**
 * Fires Meta Pixel ViewContent when a user lands on an ebook detail page.
 * Full ecommerce parameters enable:
 * - Dynamic product retargeting (show this exact book in ads to people who viewed it)
 * - Value-based bidding (Meta targets users who view higher-value products)
 * - Funnel analysis: ViewContent → InitiateCheckout → Purchase drop-off
 */
export function PixelViewContent({ ebookId, title, price }: Props) {
  useEffect(() => {
    if (typeof window !== "undefined" && window.fbq) {
      // Unique eventID per session-view for future CAPI deduplication
      const eventId = `vc_${ebookId}_${Date.now()}`;
      window.fbq(
        "track",
        "ViewContent",
        {
          content_ids: [ebookId],
          content_type: "product",
          content_name: title,
          value: price,
          currency: "INR",
        },
        { eventID: eventId },
      );
    }
  }, [ebookId, title, price]);

  return null;
}
