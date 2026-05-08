import { Scale } from "lucide-react";
import Image from "next/image";

export function AdvisorSection() {
    return (
        <section id="about" className="bg-linear-to-b from-white to-gray-50 py-12 md:py-20">
            <div className="mx-auto max-w-6xl px-4">
                <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-8 overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 shadow-xl md:flex-row md:gap-12 md:p-12">
                    {/* Decorative Background */}
                    <div className="absolute top-0 right-0 -z-10 h-64 w-64 rounded-full bg-brand-gold/5 blur-3xl"></div>

                    <div className="group relative">
                        <div className="absolute inset-0 rounded-full bg-brand-gold opacity-20 blur transition-opacity duration-500 group-hover:opacity-40"></div>
                        <div className="relative z-10 h-40 w-40 shrink-0 md:h-64 md:w-64">
                            <div className="relative h-full w-full overflow-hidden rounded-full border-[6px] border-white bg-gray-100 shadow-2xl">
                                <Image
                                    src="/ajay_mane.png"
                                    alt="Advocate Ajay Mane"
                                    fill
                                    sizes="(max-width: 768px) 160px, 256px"
                                    className="object-cover"
                                />
                            </div>
                            <div className="absolute right-4 bottom-4 rounded-full border-4 border-white bg-brand-gold p-2.5 text-white shadow-lg" title="Certified Advisor">
                                <Scale className="h-5 w-5 shrink-0" />
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 space-y-6 text-center md:text-left">
                        <div>
                            <h2 className="mb-1 text-2xl font-bold text-brand-teal md:text-4xl">वकिली आणि कायदे — मागे कोण आहे?</h2>
                            <p className="text-base font-bold text-brand-teal md:text-lg">Adv. अजय माने (B.S.L. LL.B)</p>
                        </div>

                        <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                            &quot;कायद्याचे अज्ञान हे हक्क गमावण्याचे मुख्य कारण आहे. आमचे उद्देश कायदेशीर साक्षरता वाढवणे आहे. क्लिष्ट कायदे सोप्या मराठी भाषेत समजावून सांगणे आणि सर्वसामान्यांना त्यांच्या हक्कांची जाणीव करून देणे हे आमचे ध्येय आहे.&quot;
                        </p>

                    </div>
                </div>
            </div>
        </section>
    );
}
