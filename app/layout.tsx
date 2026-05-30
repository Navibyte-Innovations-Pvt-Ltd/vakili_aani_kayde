import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AppProviders } from "@/components/providers/app-providers";
import { Toaster } from "@/components/ui/sonner";
import { FacebookPixel } from "@/components/fb-pixel";
import { AnalyticsWrapper } from "@/components/analytics-wrapper";
import { IABManager } from "@/components/iab-manager";
import {
  TagManagerNoScript,
  ThirdPartyScripts,
} from "@/components/analytics/third-party-scripts";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  TWITTER_HANDLE,
} from "@/lib/constants/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoDevanagari = Noto_Sans_Devanagari({
  variable: "--font-devanagari",
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0A1F3D",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: ["वकिली", "कायदे", "हक्क", "वकील सल्ला", "ई-बुक्स", "Legal Advice Marathi", "Marathi Law Books", "कायदेशीर माहिती"],
  authors: [{ name: "Adv. Omkar Shinde", url: SITE_URL }],
  creator: "Adv. Omkar Shinde",
  publisher: SITE_NAME,
  ...(process.env.NEXT_PUBLIC_FACEBOOK_DOMAIN_VERIFICATION
    ? {
        other: {
          // TODO: set per-domain token in .env
          "facebook-domain-verification":
            process.env.NEXT_PUBLIC_FACEBOOK_DOMAIN_VERIFICATION,
        },
      }
    : {}),
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: SITE_NAME,
  },
  icons: {
    icon: [
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "mr_IN",
    url: SITE_URL,
    title: SITE_TITLE,
    description: "तुमचे हक्क जाणा, योग्य निर्णय घ्या — Adv. Omkar Shinde यांच्या कलमातून थेट कायदेशीर मार्गदर्शन.",
    siteName: SITE_NAME,
    images: [
      {
        url: "/image.png",
        width: 1200,
        height: 630,
        alt: "वकिली आणि कायदे",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: "तुमचे हक्क जाणा, योग्य निर्णय घ्या — Adv. Omkar Shinde यांच्या कलमातून थेट कायदेशीर मार्गदर्शन.",
    images: ["/image.png"],
    creator: TWITTER_HANDLE,
  },
  alternates: {
    canonical: "/",
  },
  verification: {
    // TODO: generate fresh token for vakilianikayde.in in Search Console, set NEXT_PUBLIC_GSC_VERIFICATION in .env
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mr" suppressHydrationWarning>
      <head>
        <FacebookPixel />
        <ThirdPartyScripts />
        <link rel="preconnect" href="https://checkout.razorpay.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://checkout.razorpay.com" />
        <link rel="preload" href="https://checkout.razorpay.com/v1/checkout.js" as="script" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.razorpay.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://api.razorpay.com" />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoDevanagari.variable} antialiased`}
      >
        <TagManagerNoScript />
        <IABManager />
        <AppProviders>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            {children}
            <AnalyticsWrapper />
            <Toaster position="top-center" />
          </ThemeProvider>
        </AppProviders>
      </body>
    </html>
  );
}
