"use client";

import { useEffect } from "react";

interface PurchasePixelEventProps {
    orderId: string;
    amount: number;
    contentIds: string[];
    numItems: number;
}

export function PurchasePixelEvent({ orderId, amount, contentIds, numItems }: PurchasePixelEventProps) {
    useEffect(() => {
        const fire = () => {
            if (typeof window !== "undefined" && window.fbq) {
                window.fbq(
                    "track",
                    "Purchase",
                    {
                        value: amount,
                        currency: "INR",
                        content_ids: contentIds,
                        content_type: "product",
                        num_items: numItems,
                    },
                    { eventID: orderId },
                );
            }
        };

        // fbq may not be ready yet — poll until it appears (max 10s)
        if (window.fbq) {
            fire();
        } else {
            let attempts = 0;
            const interval = setInterval(() => {
                attempts++;
                if (window.fbq) {
                    clearInterval(interval);
                    fire();
                } else if (attempts >= 100) {
                    clearInterval(interval);
                }
            }, 100);
            return () => clearInterval(interval);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return null;
}
