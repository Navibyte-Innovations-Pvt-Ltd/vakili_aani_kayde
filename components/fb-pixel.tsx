"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect, useState } from "react";

declare global {
    interface Window {
        fbq?: (command: string, event: string, params?: Record<string, unknown>) => void;
    }
}

const FB_PIXEL_ID = "25798398699825779";

export const FacebookPixel = () => {
    const [loaded, setLoaded] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        if (loaded && window.fbq) {
            window.fbq("track", "PageView");
        }
    }, [pathname, loaded]);

    return (
        <>
            <Script
                id="fb-pixel"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${FB_PIXEL_ID}');
            fbq('track', 'PageView');
          `,
                }}
                onLoad={() => setLoaded(true)}
            />
            <noscript>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    height="1"
                    width="1"
                    style={{ display: "none" }}
                    src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
                    alt=""
                />
            </noscript>
        </>
    );
};
