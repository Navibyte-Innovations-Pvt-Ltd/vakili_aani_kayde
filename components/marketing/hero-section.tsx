import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MessageCircle, Scale, ShieldCheck, Star, Users } from "lucide-react";
import { GlobalSearch } from "../global-search";

export function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-white pt-8 pb-16 md:pt-14 md:pb-24">
            {/* Subtle parchment-texture gradient background */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(201,150,42,0.08),transparent)]" />
            {/* Fine dot grid overlay */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: "radial-gradient(circle, #0A1F3D 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                }}
            />

            <div className="relative z-10 mx-auto w-full max-w-5xl px-4 text-center">
                {/* Authority badge */}
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-gold/30 bg-brand-gold-light px-4 py-1.5 shadow-sm">
                    <Scale className="h-3.5 w-3.5 text-brand-gold" />
                    <span className="text-xs font-bold tracking-wider text-brand-teal uppercase">
                        vakilianikayde.in — अधिकृत व्यासपीठ
                    </span>
                </div>

                {/* Logo */}
                <div className="mb-8 flex justify-center">
                    <Image
                        src="/logo.png"
                        alt="वकिली आणि कायदे"
                        width={320}
                        height={120}
                        priority
                        className="h-24 w-auto drop-shadow-md md:h-32"
                    />
                </div>

                {/* Main headline */}
                <h1 className="mx-auto mb-4 max-w-3xl text-4xl leading-[1.1] font-black tracking-tight text-brand-teal sm:text-5xl md:text-6xl lg:text-7xl">
                    हक्क समजून घ्या,{" "}
                    <span className="relative inline-block text-brand-gold">
                        योग्य निर्णय घ्या
                        <span className="absolute -bottom-1 left-0 h-1 w-full rounded-full bg-brand-gold/30" />
                    </span>
                </h1>

                {/* Sub-headline */}
                <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-slate-500 md:text-lg">
                    दररोज उपयोगी पडणारी कायदेशीर माहिती — थेट आणि स्पष्ट
                </p>

                {/* Search */}
                <div className="mx-auto mb-8 max-w-lg">
                    <div className="group relative">
                        <div className="absolute -inset-0.5 rounded-xl bg-linear-to-r from-brand-gold/20 to-brand-teal/10 opacity-0 blur transition duration-300 group-hover:opacity-100" />
                        <GlobalSearch
                            className="relative w-full"
                            triggerClassName="h-13 text-sm rounded-xl border-2 border-gray-200 bg-white text-gray-700 hover:border-brand-gold/50 transition-all duration-200 shadow-sm"
                        />
                    </div>
                    {/* Popular tags */}
                    <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                        <span className="text-[10px] font-bold tracking-wider text-brand-gold uppercase">लोकप्रिय:</span>
                        {["वारसा हक्क", "शेतकरी कायदा", "घर खरेदी", "ग्राहक हक्क"].map((tag) => (
                            <button
                                key={tag}
                                className="rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1 text-[10px] font-semibold text-slate-600 transition-colors hover:border-brand-gold/40 hover:bg-brand-gold-light hover:text-brand-teal md:text-xs"
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                {/* CTA buttons */}
                <div className="mb-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Button
                        asChild
                        size="lg"
                        className="h-13 min-w-48 rounded-lg bg-brand-gold px-8 text-base font-black text-white shadow-lg shadow-brand-gold/25 transition-all duration-200 hover:bg-brand-gold/90 hover:shadow-xl hover:shadow-brand-gold/30 active:scale-[0.98]"
                    >
                        <Link href="#ebooks" className="flex items-center gap-2">
                            📖 Ebooks पहा — ₹49
                        </Link>
                    </Button>
                    <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="h-13 min-w-48 rounded-lg border-2 border-brand-teal px-8 text-base font-bold text-brand-teal transition-all duration-200 hover:bg-brand-teal hover:text-white active:scale-[0.98]"
                    >
                        <Link
                            href="https://wa.me/918149319058"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                        >
                            <MessageCircle className="h-4 w-4" />
                            Support साठी WhatsApp
                        </Link>
                    </Button>
                </div>

                {/* Trust strip */}
                <div className="mx-auto flex max-w-lg flex-col items-center gap-4 rounded-2xl border border-gray-100 bg-gray-50/80 px-6 py-4 shadow-sm sm:flex-row sm:justify-around">
                    <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-brand-gold" />
                        <div className="text-left">
                            <p className="text-sm font-black text-brand-teal">1000+</p>
                            <p className="text-[10px] text-slate-500">वाचक</p>
                        </div>
                    </div>
                    <div className="hidden h-8 w-px bg-gray-200 sm:block" />
                    <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 fill-brand-gold text-brand-gold" />
                        <div className="text-left">
                            <p className="text-sm font-black text-brand-teal">4.8 / 5</p>
                            <p className="text-[10px] text-slate-500">रेटिंग</p>
                        </div>
                    </div>
                    <div className="hidden h-8 w-px bg-gray-200 sm:block" />
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-brand-gold" />
                        <div className="text-left">
                            <p className="text-sm font-black text-brand-teal">100%</p>
                            <p className="text-[10px] text-slate-500">अधिकृत माहिती</p>
                        </div>
                    </div>
                </div>

                {/* Instant delivery badge */}
                <p className="mt-5 text-xs font-medium text-slate-400">
                    ⚡ Instant Download — Secure Payment — फक्त ₹49 पासून सुरुवात
                </p>
            </div>
        </section>
    );
}
