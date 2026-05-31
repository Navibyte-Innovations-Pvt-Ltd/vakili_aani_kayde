import { BookOpen, ShieldCheck, Wallet } from "lucide-react";
import { getServerLanguage } from "@/lib/server-language";
import { type Language } from "@/lib/languages";

const LABELS: Record<
    Language,
    {
        badge: string;
        heading: string;
        clarityTitle: string;
        clarityDesc: string;
        lawyerTitle: string;
        lawyerDesc: string;
        priceTitle: string;
        priceDesc: string;
        mostImportant: string;
    }
> = {
    MARATHI: {
        badge: "वकिली आणि कायदे का?",
        heading: "वकिली आणि कायदे का निवडावे?",
        clarityTitle: "स्पष्ट मराठी",
        clarityDesc:
            "गुंतागुंतीचे कायदे साध्या, थेट मराठीत — कोणत्याही पूर्वज्ञानाशिवाय समजण्यासाठी.",
        lawyerTitle: "वकिलाने लिहिलेले",
        lawyerDesc:
            "वकिली आणि कायदे च्या अनुभवी वकिलांनी प्रत्यक्ष व्यवहाराच्या अनुभवातून तयार केलेले अचूक मार्गदर्शन.",
        priceTitle: "परवडणारी किंमत",
        priceDesc:
            "प्रत्येकाला हक्काचे ज्ञान मिळावे यासाठी अत्यंत माफक दरात उपलब्ध.",
        mostImportant: "✦ सर्वात महत्त्वाचे",
    },
    HINDI: {
        badge: "वकिली आणि कायदे क्यों?",
        heading: "वकिली आणि कायदे को क्यों चुनें?",
        clarityTitle: "स्पष्ट भाषा",
        clarityDesc:
            "जटिल कानून सरल, सीधी भाषा में — बिना किसी पूर्व ज्ञान के समझने के लिए.",
        lawyerTitle: "वकील द्वारा लिखित",
        lawyerDesc:
            "वकिली आणि कायदे के अनुभवी वकीलों द्वारा वास्तविक व्यावहारिक अनुभव से तैयार किया गया सटीक मार्गदर्शन.",
        priceTitle: "किफायती कीमत",
        priceDesc:
            "हर किसी को अधिकारपूर्ण ज्ञान मिले इसके लिए बेहद कम दाम में उपलब्ध.",
        mostImportant: "✦ सबसे महत्वपूर्ण",
    },
    ENGLISH: {
        badge: "Why Vakili Aani Kayde?",
        heading: "Why choose Vakili Aani Kayde?",
        clarityTitle: "Plain Language",
        clarityDesc:
            "Complex laws in simple, direct language — easy to understand with no prior knowledge.",
        lawyerTitle: "Written by Lawyers",
        lawyerDesc:
            "Accurate guidance crafted from real-world practical experience by the seasoned lawyers at Vakili Aani Kayde.",
        priceTitle: "Affordable Price",
        priceDesc:
            "Available at a very reasonable price so everyone can access the knowledge they deserve.",
        mostImportant: "✦ Most Important",
    },
    TAMIL: {
        badge: "ஏன் வகிலி ஆணி காயதே?",
        heading: "ஏன் வகிலி ஆணி காயதே-ஐ தேர்வு செய்ய வேண்டும்?",
        clarityTitle: "எளிய மொழி",
        clarityDesc:
            "சிக்கலான சட்டங்கள் எளிய, நேரடியான மொழியில் — முன் அறிவு இல்லாமல் புரிந்துகொள்ள.",
        lawyerTitle: "வழக்கறிஞர்களால் எழுதப்பட்டது",
        lawyerDesc:
            "வகிலி ஆணி காயதே-வின் அனுபவமிக்க வழக்கறிஞர்கள் நிஜ நடைமுறை அனுபவத்திலிருந்து உருவாக்கிய துல்லியமான வழிகாட்டுதல்.",
        priceTitle: "மலிவான விலை",
        priceDesc:
            "ஒவ்வொருவரும் தங்களுக்குரிய அறிவைப் பெற மிகக் குறைந்த விலையில் கிடைக்கிறது.",
        mostImportant: "✦ மிக முக்கியமானது",
    },
    TELUGU: {
        badge: "వకిలి ఆణి కాయదే ఎందుకు?",
        heading: "వకిలి ఆణి కాయదే ఎందుకు ఎంచుకోవాలి?",
        clarityTitle: "సరళమైన భాష",
        clarityDesc:
            "సంక్లిష్టమైన చట్టాలు సరళమైన, నేరుగా భాషలో — ఎటువంటి ముందస్తు జ్ఞానం లేకుండా అర్థం చేసుకోవడానికి.",
        lawyerTitle: "న్యాయవాదులు రాసినది",
        lawyerDesc:
            "వకిలి ఆణి కాయదే యొక్క అనుభవజ్ఞులైన న్యాయవాదులు వాస్తవ ఆచరణాత్మక అనుభవం నుండి రూపొందించిన ఖచ్చితమైన మార్గదర్శకత్వం.",
        priceTitle: "అందుబాటు ధర",
        priceDesc:
            "ప్రతి ఒక్కరికీ తమకు హక్కైన జ్ఞానం అందేలా చాలా తక్కువ ధరలో అందుబాటులో ఉంది.",
        mostImportant: "✦ అత్యంత ముఖ్యమైనది",
    },
    GUJARATI: {
        badge: "વકિલી આણિ કાયદે કેમ?",
        heading: "વકિલી આણિ કાયદે કેમ પસંદ કરવું?",
        clarityTitle: "સરળ ભાષા",
        clarityDesc:
            "જટિલ કાયદા સરળ, સીધી ભાષામાં — કોઈપણ પૂર્વ જ્ઞાન વિના સમજવા માટે.",
        lawyerTitle: "વકીલ દ્વારા લખાયેલું",
        lawyerDesc:
            "વકિલી આણિ કાયદે ના અનુભવી વકીલો દ્વારા વાસ્તવિક વ્યવહારુ અનુભવમાંથી તૈયાર કરાયેલું ચોક્કસ માર્ગદર્શન.",
        priceTitle: "પોસાય તેવી કિંમત",
        priceDesc:
            "દરેકને હક્કનું જ્ઞાન મળે તે માટે ખૂબ જ વાજબી દરે ઉપલબ્ધ.",
        mostImportant: "✦ સૌથી મહત્વનું",
    },
    BENGALI: {
        badge: "কেন ভাকিলি আনি কায়দে?",
        heading: "কেন ভাকিলি আনি কায়দে বেছে নেবেন?",
        clarityTitle: "সহজ ভাষা",
        clarityDesc:
            "জটিল আইন সহজ, সরাসরি ভাষায় — কোনো পূর্বজ্ঞান ছাড়াই বোঝার জন্য.",
        lawyerTitle: "আইনজীবীদের লেখা",
        lawyerDesc:
            "ভাকিলি আনি কায়দে-এর অভিজ্ঞ আইনজীবীরা বাস্তব ব্যবহারিক অভিজ্ঞতা থেকে তৈরি করা সঠিক নির্দেশনা.",
        priceTitle: "সাশ্রয়ী মূল্য",
        priceDesc:
            "প্রত্যেকে যেন তাদের প্রাপ্য জ্ঞান পান সেজন্য অত্যন্ত সাশ্রয়ী মূল্যে উপলব্ধ.",
        mostImportant: "✦ সবচেয়ে গুরুত্বপূর্ণ",
    },
};

export async function FeaturesSection() {
    const language = await getServerLanguage();
    const t = LABELS[language];

    const features = [
        {
            icon: BookOpen,
            title: t.clarityTitle,
            desc: t.clarityDesc,
        },
        {
            icon: ShieldCheck,
            title: t.lawyerTitle,
            desc: t.lawyerDesc,
            featured: true,
        },
        {
            icon: Wallet,
            title: t.priceTitle,
            desc: t.priceDesc,
        },
    ];

    return (
        <section className="bg-brand-cream py-14 md:py-20">
            <div className="mx-auto max-w-6xl px-4 text-center">
                <span className="mb-3 inline-block rounded-full border border-brand-gold/30 bg-brand-gold-light px-4 py-1 text-xs font-bold tracking-wider text-brand-teal uppercase">
                    {t.badge}
                </span>
                <h2 className="relative mb-12 text-2xl font-black text-brand-teal md:text-4xl">
                    {t.heading}
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
                                    {t.mostImportant}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
