"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { FileQuestion, Home, BookOpen } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function NotFound() {
  const pathname = usePathname();
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setTimeout(() => {
        setCurrentUrl(window.location.href);
      }, 0);
    }
  }, []);

  const whatsappMessage = encodeURIComponent(
    `Hello, I found a broken link on your website.\n\nPage: ${currentUrl || pathname}\n\nPlease check this.`,
  );
  const whatsappLink = `https://wa.me/918149319058?text=${whatsappMessage}`;

  return (
    <div className="flex min-h-screen flex-col bg-brand-cream">
      <Navbar />

      <main className="relative flex flex-1 items-center justify-center overflow-hidden px-6 py-16">
        {/* Decorative background */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-brand-teal/5 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 -bottom-24 h-96 w-96 rounded-full bg-brand-gold/10 blur-3xl" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            color: "#0f3d3e",
          }}
        />

        <div className="animate-in fade-in zoom-in-95 relative w-full max-w-xl rounded-3xl border border-gray-100 bg-white/80 p-8 text-center shadow-xl shadow-brand-teal/5 backdrop-blur-sm duration-500 sm:p-12">
          {/* Giant ghosted 404 */}
          <div className="relative mb-2 flex items-center justify-center">
            <span className="bg-linear-to-b from-brand-teal to-brand-teal/40 bg-clip-text text-[7rem] leading-none font-black tracking-tighter text-transparent select-none sm:text-[9rem]">
              404
            </span>
            <div className="absolute -top-2 right-1/2 flex h-14 w-14 translate-x-22 items-center justify-center rounded-2xl bg-brand-gold/15 shadow-sm sm:translate-x-28">
              <FileQuestion className="h-7 w-7 text-brand-gold" />
            </div>
          </div>

          <h2 className="mb-3 text-2xl font-black text-brand-teal md:text-3xl">
            Oops! Page Not Found
            <span className="mt-1 block text-lg font-bold text-gray-500 md:text-xl">
              पान सापडत नाही
            </span>
          </h2>

          <p className="mx-auto mb-8 max-w-md leading-relaxed text-gray-500">
            The page you are looking for might have been removed, renamed, or is
            temporarily unavailable.
            <span className="mt-1.5 block text-sm text-gray-400">
              तुम्ही शोधत असलेले पान अस्तित्वात नाही किंवा हलवण्यात आले आहे.
            </span>
          </p>

          <div className="flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button
              asChild
              size="lg"
              className="w-full gap-2 rounded-xl bg-brand-teal shadow-lg shadow-brand-teal/20 transition-all hover:bg-brand-teal/90 hover:shadow-brand-teal/30 active:scale-[0.98] sm:w-auto"
            >
              <Link href="/">
                <Home className="h-4 w-4" /> Go Home / मुख्यपृष्ठ
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full gap-2 rounded-xl border-2 border-brand-teal/20 text-brand-teal transition-all hover:bg-brand-teal/5 active:scale-[0.98] sm:w-auto"
            >
              <Link href="/ebooks">
                <BookOpen className="h-4 w-4" /> Browse Ebooks / ई-बुक्स
              </Link>
            </Button>
          </div>

          <div className="mx-auto mt-9 border-t border-gray-100 pt-7">
            <p className="mb-4 text-sm text-gray-400">
              Found a broken link? Let us know directly on WhatsApp.
              <span className="mt-0.5 block text-xs text-gray-400/80">
                तुटलेली लिंक आढळली? आम्हाला थेट व्हॉट्सॲपवर कळवा.
              </span>
            </p>
            <Button
              asChild
              size="lg"
              className="gap-2 rounded-xl bg-[#25D366] font-bold text-white shadow-lg shadow-[#25D366]/25 transition-all hover:bg-[#1da851] hover:shadow-[#25D366]/35 active:scale-[0.98]"
            >
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.696c1.001.572 2.135.882 3.807.882 3.123 0 5.669-2.52 5.669-5.765 0-3.186-2.586-5.786-5.669-5.786zm0 10.428c-1.353 0-2.617-.464-3.56-1.115l-.25-.173-1.637.428.44-1.593-.163-.261c-3.132-5.004.286-9.853 5.166-9.853 2.593 0 4.703 2.109 4.703 4.786 0 2.673-2.158 5.782-4.703 5.782zm2.618-4.293c-.143-.072-.857-.424-.972-.472-.143-.049-.25-.072-.321.071-.108.17-.429.525-.501.62-.107.096-.214.12-.357.049-.643-.287-1.401-.762-2.008-1.554-.25-.333.178-.309.606-1.164.072-.143.036-.262-.018-.381-.053-.12-.464-1.119-.643-1.524-.16-.381-.321-.334-.446-.334-.107-.001-.25-.001-.393-.001-.143 0-.393.048-.607.286-.214.238-.821.81-0.821 1.977 0 1.166.857 2.285.964 2.452.107.166 1.678 2.57 4.07 3.665.572.263 1.016.418 1.361.525.572.179 1.18.155 1.666.084.535-.072 1.392-.572 1.589-1.119.196-.548.196-1.024.143-1.119-.054-.096-.197-.144-.34-.215z" />
                </svg>
                Report on WhatsApp / व्हॉट्सॲपवर कळवा
              </a>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
