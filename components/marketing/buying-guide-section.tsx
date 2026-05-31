"use client";

import { BookOpen, Smartphone, ShieldCheck, Download, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { type Language } from "@/lib/languages";
import { useNavLanguage } from "@/components/nav-language-context";

const LABELS: Record<
  Language,
  {
    badge: string;
    heading: string;
    subheading: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    step4Title: string;
    step4Desc: string;
    helpTitle: string;
    helpDesc: string;
    whatsappLabel: string;
  }
> = {
  MARATHI: {
    badge: "खरेदीची पद्धत",
    heading: "तुमचे ई-बुक कसे मिळवाल?",
    subheading: "चार पायऱ्यांमध्ये कायदेशीर ज्ञान तुमच्यापर्यंत",
    step1Title: "1. ई-बुक निवडा",
    step1Desc:
      "तुमच्या गरजेनुसार ई-बुक अथवा कॉम्बो पॅक निवडा. 'आता खरेदी करा' या बटणावर टॅप करा.",
    step2Title: "2. संपर्क तपशील द्या",
    step2Desc:
      "नाव व व्हॉट्सॲप क्रमांक योग्यरित्या नोंदवा — त्याच क्रमांकावर ई-बुक पाठवले जाईल.",
    step3Title: "3. पेमेंट करा",
    step3Desc:
      "UPI, Google Pay, PhonePe किंवा डेबिट/क्रेडिट कार्डने सुरक्षितपणे रक्कम भरा.",
    step4Title: "4. PDF मिळवा",
    step4Desc:
      "पेमेंट यशस्वी होताच PDF तुमच्या व्हॉट्सॲपवर येईल — ताबडतोब वाचनास सुरुवात करा.",
    helpTitle: "मदत हवी आहे का?",
    helpDesc:
      "पेमेंट झाले पण PDF आला नाही? आम्ही लगेच मदत करू — खाली दिलेल्या क्रमांकावर व्हॉट्सॲप करा.",
    whatsappLabel: "व्हॉट्सॲप करा",
  },
  HINDI: {
    badge: "खरीदने का तरीका",
    heading: "अपनी ई-बुक कैसे प्राप्त करें?",
    subheading: "चार चरणों में कानूनी ज्ञान आप तक",
    step1Title: "1. ई-बुक चुनें",
    step1Desc:
      "अपनी ज़रूरत के अनुसार ई-बुक या कॉम्बो पैक चुनें। 'अभी खरीदें' बटन पर टैप करें।",
    step2Title: "2. संपर्क विवरण दें",
    step2Desc:
      "नाम और व्हाट्सऐप नंबर सही ढंग से दर्ज करें — उसी नंबर पर ई-बुक भेजी जाएगी।",
    step3Title: "3. भुगतान करें",
    step3Desc:
      "UPI, Google Pay, PhonePe या डेबिट/क्रेडिट कार्ड से सुरक्षित रूप से भुगतान करें।",
    step4Title: "4. PDF प्राप्त करें",
    step4Desc:
      "भुगतान सफल होते ही PDF आपके व्हाट्सऐप पर आ जाएगी — तुरंत पढ़ना शुरू करें।",
    helpTitle: "क्या मदद चाहिए?",
    helpDesc:
      "भुगतान हो गया पर PDF नहीं आई? हम तुरंत मदद करेंगे — नीचे दिए गए नंबर पर व्हाट्सऐप करें।",
    whatsappLabel: "व्हाट्सऐप करें",
  },
  ENGLISH: {
    badge: "How to Buy",
    heading: "How will you get your e-book?",
    subheading: "Legal knowledge delivered to you in four steps",
    step1Title: "1. Choose an e-book",
    step1Desc:
      "Pick an e-book or combo pack as per your need. Tap the 'Buy Now' button.",
    step2Title: "2. Provide contact details",
    step2Desc:
      "Enter your name and WhatsApp number correctly — the e-book will be sent to that same number.",
    step3Title: "3. Make payment",
    step3Desc:
      "Pay securely using UPI, Google Pay, PhonePe or a debit/credit card.",
    step4Title: "4. Get the PDF",
    step4Desc:
      "As soon as the payment succeeds, the PDF will arrive on your WhatsApp — start reading right away.",
    helpTitle: "Need help?",
    helpDesc:
      "Paid but the PDF didn't arrive? We'll help you right away — message us on WhatsApp at the number below.",
    whatsappLabel: "WhatsApp us",
  },
  TAMIL: {
    badge: "வாங்கும் முறை",
    heading: "உங்கள் மின்னூலை எப்படி பெறுவீர்கள்?",
    subheading: "நான்கு படிகளில் சட்ட அறிவு உங்களை அடைகிறது",
    step1Title: "1. மின்னூலைத் தேர்ந்தெடுக்கவும்",
    step1Desc:
      "உங்கள் தேவைக்கேற்ப மின்னூல் அல்லது காம்போ பேக்கைத் தேர்ந்தெடுக்கவும். 'இப்போது வாங்கு' பொத்தானைத் தட்டவும்.",
    step2Title: "2. தொடர்பு விவரங்களை வழங்கவும்",
    step2Desc:
      "பெயர் மற்றும் வாட்ஸ்அப் எண்ணை சரியாகப் பதிவு செய்யவும் — அதே எண்ணுக்கே மின்னூல் அனுப்பப்படும்.",
    step3Title: "3. கட்டணம் செலுத்தவும்",
    step3Desc:
      "UPI, Google Pay, PhonePe அல்லது டெபிட்/கிரெடிட் கார்டு மூலம் பாதுகாப்பாக கட்டணம் செலுத்தவும்.",
    step4Title: "4. PDF ஐப் பெறவும்",
    step4Desc:
      "கட்டணம் வெற்றிபெற்றவுடன் PDF உங்கள் வாட்ஸ்அப்பிற்கு வரும் — உடனடியாக படிக்கத் தொடங்கவும்.",
    helpTitle: "உதவி தேவையா?",
    helpDesc:
      "கட்டணம் செலுத்தியும் PDF வரவில்லையா? நாங்கள் உடனடியாக உதவுவோம் — கீழே உள்ள எண்ணுக்கு வாட்ஸ்அப் செய்யவும்.",
    whatsappLabel: "வாட்ஸ்அப் செய்யவும்",
  },
  TELUGU: {
    badge: "కొనుగోలు విధానం",
    heading: "మీ ఈ-బుక్‌ను ఎలా పొందుతారు?",
    subheading: "నాలుగు దశల్లో చట్టపరమైన జ్ఞానం మీ వద్దకు",
    step1Title: "1. ఈ-బుక్‌ను ఎంచుకోండి",
    step1Desc:
      "మీ అవసరానికి అనుగుణంగా ఈ-బుక్ లేదా కాంబో ప్యాక్‌ను ఎంచుకోండి. 'ఇప్పుడే కొనండి' బటన్‌ను నొక్కండి.",
    step2Title: "2. సంప్రదింపు వివరాలు ఇవ్వండి",
    step2Desc:
      "పేరు మరియు వాట్సాప్ నంబర్‌ను సరిగ్గా నమోదు చేయండి — అదే నంబర్‌కు ఈ-బుక్ పంపబడుతుంది.",
    step3Title: "3. చెల్లింపు చేయండి",
    step3Desc:
      "UPI, Google Pay, PhonePe లేదా డెబిట్/క్రెడిట్ కార్డ్‌తో సురక్షితంగా చెల్లించండి.",
    step4Title: "4. PDF పొందండి",
    step4Desc:
      "చెల్లింపు విజయవంతం కాగానే PDF మీ వాట్సాప్‌కు వస్తుంది — వెంటనే చదవడం ప్రారంభించండి.",
    helpTitle: "సహాయం కావాలా?",
    helpDesc:
      "చెల్లింపు అయింది కానీ PDF రాలేదా? మేము వెంటనే సహాయం చేస్తాం — క్రింద ఇచ్చిన నంబర్‌కు వాట్సాప్ చేయండి.",
    whatsappLabel: "వాట్సాప్ చేయండి",
  },
  GUJARATI: {
    badge: "ખરીદવાની રીત",
    heading: "તમારી ઈ-બુક કેવી રીતે મેળવશો?",
    subheading: "ચાર પગલાંમાં કાનૂની જ્ઞાન તમારા સુધી",
    step1Title: "1. ઈ-બુક પસંદ કરો",
    step1Desc:
      "તમારી જરૂરિયાત મુજબ ઈ-બુક અથવા કોમ્બો પૅક પસંદ કરો. 'હમણાં ખરીદો' બટન પર ટૅપ કરો.",
    step2Title: "2. સંપર્ક વિગતો આપો",
    step2Desc:
      "નામ અને વ્હોટ્સએપ નંબર યોગ્ય રીતે નોંધો — એ જ નંબર પર ઈ-બુક મોકલવામાં આવશે.",
    step3Title: "3. ચુકવણી કરો",
    step3Desc:
      "UPI, Google Pay, PhonePe અથવા ડેબિટ/ક્રેડિટ કાર્ડથી સુરક્ષિત રીતે ચુકવણી કરો.",
    step4Title: "4. PDF મેળવો",
    step4Desc:
      "ચુકવણી સફળ થતાં જ PDF તમારા વ્હોટ્સએપ પર આવશે — તરત જ વાંચવાનું શરૂ કરો.",
    helpTitle: "મદદ જોઈએ છે?",
    helpDesc:
      "ચુકવણી થઈ પણ PDF ન આવી? અમે તરત જ મદદ કરીશું — નીચે આપેલા નંબર પર વ્હોટ્સએપ કરો.",
    whatsappLabel: "વ્હોટ્સએપ કરો",
  },
  BENGALI: {
    badge: "কেনার পদ্ধতি",
    heading: "আপনার ই-বুক কীভাবে পাবেন?",
    subheading: "চারটি ধাপে আইনি জ্ঞান আপনার কাছে",
    step1Title: "1. ই-বুক বেছে নিন",
    step1Desc:
      "আপনার প্রয়োজন অনুযায়ী ই-বুক বা কম্বো প্যাক বেছে নিন। 'এখনই কিনুন' বোতামে ট্যাপ করুন।",
    step2Title: "2. যোগাযোগের তথ্য দিন",
    step2Desc:
      "নাম ও হোয়াটসঅ্যাপ নম্বর সঠিকভাবে লিখুন — সেই একই নম্বরে ই-বুক পাঠানো হবে।",
    step3Title: "3. পেমেন্ট করুন",
    step3Desc:
      "UPI, Google Pay, PhonePe বা ডেবিট/ক্রেডিট কার্ডে নিরাপদে পেমেন্ট করুন।",
    step4Title: "4. PDF পান",
    step4Desc:
      "পেমেন্ট সফল হওয়ার সঙ্গে সঙ্গে PDF আপনার হোয়াটসঅ্যাপে চলে আসবে — সঙ্গে সঙ্গে পড়া শুরু করুন।",
    helpTitle: "সাহায্য দরকার?",
    helpDesc:
      "পেমেন্ট হয়েছে কিন্তু PDF আসেনি? আমরা তখনই সাহায্য করব — নিচে দেওয়া নম্বরে হোয়াটসঅ্যাপ করুন।",
    whatsappLabel: "হোয়াটসঅ্যাপ করুন",
  },
};

export function BuyingGuideSection() {
  const t = LABELS[useNavLanguage()];

  const steps = [
    {
      icon: BookOpen,
      title: t.step1Title,
      desc: t.step1Desc,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: Smartphone,
      title: t.step2Title,
      desc: t.step2Desc,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      icon: ShieldCheck,
      title: t.step3Title,
      desc: t.step3Desc,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      icon: Download,
      title: t.step4Title,
      desc: t.step4Desc,
      color: "text-brand-gold",
      bg: "bg-amber-50",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white py-16 lg:py-24">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 opacity-5">
        <div className="h-64 w-64 rounded-full bg-brand-teal blur-3xl" />
      </div>
      <div className="absolute right-0 bottom-0 translate-x-1/2 translate-y-1/2 opacity-5">
        <div className="h-64 w-64 rounded-full bg-brand-gold blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
          <span className="mb-2 inline-block rounded-full bg-brand-teal/10 px-4 py-1.5 text-sm font-bold text-brand-teal">
            {t.badge}
          </span>
          <h2 className="mb-4 text-3xl font-black text-brand-teal lg:text-4xl">
            {t.heading}
          </h2>
          <p className="text-lg font-medium text-gray-600">
            {t.subheading}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative flex flex-col items-center text-center"
            >
              {/* Connector Line (Desktop) */}
              {index < steps.length - 1 && (
                <div className="absolute top-8 left-1/2 -z-10 hidden w-full -translate-y-1/2 lg:block">
                  <div className="h-0.5 w-full bg-gray-100" />
                </div>
              )}

              {/* Icon */}
              <div
                className={cn(
                  "mb-6 flex h-16 w-16 items-center justify-center rounded-2xl shadow-sm transition-transform duration-300 group-hover:scale-110",
                  step.bg,
                  step.color
                )}
              >
                <step.icon className="h-8 w-8" />
              </div>

              {/* Content */}
              <h3 className="mb-2 text-xl font-bold text-gray-900">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">
                {step.desc}
              </p>

              {/* Step Number Badge */}
              <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-xs font-bold text-white opacity-0 transition-opacity group-hover:opacity-100 lg:top-0 lg:right-1/4">
                {index + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Help Note */}
        <div className="mx-auto mt-12 max-w-3xl rounded-2xl bg-brand-teal/5 p-6 text-center lg:mt-16">
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-teal/10 text-brand-teal">
              <HelpCircle className="h-6 w-6" />
            </div>
            <div className="text-left">
              <h4 className="text-lg font-bold text-brand-teal">{t.helpTitle}</h4>
              <p className="text-sm font-medium text-gray-600">
                {t.helpDesc}
                <br className="hidden sm:block" />
                {t.whatsappLabel}: <span className="font-bold text-gray-900">+91 8149319058</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
