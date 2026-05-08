import { BookOpen, ShieldCheck, Wallet } from "lucide-react";

export function FeaturesSection() {
    const features = [
        {
            icon: BookOpen,
            title: "सोपी भाषा",
            desc: "कायद्याची क्लिष्ट आणि अवघड भाषा सोप्या मराठीत समजून घ्या.",
        },
        {
            icon: ShieldCheck,
            title: "तज्ञांचे मार्गदर्शन",
            desc: "उच्च न्यायालयातील अनुभवी वकीलांकडून तयार केलेले खात्रीशीर साहित्य.",
            featured: true,
        },
        {
            icon: Wallet,
            title: "किफायतशीर दर",
            desc: "सर्वसामान्यांना सहज परवडणाऱ्या दरात कायदेशीर ई-बुक्स उपलब्ध.",
        },
    ];

    return (
        <section className="bg-brand-cream py-14 md:py-20">
            <div className="mx-auto max-w-6xl px-4 text-center">
                <span className="mb-3 inline-block rounded-full border border-brand-gold/30 bg-brand-gold-light px-4 py-1 text-xs font-bold tracking-wider text-brand-teal uppercase">
                    वकिली आणि कायदे का?
                </span>
                <h2 className="relative mb-12 text-2xl font-black text-brand-teal md:text-4xl">
                    नागरिकांसाठी महत्त्वाचे फायदे
                    <span className="absolute -bottom-3 left-1/2 h-1 w-16 -translate-x-1/2 rounded-full bg-brand-gold md:w-24" />
                </h2>

                <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
                    {features.map((f, i) => (
                        <div
                            key={i}
                            className={`group relative overflow-hidden rounded-xl border bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg ${
                                f.featured
                                    ? "border-brand-gold ring-1 ring-brand-gold/20"
                                    : "border-gray-100"
                            }`}
                        >
                            {/* Gold top accent bar */}
                            <div className={`absolute top-0 left-0 h-1 w-full ${f.featured ? "bg-brand-gold" : "bg-brand-gold/30 group-hover:bg-brand-gold"} transition-colors duration-300`} />

                            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-xl border border-brand-gold/20 bg-brand-gold-light transition-colors duration-300 group-hover:bg-brand-gold/20">
                                <f.icon className="h-8 w-8 text-brand-teal transition-colors duration-300 group-hover:text-brand-gold" />
                            </div>
                            <h3 className="mb-3 text-xl font-bold text-brand-teal">{f.title}</h3>
                            <p className="text-base leading-relaxed text-slate-500">{f.desc}</p>

                            {f.featured && (
                                <span className="mt-4 inline-block rounded-full bg-brand-gold/10 px-3 py-0.5 text-xs font-bold text-brand-gold">
                                    ✦ सर्वात महत्त्वाचे
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
