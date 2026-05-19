import { Scale } from "lucide-react";
import Image from "next/image";

export function AdvisorSection() {
    return (
        <section id="about" className="bg-linear-to-b from-white to-gray-50 py-12 md:py-20">
            <div className="mx-auto max-w-6xl px-4">
                <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-8 overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 shadow-xl md:flex-row md:gap-12 md:p-12">
                    <div className="absolute top-0 right-0 -z-10 h-64 w-64 rounded-full bg-brand-gold/5 blur-3xl" />

                    <div className="group relative">
                        <div className="absolute inset-0 rounded-full bg-brand-gold opacity-20 blur transition-opacity duration-500 group-hover:opacity-40" />
                        <div className="relative z-10 h-40 w-40 shrink-0 md:h-64 md:w-64">
                            <div className="relative h-full w-full overflow-hidden rounded-full border-[6px] border-white bg-gray-100 shadow-2xl">
                                <Image
                                    src="/omkar_shinde.png"
                                    alt="Adv. Omkar Shinde"
                                    fill
                                    sizes="(max-width: 768px) 160px, 256px"
                                    className="object-cover object-top"
                                />
                            </div>
                            <div className="absolute right-4 bottom-4 rounded-full border-4 border-white bg-brand-gold p-2.5 text-white shadow-lg" title="Verified Lawyer">
                                <Scale className="h-5 w-5 shrink-0" />
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 space-y-4 text-center md:text-left">
                        <div>
                            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-gold/30 bg-brand-gold/10 px-3 py-1 text-xs font-bold text-brand-gold">
                                <Scale className="h-3 w-3" /> कायदेशीर सल्लागार
                            </span>
                            <h2 className="mt-2 text-2xl font-black text-brand-teal md:text-4xl">Adv. Omkar Shinde</h2>
                            <p className="mt-1 text-sm font-bold text-brand-gold md:text-base">LL.B | कायदेशीर सल्लागार</p>
                        </div>

                        <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                            आमचा उद्देश एकच — प्रत्येक व्यक्तीला त्याचे कायदेशीर हक्क समजले पाहिजेत. कठीण भाषा न वापरता, थेट आणि स्पष्ट माहिती देणे हे आमचे काम आहे.
                        </p>

                        <p className="text-sm leading-relaxed text-muted-foreground/70 md:text-base">
                            पोलीस, जमीन, फ्लॅट, लोन फ्रॉड — या रोजच्या आयुष्यातील विषयांवर आम्ही सरळ भाषेत मार्गदर्शक पुस्तके लिहितो. गरज पडल्यावर कामी येणारी माहिती — हेच आमचे ध्येय.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
