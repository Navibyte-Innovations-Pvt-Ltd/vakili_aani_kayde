import { Scale } from "lucide-react";
import Image from "next/image";
import { getServerLanguage } from "@/lib/server-language";
import { type Language } from "@/lib/languages";

const LABELS: Record<Language, {
    badge: string;
    wordmark: string;
    role: string;
    mission: string;
    detail: string;
}> = {
    MARATHI: {
        badge: "कायदेशीर सल्लागार",
        wordmark: "वकिली आणि कायदे",
        role: "LL.B | कायदेशीर सल्लागार",
        mission: "आमचा उद्देश एकच — प्रत्येक व्यक्तीला त्याचे कायदेशीर हक्क समजले पाहिजेत. कठीण भाषा न वापरता, थेट आणि स्पष्ट माहिती देणे हे आमचे काम आहे.",
        detail: "पोलीस, जमीन, फ्लॅट, लोन फ्रॉड — या रोजच्या आयुष्यातील विषयांवर आम्ही सरळ भाषेत मार्गदर्शक पुस्तके लिहितो. गरज पडल्यावर कामी येणारी माहिती — हेच आमचे ध्येय.",
    },
    HINDI: {
        badge: "कानूनी सलाहकार",
        wordmark: "वकिली आणि कायदे",
        role: "LL.B | कानूनी सलाहकार",
        mission: "हमारा उद्देश्य एक ही है — हर व्यक्ति को अपने कानूनी अधिकार समझ में आने चाहिए। कठिन भाषा का प्रयोग किए बिना, सीधी और स्पष्ट जानकारी देना ही हमारा काम है।",
        detail: "पुलिस, ज़मीन, फ्लैट, लोन फ्रॉड — रोज़मर्रा की ज़िंदगी के इन विषयों पर हम सरल भाषा में मार्गदर्शक पुस्तकें लिखते हैं। ज़रूरत पड़ने पर काम आने वाली जानकारी — यही हमारा ध्येय है।",
    },
    ENGLISH: {
        badge: "Legal Advisor",
        wordmark: "Vakili Aani Kayde",
        role: "LL.B | Legal Advisor",
        mission: "Our purpose is singular — every person should understand their legal rights. Delivering direct, clear information without using complicated language is what we do.",
        detail: "Police, land, flats, loan fraud — we write guide books in plain language on these everyday subjects. Information that comes in handy when you need it — that is our goal.",
    },
    TAMIL: {
        badge: "சட்ட ஆலோசகர்",
        wordmark: "வகிலி ஆணி காயதே",
        role: "LL.B | சட்ட ஆலோசகர்",
        mission: "எங்கள் நோக்கம் ஒன்றே — ஒவ்வொரு நபரும் தங்கள் சட்ட உரிமைகளைப் புரிந்து கொள்ள வேண்டும். கடினமான மொழியைப் பயன்படுத்தாமல், நேரடியான மற்றும் தெளிவான தகவல்களை வழங்குவதே எங்கள் பணி.",
        detail: "காவல்துறை, நிலம், ஃபிளாட், கடன் மோசடி — அன்றாட வாழ்க்கையின் இந்த விषயங்களில் எளிய மொழியில் வழிகாட்டி புத்தகங்களை எழுதுகிறோம். தேவைப்படும்போது உதவும் தகவல் — இதுவே எங்கள் இலக்கு.",
    },
    TELUGU: {
        badge: "న్యాయ సలహాదారు",
        wordmark: "వకిలి ఆణి కాయదే",
        role: "LL.B | న్యాయ సలహాదారు",
        mission: "మా ఉద్దేశం ఒక్కటే — ప్రతి వ్యక్తి తన న్యాయ హక్కులను అర్థం చేసుకోవాలి. కఠినమైన భాష ఉపయోగించకుండా, నేరుగా మరియు స్పష్టమైన సమాచారం ఇవ్వడమే మా పని.",
        detail: "పోలీసు, భూమి, ఫ్లాట్, రుణ మోసం — రోజువారీ జీవితంలోని ఈ అంశాలపై మేము సరళమైన భాషలో మార్గదర్శక పుస్తకాలు రాస్తాము. అవసరమైనప్పుడు ఉపయోగపడే సమాచారం — ఇదే మా లక్ష్యం.",
    },
    GUJARATI: {
        badge: "કાનૂની સલાહકાર",
        wordmark: "વકિલી આણિ કાયદે",
        role: "LL.B | કાનૂની સલાહકાર",
        mission: "અમારો ઉદ્દેશ એક જ — દરેક વ્યક્તિને પોતાના કાનૂની હક્કો સમજાવા જોઈએ. કઠિન ભાષાનો ઉપયોગ કર્યા વિના, સીધી અને સ્પષ્ટ માહિતી આપવી એ જ અમારું કામ છે.",
        detail: "પોલીસ, જમીન, ફ્લેટ, લોન ફ્રોડ — રોજિંદા જીવનના આ વિષયો પર અમે સરળ ભાષામાં માર્ગદર્શક પુસ્તકો લખીએ છીએ. જરૂર પડ્યે કામ આવતી માહિતી — એ જ અમારું ધ્યેય.",
    },
    BENGALI: {
        badge: "আইনি পরামর্শদাতা",
        wordmark: "ভাকিলি আনি কায়দে",
        role: "LL.B | আইনি পরামর্শদাতা",
        mission: "আমাদের উদ্দেশ্য একটাই — প্রত্যেক ব্যক্তির তার আইনি অধিকার বোঝা উচিত। কঠিন ভাষা ব্যবহার না করে, সরাসরি এবং স্পষ্ট তথ্য দেওয়াই আমাদের কাজ।",
        detail: "পুলিশ, জমি, ফ্ল্যাট, লোন ফ্রড — দৈনন্দিন জীবনের এই বিষয়গুলির উপর আমরা সহজ ভাষায় নির্দেশিকা বই লিখি। প্রয়োজনে কাজে আসা তথ্য — এটাই আমাদের লক্ষ্য।",
    },
};

export async function AdvisorSection() {
    const language = await getServerLanguage();
    const t = LABELS[language];
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
                                    alt={t.wordmark}
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
                                <Scale className="h-3 w-3" /> {t.badge}
                            </span>
                            <h2 className="mt-2 text-2xl font-black text-brand-teal md:text-4xl">{t.wordmark}</h2>
                            <p className="mt-1 text-sm font-bold text-brand-gold md:text-base">{t.role}</p>
                        </div>

                        <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                            {t.mission}
                        </p>

                        <p className="text-sm leading-relaxed text-muted-foreground/70 md:text-base">
                            {t.detail}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
