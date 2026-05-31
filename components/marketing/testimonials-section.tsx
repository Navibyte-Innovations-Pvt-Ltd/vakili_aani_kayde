"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { type Language } from "@/lib/languages";
import { useNavLanguage } from "@/components/nav-language-context";

// Proper nouns (names, cities) stay unchanged across languages.
const testimonials = [
  { id: 1, author: "राजेश पाटील", city: "पुणे", rating: 5, initials: "RP" },
  { id: 2, author: "स्मिता देशपांडे", city: "नाशिक", rating: 5, initials: "SD" },
  { id: 3, author: "अमित कुमार", city: "मुंबई", rating: 5, initials: "AK" },
  { id: 4, author: "प्रकाश जाधव", city: "सातारा", rating: 5, initials: "PJ" },
  { id: 5, author: "नेहा कुलकर्णी", city: "पुणे", rating: 5, initials: "NK" },
  { id: 6, author: "संजय मोरे", city: "नागपूर", rating: 5, initials: "SM" },
  { id: 7, author: "वंदना साळुंखे", city: "कोल्हापूर", rating: 5, initials: "VS" },
];

// Per-language quote + role, index-aligned with `testimonials`.
const TESTIMONIAL_TEXT: Record<Language, { content: string; role: string }[]> = {
  MARATHI: [
    { content: "हे कायदेशीर मार्गदर्शक खूपच उपयुक्त आहेत. मला माझ्या व्यवसायाची नोंदणी करताना खूप मदत झाली. सोप्या भाषेतील माहितीमुळे सर्व काही समजणे सोपे झाले.", role: "छोटा व्यावसायिक" },
    { content: "कायद्याची माहिती इतक्या सोप्या मराठी भाषेत मिळणे अवघड आहे. 'वकिली आणि कायदे' मुळे माझे काम खूप सोपे झाले. मी सर्वांना नक्कीच शिफारस करेन.", role: "गृहिणी" },
    { content: "विद्यार्थी म्हणून मला कायदेशीर अभ्यासासाठी या ई-बुक्सचा खूप फायदा झाला. किंमत पण खूप वाजवी आहे आणि माहिती अगदी अचूक आहे.", role: "विद्यार्थी" },
    { content: "जमीन खरेदी करताना काय काळजी घ्यावी हे मला या पुस्तकामुळे समजले. आता मी फसवणूक टाळू शकतो. अतिशय उपयुक्त माहिती.", role: "शेतकरी" },
    { content: "सायबर गुन्ह्यांबद्दलची माहिती खूप महत्वाची आहे. आजकालच्या डिजिटल युगात प्रत्येकाने हे वाचले पाहिजे.", role: "IT प्रोफेशनल" },
    { content: "घटस्फोट आणि पोटगी कायद्याबद्दलचे माझे अनेक गैरसमज दूर झाले. खूप छान उपक्रम आहे, नक्कीच वाचावे.", role: "खाजगी कर्मचारी" },
    { content: "ग्राहक म्हणून माझे हक्क काय आहेत हे मला आता पक्के माहित आहे. यामुळे माझा आत्मविश्वास वाढला आहे. धन्यवाद!", role: "शिक्षक" },
  ],
  HINDI: [
    { content: "ये कानूनी मार्गदर्शक बहुत उपयोगी हैं। मुझे अपने व्यवसाय का पंजीकरण करते समय बहुत मदद मिली। सरल भाषा की जानकारी से सब कुछ समझना आसान हो गया।", role: "लघु व्यवसायी" },
    { content: "कानून की जानकारी इतनी सरल भाषा में मिलना मुश्किल है। 'वकिली आणि कायदे' की वजह से मेरा काम बहुत आसान हो गया। मैं सभी को जरूर सिफारिश करूंगी।", role: "गृहिणी" },
    { content: "छात्र के रूप में मुझे कानूनी पढ़ाई के लिए इन ई-बुक्स का बहुत फायदा हुआ। कीमत भी बहुत वाजिब है और जानकारी बिल्कुल सटीक है।", role: "छात्र" },
    { content: "जमीन खरीदते समय क्या सावधानी रखनी चाहिए यह मुझे इस किताब से समझ आया। अब मैं धोखाधड़ी से बच सकता हूं। बहुत उपयोगी जानकारी।", role: "किसान" },
    { content: "साइबर अपराधों के बारे में जानकारी बहुत महत्वपूर्ण है। आजकल के डिजिटल युग में हर किसी को यह पढ़ना चाहिए।", role: "IT प्रोफेशनल" },
    { content: "तलाक और गुजारा भत्ता कानून के बारे में मेरी कई गलतफहमियां दूर हुईं। बहुत अच्छा प्रयास है, जरूर पढ़ना चाहिए।", role: "निजी कर्मचारी" },
    { content: "उपभोक्ता के रूप में मेरे क्या अधिकार हैं यह मुझे अब अच्छी तरह पता है। इससे मेरा आत्मविश्वास बढ़ा है। धन्यवाद!", role: "शिक्षक" },
  ],
  ENGLISH: [
    { content: "These legal guides are very useful. They helped me a lot while registering my business. The information in simple language made everything easy to understand.", role: "Small Business Owner" },
    { content: "It's hard to find legal information in such simple language. 'Vakili Aani Kayde' made my work much easier. I will surely recommend it to everyone.", role: "Homemaker" },
    { content: "As a student, these e-books helped me a lot with my legal studies. The price is very reasonable and the information is accurate.", role: "Student" },
    { content: "This book taught me what precautions to take while buying land. Now I can avoid fraud. Very useful information.", role: "Farmer" },
    { content: "The information about cybercrimes is very important. In today's digital age, everyone should read this.", role: "IT Professional" },
    { content: "Many of my misconceptions about divorce and alimony law were cleared. A great initiative — definitely worth reading.", role: "Private Employee" },
    { content: "I now clearly know my rights as a consumer. This has boosted my confidence. Thank you!", role: "Teacher" },
  ],
  TAMIL: [
    { content: "இந்த சட்ட வழிகாட்டிகள் மிகவும் பயனுள்ளவை. என் வணிகத்தைப் பதிவு செய்யும்போது எனக்கு நிறைய உதவியது. எளிய மொழியில் உள்ள தகவல்கள் அனைத்தையும் புரிந்துகொள்ள எளிதாக்கின.", role: "சிறு வணிகர்" },
    { content: "சட்டத் தகவல்களை இவ்வளவு எளிய மொழியில் பெறுவது கடினம். 'வகிலி ஆணி காயதே' மூலம் என் வேலை மிகவும் எளிதாகியது. நான் நிச்சயமாக அனைவருக்கும் பரிந்துரைப்பேன்.", role: "இல்லத்தரசி" },
    { content: "மாணவனாக, சட்டப் படிப்புக்கு இந்த மின்னூல்கள் எனக்கு நிறைய பயனளித்தன. விலையும் மிகவும் நியாயமானது, தகவல்களும் துல்லியமானவை.", role: "மாணவர்" },
    { content: "நிலம் வாங்கும்போது என்ன கவனம் தேவை என்பதை இந்தப் புத்தகம் மூலம் புரிந்துகொண்டேன். இப்போது மோசடியைத் தவிர்க்க முடியும். மிகவும் பயனுள்ள தகவல்.", role: "விவசாயி" },
    { content: "சைபர் குற்றங்கள் பற்றிய தகவல் மிகவும் முக்கியம். இன்றைய டிஜிட்டல் யுகத்தில் ஒவ்வொருவரும் இதைப் படிக்க வேண்டும்.", role: "IT நிபுணர்" },
    { content: "விவாகரத்து மற்றும் ஜீவனாம்சச் சட்டம் பற்றிய என் பல தவறான கருத்துகள் தீர்ந்தன. மிகச் சிறந்த முயற்சி, கண்டிப்பாகப் படிக்க வேண்டும்.", role: "தனியார் ஊழியர்" },
    { content: "நுகர்வோராக என் உரிமைகள் என்ன என்பது இப்போது எனக்குத் தெளிவாகத் தெரியும். இது என் தன்னம்பிக்கையை அதிகரித்துள்ளது. நன்றி!", role: "ஆசிரியர்" },
  ],
  TELUGU: [
    { content: "ఈ న్యాయ మార్గదర్శకాలు చాలా ఉపయోగకరంగా ఉన్నాయి. నా వ్యాపారాన్ని నమోదు చేసేటప్పుడు నాకు చాలా సహాయపడ్డాయి. సరళమైన భాషలో ఉన్న సమాచారం అన్నింటినీ అర్థం చేసుకోవడం సులభం చేసింది.", role: "చిన్న వ్యాపారి" },
    { content: "న్యాయ సమాచారాన్ని ఇంత సరళమైన భాషలో పొందడం కష్టం. 'వకిలి ఆణి కాయదే' వల్ల నా పని చాలా సులభమైంది. నేను తప్పకుండా అందరికీ సిఫార్సు చేస్తాను.", role: "గృహిణి" },
    { content: "విద్యార్థిగా, న్యాయ విద్యకు ఈ ఈ-బుక్‌లు నాకు చాలా ఉపయోగపడ్డాయి. ధర కూడా చాలా సహేతుకంగా ఉంది, సమాచారం ఖచ్చితంగా ఉంది.", role: "విద్యార్థి" },
    { content: "భూమి కొనేటప్పుడు ఎలాంటి జాగ్రత్తలు తీసుకోవాలో ఈ పుస్తకం ద్వారా అర్థమైంది. ఇప్పుడు నేను మోసాన్ని నివారించగలను. చాలా ఉపయోగకరమైన సమాచారం.", role: "రైతు" },
    { content: "సైబర్ నేరాల గురించిన సమాచారం చాలా ముఖ్యం. నేటి డిజిటల్ యుగంలో ప్రతి ఒక్కరూ దీన్ని చదవాలి.", role: "IT నిపుణుడు" },
    { content: "విడాకులు మరియు భరణం చట్టం గురించి నా అనేక అపోహలు తొలగిపోయాయి. చాలా మంచి ప్రయత్నం, తప్పకుండా చదవాలి.", role: "ప్రైవేట్ ఉద్యోగి" },
    { content: "వినియోగదారుగా నా హక్కులు ఏమిటో ఇప్పుడు నాకు స్పష్టంగా తెలుసు. దీనివల్ల నా ఆత్మవిశ్వాసం పెరిగింది. ధన్యవాదాలు!", role: "ఉపాధ్యాయుడు" },
  ],
  GUJARATI: [
    { content: "આ કાનૂની માર્ગદર્શિકાઓ ખૂબ જ ઉપયોગી છે. મારા વ્યવસાયની નોંધણી કરતી વખતે મને ઘણી મદદ મળી. સરળ ભાષામાંની માહિતીને કારણે બધું સમજવું સરળ થઈ ગયું.", role: "નાના વેપારી" },
    { content: "કાયદાની માહિતી આટલી સરળ ભાષામાં મળવી મુશ્કેલ છે. 'વકિલી આણિ કાયદે' ને કારણે મારું કામ ખૂબ સરળ થઈ ગયું. હું બધાને ચોક્કસ ભલામણ કરીશ.", role: "ગૃહિણી" },
    { content: "વિદ્યાર્થી તરીકે મને કાનૂની અભ્યાસ માટે આ ઈ-બુક્સનો ઘણો ફાયદો થયો. કિંમત પણ ખૂબ વાજબી છે અને માહિતી એકદમ સચોટ છે.", role: "વિદ્યાર્થી" },
    { content: "જમીન ખરીદતી વખતે શું કાળજી રાખવી તે મને આ પુસ્તકથી સમજાયું. હવે હું છેતરપિંડીથી બચી શકું છું. ખૂબ ઉપયોગી માહિતી.", role: "ખેડૂત" },
    { content: "સાયબર ગુનાઓ વિશેની માહિતી ખૂબ મહત્વપૂર્ણ છે. આજના ડિજિટલ યુગમાં દરેકે આ વાંચવું જોઈએ.", role: "IT પ્રોફેશનલ" },
    { content: "છૂટાછેડા અને ભરણપોષણ કાયદા વિશેની મારી ઘણી ગેરસમજો દૂર થઈ. ખૂબ સરસ પહેલ છે, ચોક્કસ વાંચવું જોઈએ.", role: "ખાનગી કર્મચારી" },
    { content: "ગ્રાહક તરીકે મારા અધિકારો શું છે તે મને હવે બરાબર ખબર છે. આનાથી મારો આત્મવિશ્વાસ વધ્યો છે. આભાર!", role: "શિક્ષક" },
  ],
  BENGALI: [
    { content: "এই আইনি গাইডগুলি খুবই উপযোগী। আমার ব্যবসা নিবন্ধন করার সময় অনেক সাহায্য পেয়েছি। সহজ ভাষায় তথ্য থাকায় সবকিছু বোঝা সহজ হয়েছে।", role: "ছোট ব্যবসায়ী" },
    { content: "এত সহজ ভাষায় আইনি তথ্য পাওয়া কঠিন। 'ভাকিলি আনি কায়দে'-র কারণে আমার কাজ অনেক সহজ হয়েছে। আমি অবশ্যই সবাইকে সুপারিশ করব।", role: "গৃহিণী" },
    { content: "ছাত্র হিসেবে আইন পড়াশোনায় এই ই-বুকগুলি আমাকে অনেক সাহায্য করেছে। দামও খুব সাশ্রয়ী এবং তথ্য একদম নির্ভুল।", role: "ছাত্র" },
    { content: "জমি কেনার সময় কী সতর্কতা নিতে হবে তা এই বই থেকে বুঝেছি। এখন আমি প্রতারণা এড়াতে পারি। খুব উপযোগী তথ্য।", role: "কৃষক" },
    { content: "সাইবার অপরাধ সম্পর্কে তথ্য খুবই গুরুত্বপূর্ণ। আজকের ডিজিটাল যুগে প্রত্যেকের এটি পড়া উচিত।", role: "IT পেশাদার" },
    { content: "বিবাহবিচ্ছেদ ও খোরপোশ আইন সম্পর্কে আমার অনেক ভুল ধারণা দূর হয়েছে। খুব ভালো উদ্যোগ, অবশ্যই পড়া উচিত।", role: "বেসরকারি কর্মচারী" },
    { content: "ভোক্তা হিসেবে আমার অধিকার কী তা এখন স্পষ্ট জানি। এতে আমার আত্মবিশ্বাস বেড়েছে। ধন্যবাদ!", role: "শিক্ষক" },
  ],
};

