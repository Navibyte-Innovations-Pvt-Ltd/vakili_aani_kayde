"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, Phone, Scale, X, BookOpen, Home, Info, Library, ChevronRight } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { GlobalSearch } from "./global-search";
import { Badge } from "@/components/ui/badge";

const NAV_LINKS = [
  { href: "/", label: "मुख्यपृष्ठ", sub: "Home", icon: Home },
  { href: "/ebooks", label: "ई-बुक्स", sub: "E-Books", icon: BookOpen },
  {
    href: "/combos",
    label: "कॉम्बो पॅक्स",
    sub: "Combos",
    icon: Library,
    badge: "Sale",
  },
  { href: "/about", label: "आमच्याबद्दल", sub: "About", icon: Info },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top authority bar */}
      <div className="hidden w-full bg-brand-teal md:block">
        <div className="mx-auto flex h-9 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-1.5">
            <Scale className="h-3 w-3 text-brand-gold" />
            <span className="text-[11px] font-bold tracking-widest text-brand-gold uppercase">
              vakilianikayde.in — अधिकृत कायदेशीर व्यासपीठ
            </span>
          </div>
          <a
            href="tel:+918149319058"
            className="flex items-center gap-1.5 text-[11px] font-medium text-white/70 transition-colors hover:text-brand-gold"
          >
            <Phone className="h-3 w-3" />
            +91 8149319058
          </a>
        </div>
      </div>

      {/* Main nav */}
      <nav className="w-full border-b-2 border-brand-gold/20 bg-white shadow-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
          {/* Logo + brand name */}
          <Link href="/" className="group flex shrink-0 items-center gap-2.5" aria-label="Home">
            <Image
              src="/logo.png"
              alt="वकिली आणि कायदे"
              width={0}
              height={0}
              sizes="100vw"
              priority
              fetchPriority="high"
              className="h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
              style={{ width: "auto", height: "2.5rem" }}
            />
            <div className="hidden flex-col leading-tight lg:flex">
              <span className="text-base font-black tracking-tight text-brand-teal">वकिली आणि कायदे</span>
              <span className="text-[9px] font-semibold tracking-widest text-brand-gold uppercase">vakilianikayde.in</span>
            </div>
          </Link>

          {/* Desktop nav links — centered */}
          <div className="hidden flex-1 items-center justify-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-label={link.sub}
                className="group relative flex items-center gap-1 px-3 py-1.5 text-sm font-semibold text-brand-teal/75 transition-colors hover:text-brand-teal"
              >
                {link.label}
                {link.badge && (
                  <Badge className="h-3.5 animate-pulse bg-orange-500 px-1 text-[9px] leading-none uppercase">
                    {link.badge}
                  </Badge>
                )}
                {/* Underline reveal on hover */}
                <span className="absolute bottom-0 left-3 right-3 h-0.5 origin-left scale-x-0 rounded-full bg-brand-gold transition-transform duration-200 group-hover:scale-x-100" />
              </Link>
            ))}
            <Link
              href="/my-books"
              className="group relative ml-1 flex items-center gap-1 rounded-lg border border-brand-teal/20 px-3 py-1.5 text-sm font-bold text-brand-teal transition-all hover:border-brand-gold/40 hover:bg-brand-gold/5 hover:text-brand-teal"
            >
              📚 माझी पुस्तके
            </Link>
          </div>

          {/* Right: search + CTA */}
          <div className="hidden items-center gap-3 md:flex">
            <GlobalSearch />
            <Button
              asChild
              size="sm"
              className="h-9 rounded-lg bg-brand-gold px-5 font-black text-white shadow-sm transition-all hover:bg-brand-gold/90 hover:shadow-md active:scale-[0.97]"
            >
              <Link href="/ebooks">खरेदी करा</Link>
            </Button>
          </div>

          {/* Mobile: search + hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <GlobalSearch variant="icon" />
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
                className="flex w-full flex-col border-none bg-brand-teal p-0 text-white sm:w-80"
              >
                {/* Mobile header */}
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                  <Image
                    src="/logo.png"
                    alt="वकिली आणि कायदे"
                    width={120}
                    height={50}
                    className="h-10 w-auto object-contain brightness-200"
                  />
                  <button
                    onClick={() => setIsOpen(false)}
                    className="rounded-lg p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Search in mobile */}
                <div className="border-b border-white/10 px-5 py-3">
                  <GlobalSearch
                    className="w-full"
                    triggerClassName="h-10 text-xs bg-white/10 border-white/20 text-white hover:bg-white/15"
                  />
                </div>

                {/* Nav links */}
                <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-3 py-4">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between rounded-xl px-4 py-3.5 font-semibold text-white/80 transition-all hover:bg-white/10 hover:text-white"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                          <link.icon className="h-4 w-4" />
                        </span>
                        <span>
                          {link.label}
                          {link.badge && (
                            <Badge className="ml-2 h-4 bg-orange-500 px-1 text-[10px] uppercase">
                              {link.badge}
                            </Badge>
                          )}
                        </span>
                      </div>
                      <ChevronRight className="h-4 w-4 opacity-40" />
                    </Link>
                  ))}
                  <Link
                    href="/my-books"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between rounded-xl px-4 py-3.5 font-bold text-brand-gold transition-all hover:bg-brand-gold/10"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-gold/20">
                        📚
                      </span>
                      माझी पुस्तके
                    </div>
                    <ChevronRight className="h-4 w-4 opacity-60" />
                  </Link>
                </nav>

                {/* Bottom CTA */}
                <div className="border-t border-white/10 px-5 py-5 space-y-3">
                  <Link href="/ebooks" onClick={() => setIsOpen(false)}>
                    <Button className="w-full rounded-xl bg-brand-gold py-5 text-base font-black text-white shadow-lg hover:bg-brand-gold/90">
                      📖 Ebooks खरेदी करा — ₹49
                    </Button>
                  </Link>
                  <Link
                    href="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 py-1 text-xs font-medium text-white/40 transition-colors hover:text-white/60"
                  >
                    🔒 Admin Login
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
