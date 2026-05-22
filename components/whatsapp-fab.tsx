"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa";

export function WhatsAppFAB() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (pathname?.startsWith("/ebooks/")) return null;
  if (!isVisible) return null;

  return (
    <div className="fixed right-4 bottom-(--whatsapp-bottom) z-40 md:right-6 md:bottom-8">
      <a
        href={`https://wa.me/918149319058?text=${encodeURIComponent("नमस्कार 🙏 वकिली आणि कायदे टीम,\nमला तुमच्या ई-बुक्सबद्दल थोडी मदत हवी आहे. कृपया मार्गदर्शन करा.")}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp वर संपर्क करा"
        className="flex items-center gap-2.5 rounded-full border border-white/20 bg-brand-teal px-4 py-3 text-sm font-bold text-white shadow-lg transition-all hover:bg-[#25D366] hover:shadow-[0_4px_20px_rgb(37,211,102,0.35)] active:scale-95 md:px-5"
      >
        <FaWhatsapp className="h-5 w-5 shrink-0" />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>
    </div>
  );
}
