"use client";

import { useEffect } from "react";

interface Props {
  totalCount: number;
  /** "all" | "hindi" | "english" | "marathi" */
  category?: string;
}

/**
 * Fires a Meta Pixel `ViewContent` (catalog browse) event when a user lands
 * on any ebook listing page. This surfaces in Pixel as "catalog viewed" traffic
 * which can be used for retargeting audiences.
 */
export function PixelCatalogView({ totalCount, category = "all" }: Props) {
  useEffect(() => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "ViewContent", {
        content_type: "product_group",
        content_name: `Ebook Catalog - ${category}`,
        content_ids: [`catalog_${category}`],
        num_items: totalCount,
        currency: "INR",
      });
    }
  }, [totalCount, category]);

  return null;
}