const LABELS: Record<Language, { eyebrow: string; heading: string; fromAcross: string; satisfied: string; avgRating: string; published: string; support: string }> = {
  MARATHI: { eyebrow: "वाचकांचे अनुभव", heading: "10,000+ नागरिकांचा विश्वास", fromAcross: "महाराष्ट्रभरातून आलेले अनुभव", satisfied: "समाधानी वाचक", avgRating: "सरासरी रेटिंग", published: "प्रकाशित पुस्तके", support: "सपोर्ट प्रतिसाद" },
  HINDI: { eyebrow: "पाठकों के अनुभव", heading: "10,000+ नागरिकों का भरोसा", fromAcross: "महाराष्ट्र भर से आए अनुभव", satisfied: "संतुष्ट पाठक", avgRating: "औसत रेटिंग", published: "प्रकाशित किताबें", support: "सपोर्ट प्रतिक्रिया" },
  ENGLISH: { eyebrow: "What Readers Say", heading: "Trusted by 10,000+ citizens", fromAcross: "Experiences from across Maharashtra", satisfied: "Happy Readers", avgRating: "Average Rating", published: "Books Published", support: "Support Response" },
  TAMIL: { eyebrow: "வாசகர்களின் அனுபவங்கள்", heading: "10,000+ குடிமக்களின் நம்பிக்கை", fromAcross: "மகாராஷ்டிரா முழுவதிலிருந்தும் வந்த அனுபவங்கள்", satisfied: "திருப்தியான வாசகர்கள்", avgRating: "சராசரி மதிப்பீடு", published: "வெளியிடப்பட்ட புத்தகங்கள்", support: "ஆதரவு பதில்" },
  TELUGU: { eyebrow: "పాఠకుల అనుభవాలు", heading: "10,000+ పౌరుల నమ్మకం", fromAcross: "మహారాష్ట్ర అంతటి నుండి వచ్చిన అనుభవాలు", satisfied: "సంతృప్తి చెందిన పాఠకులు", avgRating: "సగటు రేటింగ్", published: "ప్రచురించిన పుస్తకాలు", support: "సపోర్ట్ స్పందన" },
  GUJARATI: { eyebrow: "વાચકોના અનુભવો", heading: "10,000+ નાગરિકોનો વિશ્વાસ", fromAcross: "મહારાષ્ટ્રભરમાંથી આવેલા અનુભવો", satisfied: "સંતુષ્ટ વાચકો", avgRating: "સરેરાશ રેટિંગ", published: "પ્રકાશિત પુસ્તકો", support: "સપોર્ટ પ્રતિસાદ" },
  BENGALI: { eyebrow: "পাঠকদের অভিজ্ঞতা", heading: "10,000+ নাগরিকের আস্থা", fromAcross: "মহারাষ্ট্র জুড়ে আসা অভিজ্ঞতা", satisfied: "সন্তুষ্ট পাঠক", avgRating: "গড় রেটিং", published: "প্রকাশিত বই", support: "সাপোর্ট প্রতিক্রিয়া" },
};

