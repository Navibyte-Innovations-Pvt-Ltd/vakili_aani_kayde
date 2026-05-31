"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Instagram } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { type Language } from "@/lib/languages";
import { useNavLanguage } from "@/components/nav-language-context";

const LABELS: Record<Language, {
    headingLead: string;
    headingHighlight: string;
    followers: string;
    joinCta: string;
    followNow: string;
}> = {
    MARATHI: {
        headingLead: "महाराष्ट्रातील सर्वात मोठी",
        headingHighlight: "कायदेविषयक कम्युनिटी",
        followers: "Instagram वर फॉलोअर्स (Followers)",
        joinCta: "दररोज नवीन कायदे आणि अपडेट्स मिळवण्यासाठी आजच आमच्या कम्युनिटीमध्ये सामील व्हा.",
        followNow: "इंस्टाग्रामवर फॉलो करा (Follow Now)",
    },
    HINDI: {
        headingLead: "महाराष्ट्र की सबसे बड़ी",
        headingHighlight: "कानूनी कम्युनिटी",
        followers: "Instagram पर फॉलोअर्स (Followers)",
        joinCta: "हर दिन नए कानून और अपडेट्स पाने के लिए आज ही हमारी कम्युनिटी से जुड़ें.",
        followNow: "Instagram पर फॉलो करें (Follow Now)",
    },
    ENGLISH: {
        headingLead: "Maharashtra's Largest",
        headingHighlight: "Legal Community",
        followers: "Followers on Instagram",
        joinCta: "Join our community today to get new laws and updates every day.",
        followNow: "Follow on Instagram (Follow Now)",
    },
    TAMIL: {
        headingLead: "மகாராஷ்டிராவின் மிகப்பெரிய",
        headingHighlight: "சட்ட சமூகம்",
        followers: "Instagram-ல் பின்தொடர்பவர்கள் (Followers)",
        joinCta: "தினமும் புதிய சட்டங்கள் மற்றும் புதுப்பிப்புகளைப் பெற இன்றே எங்கள் சமூகத்தில் இணையுங்கள்.",
        followNow: "Instagram-ல் பின்தொடரவும் (Follow Now)",
    },
    TELUGU: {
        headingLead: "మహారాష్ట్రలో అతిపెద్ద",
        headingHighlight: "న్యాయ కమ్యూనిటీ",
        followers: "Instagram లో ఫాలోవర్లు (Followers)",
        joinCta: "ప్రతిరోజూ కొత్త చట్టాలు మరియు అప్‌డేట్‌లను పొందడానికి ఈరోజే మా కమ్యూనిటీలో చేరండి.",
        followNow: "Instagram లో ఫాలో అవ్వండి (Follow Now)",
    },
    GUJARATI: {
        headingLead: "મહારાષ્ટ્રનું સૌથી મોટું",
        headingHighlight: "કાનૂની કમ્યુનિટી",
        followers: "Instagram પર ફોલોઅર્સ (Followers)",
        joinCta: "દરરોજ નવા કાયદા અને અપડેટ્સ મેળવવા માટે આજે જ અમારી કમ્યુનિટીમાં જોડાઓ.",
        followNow: "Instagram પર ફોલો કરો (Follow Now)",
    },
    BENGALI: {
        headingLead: "মহারাষ্ট্রের সবচেয়ে বড়",
        headingHighlight: "আইনি কমিউনিটি",
        followers: "Instagram-এ ফলোয়ার্স (Followers)",
        joinCta: "প্রতিদিন নতুন আইন এবং আপডেট পেতে আজই আমাদের কমিউনিটিতে যোগ দিন.",
        followNow: "Instagram-এ ফলো করুন (Follow Now)",
    },
};

export function CommunitySection() {
    const t = LABELS[useNavLanguage()];
    const [count, setCount] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;

                    const duration = 2000; // 2 seconds
                    const steps = 60;
                    const interval = duration / steps;
                    const target = 65000;
                    const increment = target / steps;

                    let current = 0;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            setCount(target);
                            clearInterval(timer);
                        } else {
                            setCount(Math.floor(current));
                        }
                    }, interval);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="relative overflow-hidden bg-linear-to-br from-brand-teal to-teal-900 py-8 text-white md:py-20">
            {/* Background Pattern - subtle branding */}
            <div className="absolute inset-0 opacity-10">
                <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                </svg>
            </div>

            <div className="relative z-10 mx-auto max-w-6xl px-4 text-center">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 backdrop-blur-sm md:mb-6">
                    <Instagram className="h-4 w-4 text-brand-gold" />
                    <span className="text-xs font-semibold tracking-wider text-brand-gold uppercase">
                        Official Community
                    </span>
                </div>

                <div className="mx-auto max-w-3xl space-y-4">
                    <h2 className="text-xl leading-tight font-extrabold tracking-tight md:text-5xl">
                        {t.headingLead} <br className="hidden md:block" />
                        <span className="text-brand-gold">{t.headingHighlight}</span>
                    </h2>

                    <div className="py-2 md:py-4">
                        <div className="bg-linear-to-b from-white to-white/50 bg-clip-text text-4xl font-black tracking-tighter text-transparent tabular-nums md:text-8xl">
                            {count.toLocaleString()}+
                        </div>
                        <p className="text-base font-medium text-teal-100 md:text-xl">
                            {t.followers}
                        </p>
                    </div>

                    <p className="mx-auto mb-4 max-w-xl text-sm text-teal-50/80 md:mb-6 md:text-lg">
                        {t.joinCta}
                    </p>

                    <Button asChild size="lg" className="h-auto rounded-lg bg-brand-gold px-4 py-2.5 text-sm font-bold text-white shadow-lg transition-all hover:scale-105 hover:bg-brand-gold/90 md:px-6 md:py-3 md:text-xl">
                        <Link href="https://www.instagram.com/vakili_ani_kayde/" target="_blank">
                            {t.followNow}
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
