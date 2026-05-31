"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, Phone, Scale, X, BookOpen, Home, Download, ArrowRight } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { type Language } from "@/lib/languages";
import { useNavLanguage } from "@/components/nav-language-context";

type NavKey = "home" | "ebooks" | "combos";

const NAV_LINKS: { href: string; key: NavKey; icon: typeof Home; badge?: string }[] = [
  { href: "/", key: "home", icon: Home },
  { href: "/ebooks", key: "ebooks", icon: BookOpen },
];

type NavbarLabels = {
  brandName: string;
  home: string;
  ebooks: string;
  combos: string;
  buyNow: string;
  myBooks: string;
  myBooksSub: string;
  buyEbooks: string;
  buyEbooksSub: string;
  callUs: string;
  whatsapp: string;
  legalPlatform: string;
  authorityTag: string;
};

const NAVBAR_LABELS: Record<Language, NavbarLabels> = {
  MARATHI: { brandName: "वकिली आणि कायदे", home: "मुख्यपृष्ठ", ebooks: "ई-बुक्स", combos: "कॉम्बो पॅक", buyNow: "आता खरेदी करा", myBooks: "माझी पुस्तके", myBooksSub: "तुमची खरेदी डाउनलोड करा", buyEbooks: "ई-बुक्स खरेदी करा", buyEbooksSub: "फक्त ₹49 पासून", callUs: "कॉल करा", whatsapp: "व्हॉट्सअ‍ॅप", legalPlatform: "कायदेशीर व्यासपीठ", authorityTag: "अधिकृत कायदेशीर व्यासपीठ" },
  HINDI: { brandName: "वकिली आणि कायदे", home: "मुख्यपृष्ठ", ebooks: "ई-बुक्स", combos: "कॉम्बो पैक", buyNow: "अभी खरीदें", myBooks: "मेरी किताबें", myBooksSub: "अपनी खरीद डाउनलोड करें", buyEbooks: "ई-बुक्स खरीदें", buyEbooksSub: "केवल ₹49 से", callUs: "कॉल करें", whatsapp: "व्हाट्सएप", legalPlatform: "कानूनी मंच", authorityTag: "आधिकारिक कानूनी मंच" },
  ENGLISH: { brandName: "Vakili Aani Kayde", home: "Home", ebooks: "E-Books", combos: "Combo Packs", buyNow: "Buy Now", myBooks: "My Books", myBooksSub: "Download your purchases", buyEbooks: "Buy Ebooks", buyEbooksSub: "Starting at ₹49 only", callUs: "Call Us", whatsapp: "WhatsApp", legalPlatform: "Legal Platform", authorityTag: "Official Legal Platform" },
  TAMIL: { brandName: "வகிலி ஆணி காயதே", home: "முகப்பு", ebooks: "மின்னூல்கள்", combos: "காம்போ தொகுப்புகள்", buyNow: "இப்போது வாங்கு", myBooks: "என் புத்தகங்கள்", myBooksSub: "உங்கள் வாங்கியவற்றைப் பதிவிறக்கவும்", buyEbooks: "மின்னூல்கள் வாங்கு", buyEbooksSub: "₹49 முதல்", callUs: "அழைக்கவும்", whatsapp: "வாட்ஸ்அப்", legalPlatform: "சட்ட தளம்", authorityTag: "அதிகாரப்பூர்வ சட்ட தளம்" },
  TELUGU: { brandName: "వకిలి ఆణి కాయదే", home: "హోమ్", ebooks: "ఈ-బుక్‌లు", combos: "కాంబో ప్యాక్‌లు", buyNow: "ఇప్పుడే కొనండి", myBooks: "నా పుస్తకాలు", myBooksSub: "మీ కొనుగోళ్లను డౌన్‌లోడ్ చేయండి", buyEbooks: "ఈ-బుక్‌లు కొనండి", buyEbooksSub: "₹49 నుండి మాత్రమే", callUs: "కాల్ చేయండి", whatsapp: "వాట్సాప్", legalPlatform: "చట్ట వేదిక", authorityTag: "అధికారిక చట్ట వేదిక" },
  GUJARATI: { brandName: "વકિલી આણિ કાયદે", home: "હોમ", ebooks: "ઈ-બુક્સ", combos: "કોમ્બો પેક્સ", buyNow: "હમણાં ખરીદો", myBooks: "મારી પુસ્તકો", myBooksSub: "તમારી ખરીદી ડાઉનલોડ કરો", buyEbooks: "ઈ-બુક્સ ખરીદો", buyEbooksSub: "ફક્ત ₹49 થી", callUs: "કૉલ કરો", whatsapp: "વોટ્સએપ", legalPlatform: "કાનૂની મંચ", authorityTag: "અધિકૃત કાનૂની મંચ" },
  BENGALI: { brandName: "ভাকিলি আনি কায়দে", home: "হোম", ebooks: "ই-বুক", combos: "কম্বো প্যাক", buyNow: "এখনই কিনুন", myBooks: "আমার বই", myBooksSub: "আপনার কেনাকাটা ডাউনলোড করুন", buyEbooks: "ই-বুক কিনুন", buyEbooksSub: "মাত্র ₹49 থেকে", callUs: "কল করুন", whatsapp: "হোয়াটসঅ্যাপ", legalPlatform: "আইনি মঞ্চ", authorityTag: "অফিসিয়াল আইনি মঞ্চ" },
};

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const t = NAVBAR_LABELS[useNavLanguage()];

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top authority bar */}
      <div className="hidden w-full bg-brand-teal md:block">
        <div className="mx-auto flex h-9 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-1.5">
            <Scale className="h-3 w-3 text-brand-gold" />
            <span className="text-[11px] font-bold tracking-widest text-brand-gold uppercase">
              vakilianikayde.in — {t.authorityTag}
            </span>
          </div>
          {process.env.NEXT_PUBLIC_WA_NUMBER ? (
            <a
              href={`tel:+${process.env.NEXT_PUBLIC_WA_NUMBER}`}
              className="flex items-center gap-1.5 text-[11px] font-medium text-white/70 transition-colors hover:text-brand-gold"
            >
              <Phone className="h-3 w-3" />
              +{process.env.NEXT_PUBLIC_WA_NUMBER.replace(/^91/, "")}
            </a>
          ) : null}
        </div>
      </div>

      {/* Main nav */}
      <nav className="w-full border-b-2 border-brand-gold/20 bg-white shadow-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
          {/* Text wordmark */}
          <Link href="/" className="group flex shrink-0 flex-col leading-tight" aria-label="Home">
            <span className="text-lg font-black tracking-tight text-brand-teal transition-transform duration-200 group-hover:scale-[1.03]">{t.brandName}</span>
            <span className="text-[9px] font-semibold tracking-widest text-brand-gold uppercase">vakilianikayde.in</span>
          </Link>

          {/* Desktop nav links — centered */}
          <div className="hidden flex-1 items-center justify-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-label={t[link.key]}
                className="group relative flex items-center gap-1 px-3 py-1.5 text-sm font-semibold text-brand-teal/75 transition-colors hover:text-brand-teal"
              >
                {t[link.key]}
                {link.badge && (
                  <Badge className="h-3.5 animate-pulse bg-orange-500 px-1 text-[9px] leading-none uppercase">
                    {link.badge}
                  </Badge>
                )}
                {/* Underline reveal on hover */}
                <span className="absolute bottom-0 left-3 right-3 h-0.5 origin-left scale-x-0 rounded-full bg-brand-gold transition-transform duration-200 group-hover:scale-x-100" />
              </Link>
            ))}
          </div>

          {/* Right: CTA */}
          <div className="hidden items-center gap-3 md:flex">
            <Button
              asChild
              size="sm"
              className="h-9 rounded-lg bg-brand-gold px-5 font-black text-white shadow-sm transition-all hover:bg-brand-gold/90 hover:shadow-md active:scale-[0.97]"
            >
              <Link href="/ebooks">{t.buyNow}</Link>
            </Button>
          </div>

          {/* Mobile: hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-lg border border-brand-teal/15 text-brand-teal hover:bg-brand-teal/5"
                  aria-label="Toggle menu"
                >
                  {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="flex w-full flex-col border-none bg-[#5A1A2B] p-0 text-white sm:w-[320px]"
              >
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

                {/* Header */}
                <div className="relative flex items-center justify-between px-5 pt-5 pb-4">
                  <div className="leading-tight">
                    <p className="text-[15px] font-black text-white">{t.brandName}</p>
                    <p className="text-[9px] font-bold tracking-widest text-brand-gold/70 uppercase">{t.legalPlatform}</p>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/8 text-white/50 transition-colors hover:bg-white/15 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Divider */}
                <div className="mx-5 h-px bg-white/8" />

                {/* Nav links */}
                <nav className="flex flex-1 flex-col overflow-y-auto px-4 py-4 gap-1">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-center gap-3 rounded-2xl px-4 py-3.5 transition-all hover:bg-white/8 active:scale-[0.98]"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/8 transition-colors group-hover:bg-brand-gold/20">
                        <link.icon className="h-4 w-4 text-white/60 transition-colors group-hover:text-brand-gold" />
                      </span>
                      <span className="flex-1">
                        <span className="block text-[14px] font-bold text-white/80 transition-colors group-hover:text-white">
                          {t[link.key]}
                        </span>
                        {link.badge && (
                          <span className="mt-0.5 inline-block rounded-full bg-orange-500/20 px-2 py-0.5 text-[9px] font-black text-orange-400 uppercase tracking-wider">
                            {link.badge}
                          </span>
                        )}
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 text-white/20 transition-all group-hover:translate-x-0.5 group-hover:text-brand-gold/60" />
                    </Link>
                  ))}

                  {/* My Books — highlighted */}
                  <Link
                    href="/my-books"
                    onClick={() => setIsOpen(false)}
                    className="group mt-1 flex items-center gap-3 rounded-2xl border border-brand-gold/20 bg-brand-gold/8 px-4 py-3.5 transition-all hover:border-brand-gold/40 hover:bg-brand-gold/15 active:scale-[0.98]"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-gold/20">
                      <Download className="h-4 w-4 text-brand-gold" />
                    </span>
                    <span className="flex-1">
                      <span className="block text-[14px] font-black text-brand-gold">{t.myBooks}</span>
                      <span className="text-[10px] text-brand-gold/50">{t.myBooksSub}</span>
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-brand-gold/40 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </nav>

                {/* Bottom section */}
                <div className="mx-5 h-px bg-white/8" />
                <div className="space-y-3 px-5 py-5">
                  {/* Primary CTA */}
                  <Link href="/ebooks" onClick={() => setIsOpen(false)} className="block">
                    <div className="flex items-center justify-between rounded-2xl bg-brand-gold px-5 py-3.5 shadow-lg shadow-brand-gold/20 active:scale-[0.98]">
                      <div>
                        <p className="text-[13px] font-black text-white">{t.buyEbooks}</p>
                        <p className="text-[10px] font-bold text-white/70">{t.buyEbooksSub}</p>
                      </div>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                        <ArrowRight className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  </Link>

                  {/* Contact row */}
                  <div className="flex gap-2">
                    {process.env.NEXT_PUBLIC_WA_NUMBER ? (
                      <>
                        <a href={`tel:+${process.env.NEXT_PUBLIC_WA_NUMBER}`} className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/6 py-2.5 text-xs font-bold text-white/60 transition-colors hover:bg-white/10 hover:text-white active:scale-95">
                          <Phone className="h-3.5 w-3.5" />
                          {t.callUs}
                        </a>
                        <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER}`} target="_blank" rel="noopener noreferrer" className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-green-500/20 bg-green-500/8 py-2.5 text-xs font-bold text-green-400 transition-colors hover:bg-green-500/15 active:scale-95">
                          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                          {t.whatsapp}
                        </a>
                      </>
                    ) : null}
                  </div>

                  {/* Secret admin link */}
                  <Link href="/dashboard" onClick={() => setIsOpen(false)} className="block text-center text-[10px] text-[#5A1A2B] select-none cursor-default">
                    &copy; {new Date().getFullYear()} vakilianikayde.in
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