export function TestimonialsSection() {
  const lang = useNavLanguage();
  const t = LABELS[lang];
  const texts = TESTIMONIAL_TEXT[lang];
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({ delay: 3200, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);

  return (
    <section className="overflow-hidden bg-brand-teal py-12 md:py-20">
      <div className="mx-auto max-w-6xl px-4">

        {/* Header */}
        <div className="mb-10 flex flex-col items-start gap-2 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-[11px] font-black tracking-[0.2em] text-brand-gold uppercase">{t.eyebrow}</p>
            <h2 className="text-2xl font-black text-white md:text-4xl">
              {t.heading}
            </h2>
          </div>
          <p className="text-sm text-white/40 md:text-right">
            {t.fromAcross}
          </p>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4 md:gap-6">
            {testimonials.map((item, i) => (
              <div
                key={item.id}
                className="min-w-0 flex-[0_0_88%] sm:flex-[0_0_60%] md:flex-[0_0_44%] lg:flex-[0_0_32%]"
              >
                <div className="flex h-full flex-col rounded-2xl border-l-4 border-brand-gold bg-white/5 p-5 backdrop-blur-sm transition-colors hover:bg-white/8">
                  {/* Quote mark */}
                  <span className="mb-3 block font-serif text-5xl leading-none text-brand-gold/50 select-none">&ldquo;</span>

                  {/* Stars */}
                  <div className="mb-3 flex gap-0.5">
                    {[...Array(5)].map((_, idx) => (
                      <span key={idx} className={`text-sm ${idx < item.rating ? "text-brand-gold" : "text-white/20"}`}>★</span>
                    ))}
                  </div>

                  {/* Content */}
                  <p className="mb-5 flex-1 text-sm leading-relaxed text-white/80">
                    {texts[i].content}
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-gold/20 text-xs font-black text-brand-gold">
                      {item.initials}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{item.author}</p>
                      <p className="text-[11px] text-white/40">{texts[i].role} · {item.city}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom stat strip */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-8 border-t border-white/10 pt-8 text-center md:justify-between">
          {[
            { n: "10,000+", label: t.satisfied },
            { n: "4.8/5", label: t.avgRating },
            { n: "50+", label: t.published },
            { n: "48h", label: t.support },
          ].map((s) => (
            <div key={s.n} className="flex flex-col gap-0.5">
              <span className="text-xl font-black text-brand-gold md:text-2xl">{s.n}</span>
              <span className="text-[11px] text-white/40">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
