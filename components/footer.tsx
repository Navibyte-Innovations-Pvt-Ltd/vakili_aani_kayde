"use client";

import Link from "next/link";
import { Mail, Phone, Instagram, MessageCircle, ShieldCheck, Scale } from "lucide-react";
import { SITE_INSTAGRAM_URL } from "@/lib/constants/site";
import { type Language } from "@/lib/languages";
import { useNavLanguage } from "@/components/nav-language-context";

const LABELS: Record<
  Language,
  {
    brand: string;
    tagline: string;
    description: string;
    quickLinksHeading: string;
    legalHeading: string;
    contactHeading: string;
    home: string;
    ebooks: string;
    myBooks: string;
    sitemap: string;
    call: string;
    whatsappHelp: string;
    whatsappMessage: string;
    disclaimerLocal: string;
  }
> = {
  MARATHI: {
    brand: "वकिली आणि कायदे",
    tagline: "हक्क समजून घ्या, योग्य निर्णय घ्या",
    description:
      "दररोज उपयोगी पडणारी कायदेशीर माहिती — थेट आणि स्पष्ट. सामान्य नागरिकांसाठी, त्यांच्या भाषेत.",
    quickLinksHeading: "महत्वाचे दुवे",
    legalHeading: "धोरणे",
    contactHeading: "संपर्क",
    home: "मुख्यपृष्ठ",
    ebooks: "ई-बुक्स",
    myBooks: "माझी पुस्तके",
    sitemap: "Sitemap",
    call: "कॉल करा",
    whatsappHelp: "WhatsApp वर मदत घ्या",
    whatsappMessage:
      "नमस्कार 🙏 वकिली आणि कायदे टीम,\nमला माझी पुस्तके डाऊनलोड करण्यास मदत हवी आहे. कृपया मार्गदर्शन करा.",
    disclaimerLocal:
      "या वेबसाइटवरील माहिती केवळ शैक्षणिक उद्देशाने आहे. हा कायदेशीर सल्ला नाही.",
  },
  HINDI: {
    brand: "वकिली आणि कायदे",
    tagline: "अपने अधिकार समझें, सही निर्णय लें",
    description:
      "रोज़ काम आने वाली कानूनी जानकारी — सीधी और स्पष्ट। आम नागरिकों के लिए, उनकी भाषा में।",
    quickLinksHeading: "महत्वपूर्ण लिंक",
    legalHeading: "नीतियाँ",
    contactHeading: "संपर्क",
    home: "मुखपृष्ठ",
    ebooks: "ई-बुक्स",
    myBooks: "मेरी किताबें",
    sitemap: "Sitemap",
    call: "कॉल करें",
    whatsappHelp: "WhatsApp पर मदद लें",
    whatsappMessage:
      "नमस्ते 🙏 वकिली आणि कायदे टीम,\nमुझे अपनी किताबें डाउनलोड करने में मदद चाहिए। कृपया मार्गदर्शन करें।",
    disclaimerLocal:
      "इस वेबसाइट की जानकारी केवल शैक्षणिक उद्देश्य के लिए है। यह कानूनी सलाह नहीं है।",
  },
  ENGLISH: {
    brand: "Vakili Aani Kayde",
    tagline: "Know your rights, make the right decision",
    description:
      "Practical legal information you can use every day — direct and clear. For ordinary citizens, in their own language.",
    quickLinksHeading: "Quick Links",
    legalHeading: "Policies",
    contactHeading: "Contact",
    home: "Home",
    ebooks: "Ebooks",
    myBooks: "My Books",
    sitemap: "Sitemap",
    call: "Call us",
    whatsappHelp: "Get help on WhatsApp",
    whatsappMessage:
      "Hello 🙏 Vakili Aani Kayde team,\nI need help downloading my books. Please guide me.",
    disclaimerLocal:
      "The information on this website is for educational purposes only. It is not legal advice.",
  },
  TAMIL: {
    brand: "வகிலி ஆணி காயதே",
    tagline: "உங்கள் உரிமைகளை அறிந்து, சரியான முடிவை எடுங்கள்",
    description:
      "தினமும் பயன்படும் சட்ட தகவல்கள் — நேரடியாகவும் தெளிவாகவும். சாதாரண குடிமக்களுக்கு, அவர்களின் மொழியில்.",
    quickLinksHeading: "முக்கிய இணைப்புகள்",
    legalHeading: "கொள்கைகள்",
    contactHeading: "தொடர்பு",
    home: "முகப்பு",
    ebooks: "மின்னூல்கள்",
    myBooks: "என் புத்தகங்கள்",
    sitemap: "Sitemap",
    call: "அழைக்கவும்",
    whatsappHelp: "WhatsApp இல் உதவி பெறுங்கள்",
    whatsappMessage:
      "வணக்கம் 🙏 வகிலி ஆணி காயதே குழு,\nஎன் புத்தகங்களைப் பதிவிறக்க எனக்கு உதவி தேவை. தயவுசெய்து வழிகாட்டவும்.",
    disclaimerLocal:
      "இந்த வலைத்தளத்தில் உள்ள தகவல்கள் கல்வி நோக்கத்திற்காக மட்டுமே. இது சட்ட ஆலோசனை அல்ல.",
  },
  TELUGU: {
    brand: "వకిలి ఆణి కాయదే",
    tagline: "మీ హక్కులను తెలుసుకోండి, సరైన నిర్ణయం తీసుకోండి",
    description:
      "ప్రతిరోజూ ఉపయోగపడే న్యాయపరమైన సమాచారం — నేరుగా మరియు స్పష్టంగా. సామాన్య పౌరుల కోసం, వారి భాషలో.",
    quickLinksHeading: "ముఖ్యమైన లింకులు",
    legalHeading: "విధానాలు",
    contactHeading: "సంప్రదించండి",
    home: "హోమ్",
    ebooks: "ఈ-బుక్స్",
    myBooks: "నా పుస్తకాలు",
    sitemap: "Sitemap",
    call: "కాల్ చేయండి",
    whatsappHelp: "WhatsApp లో సహాయం పొందండి",
    whatsappMessage:
      "నమస్కారం 🙏 వకిలి ఆణి కాయదే బృందం,\nనా పుస్తకాలను డౌన్‌లోడ్ చేయడంలో నాకు సహాయం కావాలి. దయచేసి మార్గనిర్దేశం చేయండి.",
    disclaimerLocal:
      "ఈ వెబ్‌సైట్‌లోని సమాచారం కేవలం విద్యా ప్రయోజనాల కోసం మాత్రమే. ఇది న్యాయ సలహా కాదు.",
  },
  GUJARATI: {
    brand: "વકિલી આણિ કાયદે",
    tagline: "તમારા અધિકારો સમજો, સાચો નિર્ણય લો",
    description:
      "રોજ કામ આવતી કાનૂની માહિતી — સીધી અને સ્પષ્ટ. સામાન્ય નાગરિકો માટે, તેમની ભાષામાં.",
    quickLinksHeading: "મહત્વની લિંક",
    legalHeading: "નીતિઓ",
    contactHeading: "સંપર્ક",
    home: "મુખપૃષ્ઠ",
    ebooks: "ઈ-બુક્સ",
    myBooks: "મારી પુસ્તકો",
    sitemap: "Sitemap",
    call: "કૉલ કરો",
    whatsappHelp: "WhatsApp પર મદદ મેળવો",
    whatsappMessage:
      "નમસ્તે 🙏 વકિલી આણિ કાયદે ટીમ,\nમને મારી પુસ્તકો ડાઉનલોડ કરવામાં મદદ જોઈએ છે. કૃપા કરીને માર્ગદર્શન આપો.",
    disclaimerLocal:
      "આ વેબસાઇટ પરની માહિતી ફક્ત શૈક્ષણિક હેતુ માટે છે. આ કાનૂની સલાહ નથી.",
  },
  BENGALI: {
    brand: "ভাকিলি আনি কায়দে",
    tagline: "আপনার অধিকার জানুন, সঠিক সিদ্ধান্ত নিন",
    description:
      "প্রতিদিন কাজে লাগে এমন আইনি তথ্য — সরাসরি ও স্পষ্ট। সাধারণ নাগরিকদের জন্য, তাঁদের ভাষায়।",
    quickLinksHeading: "গুরুত্বপূর্ণ লিঙ্ক",
    legalHeading: "নীতিমালা",
    contactHeading: "যোগাযোগ",
    home: "হোম",
    ebooks: "ই-বুক",
    myBooks: "আমার বই",
    sitemap: "Sitemap",
    call: "কল করুন",
    whatsappHelp: "WhatsApp-এ সহায়তা নিন",
    whatsappMessage:
      "নমস্কার 🙏 ভাকিলি আনি কায়দে টিম,\nআমার বই ডাউনলোড করতে আমার সাহায্য প্রয়োজন। অনুগ্রহ করে নির্দেশনা দিন।",
    disclaimerLocal:
      "এই ওয়েবসাইটের তথ্য শুধুমাত্র শিক্ষামূলক উদ্দেশ্যে। এটি আইনি পরামর্শ নয়।",
  },
};


