import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Scale } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export function HeroSection() {
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
                        vakilianikayde.in — अधिकृत व्यासपीठ
                    </span>
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

                {/* CTA buttons */}
                <div className="mb-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Button
                        asChild
                        size="lg"
                        className="h-13 min-w-48 rounded-lg bg-brand-gold px-8 text-base font-black text-white shadow-lg shadow-brand-gold/25 transition-all duration-200 hover:bg-brand-gold/90 hover:shadow-xl hover:shadow-brand-gold/30 active:scale-[0.98]"
                    >
                        <Link href="#ebooks" className="flex items-center gap-2">
                            📖 Ebooks पहा
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
                            Support साठी WhatsApp
                        </Link>
                    </Button>
                </div>

                {/* Instant delivery badge */}
                <p className="mt-5 text-xs font-medium text-slate-400">
                    ⚡ Instant Download — Secure Payment — सुरक्षित आणि तत्काळ
                </p>
            </div>
        </section>
    );
}
