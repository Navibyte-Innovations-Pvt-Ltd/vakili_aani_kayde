"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const testimonials = [
  {
    id: 1,
    content: "हे कायदेशीर मार्गदर्शक खूपच उपयुक्त आहेत. मला माझ्या व्यवसायाची नोंदणी करताना खूप मदत झाली. सोप्या भाषेतील माहितीमुळे सर्व काही समजणे सोपे झाले.",
    author: "राजेश पाटील",
    role: "छोटा व्यावसायिक",
    city: "पुणे",
    rating: 5,
    initials: "RP",
  },
  {
    id: 2,
    content: "कायद्याची माहिती इतक्या सोप्या मराठी भाषेत मिळणे अवघड आहे. 'वकिली आणि कायदे' मुळे माझे काम खूप सोपे झाले. मी सर्वांना नक्कीच शिफारस करेन.",
    author: "स्मिता देशपांडे",
    role: "गृहिणी",
    city: "नाशिक",
    rating: 5,
    initials: "SD",
  },
  {
    id: 3,
    content: "विद्यार्थी म्हणून मला कायदेशीर अभ्यासासाठी या ई-बुक्सचा खूप फायदा झाला. किंमत पण खूप वाजवी आहे आणि माहिती अगदी अचूक आहे.",
    author: "अमित कुमार",
    role: "विद्यार्थी",
    city: "मुंबई",
    rating: 5,
    initials: "AK",
  },
  {
    id: 4,
    content: "जमीन खरेदी करताना काय काळजी घ्यावी हे मला या पुस्तकामुळे समजले. आता मी फसवणूक टाळू शकतो. अतिशय उपयुक्त माहिती.",
    author: "प्रकाश जाधव",
    role: "शेतकरी",
    city: "सातारा",
    rating: 5,
    initials: "PJ",
  },
  {
    id: 5,
    content: "सायबर गुन्ह्यांबद्दलची माहिती खूप महत्वाची आहे. आजकालच्या डिजिटल युगात प्रत्येकाने हे वाचले पाहिजे.",
    author: "नेहा कुलकर्णी",
    role: "IT प्रोफेशनल",
    city: "पुणे",
    rating: 5,
    initials: "NK",
  },
  {
    id: 6,
    content: "घटस्फोट आणि पोटगी कायद्याबद्दलचे माझे अनेक गैरसमज दूर झाले. खूप छान उपक्रम आहे, नक्कीच वाचावे.",
    author: "संजय मोरे",
    role: "खाजगी कर्मचारी",
    city: "नागपूर",
    rating: 5,
    initials: "SM",
  },
  {
    id: 7,
    content: "ग्राहक म्हणून माझे हक्क काय आहेत हे मला आता पक्के माहित आहे. यामुळे माझा आत्मविश्वास वाढला आहे. धन्यवाद!",
    author: "वंदना साळुंखे",
    role: "शिक्षक",
    city: "कोल्हापूर",
    rating: 5,
    initials: "VS",
  },
];

export function TestimonialsSection() {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({ delay: 3200, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);

  return (
    <section className="overflow-hidden bg-brand-teal py-12 md:py-20">
      <div className="mx-auto max-w-6xl px-4">

        {/* Header */}
        <div className="mb-10 flex flex-col items-start gap-2 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-[11px] font-black tracking-[0.2em] text-brand-gold uppercase">वाचकांचे अनुभव</p>
            <h2 className="text-2xl font-black text-white md:text-4xl">
              10,000+ नागरिकांचा<br className="hidden md:block" /> विश्वास
            </h2>
          </div>
          <p className="text-sm text-white/40 md:text-right">
            महाराष्ट्रभरातून आलेले अनुभव
          </p>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4 md:gap-6">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="min-w-0 flex-[0_0_88%] sm:flex-[0_0_60%] md:flex-[0_0_44%] lg:flex-[0_0_32%]"
              >
                <div className="flex h-full flex-col rounded-2xl border-l-4 border-brand-gold bg-white/5 p-5 backdrop-blur-sm transition-colors hover:bg-white/8">
                  {/* Quote mark */}
                  <span className="mb-3 block font-serif text-5xl leading-none text-brand-gold/50 select-none">&ldquo;</span>

                  {/* Stars */}
                  <div className="mb-3 flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-sm ${i < t.rating ? "text-brand-gold" : "text-white/20"}`}>★</span>
                    ))}
                  </div>

                  {/* Content */}
                  <p className="mb-5 flex-1 text-sm leading-relaxed text-white/80">
                    {t.content}
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-gold/20 text-xs font-black text-brand-gold">
                      {t.initials}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{t.author}</p>
                      <p className="text-[11px] text-white/40">{t.role} · {t.city}</p>
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
            { n: "10,000+", label: "समाधानी वाचक" },
            { n: "4.8/5", label: "सरासरी रेटिंग" },
            { n: "50+", label: "प्रकाशित पुस्तके" },
            { n: "48h", label: "सपोर्ट प्रतिसाद" },
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
