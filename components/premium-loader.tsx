"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface PremiumLoaderProps {
    marathiText?: string;
    englishText?: string;
    fullScreen?: boolean;
}

export function PremiumLoader({
    marathiText = "लोड होत आहे...",
    englishText = "Loading Knowledge",
    fullScreen = false,
}: PremiumLoaderProps) {
    const [progress, setProgress] = useState(8);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((old) => {
                if (old >= 96) return 96;
                const diff = Math.random() * 12;
                return Math.min(old + diff, 96);
            });
        }, 200);
        return () => clearInterval(timer);
    }, []);

    return (
        <div
            className={`flex flex-col items-center justify-center p-4 ${
                fullScreen
                    ? "min-h-screen bg-linear-to-br from-brand-cream via-white to-brand-cream"
                    : "h-full w-full py-16"
            }`}
        >
            <div className="animate-in fade-in zoom-in-95 relative flex w-full max-w-xs flex-col items-center gap-9 duration-700">
                {/* Orbital spinner around logo */}
                <div className="relative flex h-32 w-32 items-center justify-center">
                    {/* Soft pulsing glow */}
                    <div className="absolute h-28 w-28 animate-ping rounded-full bg-brand-gold/10 [animation-duration:2.4s]" />
                    <div className="absolute h-32 w-32 rounded-full bg-brand-teal/5 blur-2xl" />

                    {/* Outer ring — slow clockwise */}
                    <svg
                        className="absolute h-32 w-32 animate-spin [animation-duration:3s]"
                        viewBox="0 0 100 100"
                        fill="none"
                    >
                        <circle
                            cx="50"
                            cy="50"
                            r="46"
                            stroke="currentColor"
                            className="text-brand-teal/10"
                            strokeWidth="2"
                        />
                        <circle
                            cx="50"
                            cy="50"
                            r="46"
                            stroke="currentColor"
                            className="text-brand-teal"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeDasharray="70 220"
                        />
                    </svg>

                    {/* Inner ring — faster counter-clockwise */}
                    <svg
                        className="absolute h-24 w-24 animate-[spin_2s_linear_infinite_reverse]"
                        viewBox="0 0 100 100"
                        fill="none"
                    >
                        <circle
                            cx="50"
                            cy="50"
                            r="44"
                            stroke="currentColor"
                            className="text-brand-gold/15"
                            strokeWidth="2"
                        />
                        <circle
                            cx="50"
                            cy="50"
                            r="44"
                            stroke="currentColor"
                            className="text-brand-gold"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeDasharray="40 240"
                        />
                    </svg>

                    {/* Logo center */}
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white/70 shadow-lg shadow-brand-teal/10 backdrop-blur-sm">
                        <Image
                            src="/logo.png"
                            alt="वकिली आणि कायदे"
                            width={120}
                            height={48}
                            className="h-10 w-auto animate-pulse object-contain [animation-duration:2s]"
                            priority
                        />
                    </div>
                </div>

                <div className="flex w-full flex-col items-center gap-4">
                    {/* Shimmer progress bar */}
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-brand-teal/10">
                        <div
                            className="relative h-full animate-[shimmer_1.6s_linear_infinite] rounded-full bg-linear-to-r from-brand-teal via-brand-gold to-brand-teal bg-size-[200%_100%] transition-[width] duration-500 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    {/* Bilingual text */}
                    <div className="flex flex-col items-center gap-1 text-center">
                        <h3 className="text-lg font-black tracking-tight text-brand-teal">
                            {marathiText}
                        </h3>
                        <p className="text-[10px] font-bold tracking-[0.3em] text-brand-gold/70 uppercase">
                            {englishText}
                        </p>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @keyframes shimmer {
                    0% {
                        background-position: 200% 0;
                    }
                    100% {
                        background-position: -200% 0;
                    }
                }
            `}</style>
        </div>
    );
}
