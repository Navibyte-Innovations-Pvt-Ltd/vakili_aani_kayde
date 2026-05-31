"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, Instagram, MessageCircle, ShieldCheck, Scale } from "lucide-react";
import { SITE_INSTAGRAM_URL } from "@/lib/constants/site";

const QUICK_LINKS = [
  { href: "/", label: "मुख्यपृष्ठ" },
  { href: "/ebooks", label: "ई-बुक्स" },
  { href: "/my-books", label: "माझी पुस्तके" },
  { href: "/sitemap", label: "Sitemap" },
];


const LEGAL_LINKS = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
  { href: "/refund-policy", label: "Refund Policy" },
  { href: "/shipping-policy", label: "Delivery Policy" },
  { href: "/data-deletion", label: "Data Deletion" },
];

export function Footer() {
  return (
    <footer className="bg-brand-teal text-white">
      {/* Brand hero block */}
      <div className="border-b border-white/8 px-4 py-14">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 text-center">
          <Link href="/" aria-label="Home">
            <Image
              src="/logo.png"
              alt="वकिली आणि कायदे"
              width={0}
              height={0}
              sizes="100vw"
              unoptimized
              priority
              className="h-14 w-auto object-contain brightness-200 transition-opacity hover:opacity-80"
              style={{ width: "auto", height: "3.5rem" }}
            />
          </Link>

          <div className="space-y-1">
            <h2 className="text-2xl font-black tracking-tight text-white md:text-3xl">
              वकिली आणि कायदे
            </h2>
            <p className="text-sm font-medium text-brand-gold">
              हक्क समजून घ्या, योग्य निर्णय घ्या
            </p>
          </div>

          <p className="max-w-md text-sm leading-relaxed text-white/55">
            दररोज उपयोगी पडणारी कायदेशीर माहिती — थेट आणि स्पष्ट.
            सामान्य नागरिकांसाठी, त्यांच्या भाषेत.
          </p>

          {/* Social + contact row */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={SITE_INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-brand-gold hover:text-white"
            >
              <Instagram className="h-4 w-4" />
              Instagram
            </a>
              {process.env.NEXT_PUBLIC_WA_NUMBER ? (
                <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER}`} className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-[#25D366] hover:text-white">
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
              ) : null}
            <a
              href="mailto:vakilianikayde@gmail.com"
              className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-white/20"
            >
              <Mail className="h-4 w-4" />
              Email
            </a>
          </div>
        </div>
      </div>

      {/* Gold rule with scale icon */}
      <div className="flex items-center gap-3 px-4 py-0">
        <div className="h-px flex-1 bg-brand-gold/20" />
        <Scale className="h-4 w-4 text-brand-gold/40" />
        <div className="h-px flex-1 bg-brand-gold/20" />
      </div>

      {/* 3-column links grid */}
      <div className="px-4 py-12">
        <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Quick Links */}
          <div>
            <h3 className="mb-5 flex items-center gap-2 text-xs font-black tracking-widest text-brand-gold uppercase">
              <span className="h-px w-4 bg-brand-gold" />
              महत्वाचे दुवे
            </h3>
            <ul className="space-y-3">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group flex items-center gap-2 text-sm text-white/60 transition-all hover:text-white"
                  >
                    <ChevronDot />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-5 flex items-center gap-2 text-xs font-black tracking-widest text-brand-gold uppercase">
              <span className="h-px w-4 bg-brand-gold" />
              धोरणे
            </h3>
            <ul className="space-y-3">
              {LEGAL_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group flex items-center gap-2 text-sm text-white/60 transition-all hover:text-white"
                  >
                    <ChevronDot />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 flex items-center gap-2 text-xs font-black tracking-widest text-brand-gold uppercase">
              <span className="h-px w-4 bg-brand-gold" />
              संपर्क
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:vakilianikayde@gmail.com"
                  className="flex items-start gap-3 text-sm text-white/60 transition-colors hover:text-white"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold/60" />
                  vakilianikayde@gmail.com
                </a>
              </li>
              <li>
                  {process.env.NEXT_PUBLIC_WA_NUMBER ? (
                    <>
                      <a
                        href={`tel:+${process.env.NEXT_PUBLIC_WA_NUMBER}`}
                        className="flex items-start gap-3 text-sm text-white/60 transition-colors hover:text-white"
                      >
                        <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold/60" />
                        कॉल करा
                      </a>
                      <a
                        href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER}?text=${encodeURIComponent("नमस्कार 🙏 वकिली आणि कायदे टीम,\nमला माझी पुस्तके डाऊनलोड करण्यास मदत हवी आहे. कृपया मार्गदर्शन करा.")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-3 text-sm text-white/60 transition-colors hover:text-white"
                      >
                        <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold/60" />
                        WhatsApp वर मदत घ्या
                      </a>
                    </>
                  ) : (
                    <div className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-gray-100 px-8 text-sm font-bold text-gray-500">Support unavailable</div>
                  )}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8 px-4 py-6">
        <div className="mx-auto max-w-6xl space-y-4">
          {/* Copyright */}
          <div className="flex flex-col items-center gap-2 text-center md:flex-row md:justify-between md:text-left">
            <Link href="/dashboard" className="text-xs text-white/35 transition-colors hover:text-white/35 cursor-default select-none">
              &copy; {new Date().getFullYear()} वकिली आणि कायदे. All rights reserved.
            </Link>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 text-brand-gold/60" />
              <p className="text-[10px] font-semibold tracking-wider text-white/30 uppercase">
                vakilianikayde.in
              </p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="rounded-xl border border-white/8 bg-white/5 p-4 text-center">
            <p className="text-[10px] leading-relaxed text-white/30 md:text-xs">
              <strong className="text-white/50">DISCLAIMER:</strong> Information on this site is for educational purposes only and does not constitute legal advice. No attorney-client relationship is created. Consult a qualified lawyer for specific legal issues.{" "}
              <span className="mt-1 block text-[9px] md:mt-0 md:inline md:text-[10px]">
                | या वेबसाइटवरील माहिती केवळ शैक्षणिक उद्देशाने आहे. हा कायदेशीर सल्ला नाही.
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function ChevronDot() {
  return (
    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gold/40 transition-colors group-hover:bg-brand-gold" />
  );
}
