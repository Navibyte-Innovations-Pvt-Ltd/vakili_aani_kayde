"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Instagram } from "lucide-react";
import { useEffect, useState, useRef } from "react";

export function CommunitySection() {
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
                        महाराष्ट्रातील सर्वात मोठी <br className="hidden md:block" />
                        <span className="text-brand-gold">कायदेविषयक कम्युनिटी</span>
                    </h2>

                    <div className="py-2 md:py-4">
                        <div className="bg-linear-to-b from-white to-white/50 bg-clip-text text-4xl font-black tracking-tighter text-transparent tabular-nums md:text-8xl">
                            {count.toLocaleString()}+
                        </div>
                        <p className="text-base font-medium text-teal-100 md:text-xl">
                            Instagram वर फॉलोअर्स (Followers)
                        </p>
                    </div>

                    <p className="mx-auto mb-4 max-w-xl text-sm text-teal-50/80 md:mb-6 md:text-lg">
                        दररोज नवीन कायदे आणि अपडेट्स मिळवण्यासाठी आजच आमच्या कम्युनिटीमध्ये सामील व्हा.
                    </p>

                    <Button asChild size="lg" className="h-auto rounded-lg bg-brand-gold px-4 py-2.5 text-sm font-bold text-white shadow-lg transition-all hover:scale-105 hover:bg-brand-gold/90 md:px-6 md:py-3 md:text-xl">
                        <Link href="https://www.instagram.com/vakili_ani_kayde/" target="_blank">
                            इंस्टाग्रामवर फॉलो करा (Follow Now)
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
