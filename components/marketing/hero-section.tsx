import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Scale } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { getServerLanguage } from "@/lib/server-language";
import { type Language } from "@/lib/languages";

const LABELS: Record<
    Language,
    {
        badge: string;
        headlinePart1: string;
        headlinePart2: string;
        subHeadline: string;
        ebooksCta: string;
        whatsappCta: string;
        instantBadge: string;
    }
> = {
    MARATHI: {
        badge: "अधिकृत व्यासपीठ",
        headlinePart1: "हक्क समजून घ्या,",
        headlinePart2: "योग्य निर्णय घ्या",
        subHeadline: "दररोज उपयोगी पडणारी कायदेशीर माहिती — थेट आणि स्पष्ट",
        ebooksCta: "Ebooks पहा",
        whatsappCta: "Support साठी WhatsApp",
        instantBadge: "सुरक्षित आणि तत्काळ",
    },
    HINDI: {
        badge: "अधिकृत मंच",
        headlinePart1: "अधिकार समझें,",
        headlinePart2: "सही निर्णय लें",
        subHeadline: "रोज़ काम आने वाली कानूनी जानकारी — सीधी और स्पष्ट",
        ebooksCta: "Ebooks देखें",
        whatsappCta: "Support के लिए WhatsApp",
        instantBadge: "सुरक्षित और तत्काल",
    },
    ENGLISH: {
        badge: "Official Platform",
        headlinePart1: "Understand your rights,",
        headlinePart2: "make the right decisions",
        subHeadline: "Legal information you can use every day — direct and clear",
        ebooksCta: "View Ebooks",
        whatsappCta: "WhatsApp for Support",
        instantBadge: "Secure and Instant",
    },
    TAMIL: {
        badge: "அதிகாரப்பூர்வ தளம்",
        headlinePart1: "உங்கள் உரிமைகளைப் புரிந்துகொள்ளுங்கள்,",
        headlinePart2: "சரியான முடிவுகளை எடுங்கள்",
        subHeadline:
            "தினமும் பயன்படும் சட்டத் தகவல்கள் — நேரடியாகவும் தெளிவாகவும்",
        ebooksCta: "Ebooks காண்க",
        whatsappCta: "Support க்காக WhatsApp",
        instantBadge: "பாதுகாப்பானது மற்றும் உடனடி",
    },
    TELUGU: {
        badge: "అధికారిక వేదిక",
        headlinePart1: "మీ హక్కులను అర్థం చేసుకోండి,",
        headlinePart2: "సరైన నిర్ణయాలు తీసుకోండి",
        subHeadline: "ప్రతిరోజూ ఉపయోగపడే చట్టపరమైన సమాచారం — ప్రత్యక్షంగా మరియు స్పష్టంగా",
        ebooksCta: "Ebooks చూడండి",
        whatsappCta: "Support కోసం WhatsApp",
        instantBadge: "సురక్షితం మరియు తక్షణం",
    },
    GUJARATI: {
        badge: "અધિકૃત મંચ",
        headlinePart1: "તમારા હક્કો સમજો,",
        headlinePart2: "યોગ્ય નિર્ણય લો",
        subHeadline: "રોજ ઉપયોગી થતી કાનૂની માહિતી — સીધી અને સ્પષ્ટ",
        ebooksCta: "Ebooks જુઓ",
        whatsappCta: "Support માટે WhatsApp",
        instantBadge: "સુરક્ષિત અને તાત્કાલિક",
    },
    BENGALI: {
        badge: "আনুষ্ঠানিক প্ল্যাটফর্ম",
        headlinePart1: "আপনার অধিকার বুঝুন,",
        headlinePart2: "সঠিক সিদ্ধান্ত নিন",
        subHeadline: "প্রতিদিন কাজে লাগে এমন আইনি তথ্য — সরাসরি এবং স্পষ্ট",
        ebooksCta: "Ebooks দেখুন",
        whatsappCta: "Support এর জন্য WhatsApp",
        instantBadge: "সুরক্ষিত এবং তাৎক্ষণিক",
    },
};

export async function HeroSection() {
    const language = await getServerLanguage();
    const t = LABELS[language];

    return (
        <section className="relative overflow-hidden bg-white pt-8 pb-16 md:pt-14 md:pb-24">
            {/* Subtle parchment-texture gradient background */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(199, 154, 62,0.08),transparent)]" />
            {/* Fine dot grid overlay */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: "radial-gradient(circle, #5A1A2B 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                }}
            />

            <div className="relative z-10 mx-auto w-full max-w-5xl px-4 text-center">
                {/* Authority badge */}
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-gold/30 bg-brand-gold-light px-4 py-1.5 shadow-sm">
                    <Scale className="h-3.5 w-3.5 text-brand-gold" />
                    <span className="text-xs font-bold tracking-wider text-brand-teal uppercase">
                        vakilianikayde.in — {t.badge}
                    </span>
                </div>

                {/* Main headline */}
                <h1 className="mx-auto mb-4 max-w-3xl text-4xl leading-[1.1] font-black tracking-tight text-brand-teal sm:text-5xl md:text-6xl lg:text-7xl">
                    {t.headlinePart1}{" "}
                    <span className="relative inline-block text-brand-gold">
                        {t.headlinePart2}
                        <span className="absolute -bottom-1 left-0 h-1 w-full rounded-full bg-brand-gold/30" />
                    </span>
                </h1>

                {/* Sub-headline */}
                <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-slate-500 md:text-lg">
                    {t.subHeadline}
                </p>

                {/* CTA buttons */}
                <div className="mb-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Button
                        asChild
                        size="lg"
                        className="h-13 min-w-48 rounded-lg bg-brand-gold px-8 text-base font-black text-white shadow-lg shadow-brand-gold/25 transition-all duration-200 hover:bg-brand-gold/90 hover:shadow-xl hover:shadow-brand-gold/30 active:scale-[0.98]"
                    >
                        <Link href="#ebooks" className="flex items-center gap-2">
                            📖 {t.ebooksCta}
                        </Link>
                    </Button>
                    <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="h-13 min-w-48 rounded-lg border-2 border-brand-teal px-8 text-base font-bold text-brand-teal transition-all duration-200 hover:bg-brand-teal hover:text-white active:scale-[0.98]"
                    >
                        <Link
                            href={process.env.NEXT_PUBLIC_WA_NUMBER ? `https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER}` : '#'}
                            target={process.env.NEXT_PUBLIC_WA_NUMBER ? "_blank" : undefined}
                            rel={process.env.NEXT_PUBLIC_WA_NUMBER ? "noopener noreferrer" : undefined}
                            className="flex items-center gap-2"
                        >
                            <FaWhatsapp className="h-4 w-4" />
                            {t.whatsappCta}
                        </Link>
                    </Button>
                </div>

                {/* Instant delivery badge */}
                <p className="mt-5 text-xs font-medium text-slate-400">
                    ⚡ Instant Download — Secure Payment — {t.instantBadge}
                </p>
            </div>
        </section>
    );
}