const LEGAL_LINKS = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
  { href: "/refund-policy", label: "Refund Policy" },
  { href: "/shipping-policy", label: "Delivery Policy" },
  { href: "/data-deletion", label: "Data Deletion" },
];

export function Footer() {
  const t = LABELS[useNavLanguage()];

  const quickLinks = [
    { href: "/", label: t.home },
    { href: "/ebooks", label: t.ebooks },
    { href: "/my-books", label: t.myBooks },
    { href: "/sitemap", label: t.sitemap },
  ];

  return (
    <footer className="bg-brand-teal text-white">
      {/* Brand hero block */}
      <div className="border-b border-white/8 px-4 py-14">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 text-center">
          <div className="space-y-1">
            <h2 className="text-2xl font-black tracking-tight text-white md:text-3xl">
              {t.brand}
            </h2>
            <p className="text-sm font-medium text-brand-gold">
              {t.tagline}
            </p>
          </div>

          <p className="max-w-md text-sm leading-relaxed text-white/55">
            {t.description}
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
              {t.quickLinksHeading}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((l) => (
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
              {t.legalHeading}
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
              {t.contactHeading}
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
                        {t.call}
                      </a>
                      <a
                        href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER}?text=${encodeURIComponent(t.whatsappMessage)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-3 text-sm text-white/60 transition-colors hover:text-white"
                      >
                        <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold/60" />
                        {t.whatsappHelp}
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
              &copy; {new Date().getFullYear()} {t.brand}. All rights reserved.
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
                | {t.disclaimerLocal}
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
