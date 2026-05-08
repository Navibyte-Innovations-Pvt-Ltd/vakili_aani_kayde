import type { Metadata } from "next";
import { Shield, BookOpen, Mail, Phone, MapPin, Users, Star, Zap, Scale } from "lucide-react";
import { AdvisorSection } from "@/components/marketing/advisor-section";
import Link from "next/link";

export const metadata: Metadata = {
  title: "आमच्याबद्दल | वकिली आणि कायदे",
  description: "वकिली आणि कायदे बद्दल जाणून घ्या. कायद्याचे ज्ञान सर्वांसाठी सोपे करण्याचे आमचे ध्येय.",
};

const STATS = [
  { n: "50+", label: "ई-बुक्स", icon: BookOpen },
  { n: "10k+", label: "वाचक", icon: Users },
  { n: "65k+", label: "कम्युनिटी", icon: Star },
  { n: "48h", label: "सपोर्ट", icon: Zap },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero — full-bleed dark navy */}
      <div className="bg-brand-teal px-4 py-14 md:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-gold/30 bg-brand-gold/10 px-3 py-1 text-xs font-bold text-brand-gold">
            <Scale className="h-3 w-3" /> आमच्याबद्दल
          </span>
          <h1 className="mt-3 text-3xl font-black leading-tight text-white md:text-5xl">
            कायद्याचे ज्ञान —{" "}
            <span className="text-brand-gold">प्रत्येकासाठी</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg">
            <strong className="text-white/80">वकिली आणि कायदे</strong> मध्ये तुमचे स्वागत आहे. क्लिष्ट कायदे सोप्या, स्पष्ट मराठी भाषेत — सर्वसामान्यांसाठी.
          </p>
        </div>
      </div>

      {/* Gold rule */}
      <div className="h-1 w-full bg-linear-to-r from-brand-gold/40 via-brand-gold to-brand-gold/40" />

      {/* Stats band */}
      <div className="border-b border-gray-100 bg-brand-cream px-4 py-6">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
          {STATS.map(({ n, label, icon: Icon }) => (
            <div key={n} className="flex flex-col items-center gap-1 text-center">
              <Icon className="mb-1 h-4 w-4 text-brand-gold" />
              <span className="text-2xl font-black text-brand-teal">{n}</span>
              <span className="text-xs text-gray-500">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">

        {/* Advisor */}
        <AdvisorSection />

        {/* Mission / What We Do — two columns with gold left border */}
        <div className="my-14 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border-l-4 border-brand-gold bg-brand-cream p-7">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gold/15">
              <Shield className="h-5 w-5 text-brand-gold" />
            </div>
            <h2 className="mb-3 text-xl font-black text-brand-teal">आमचे ध्येय</h2>
            <p className="text-sm leading-relaxed text-gray-600 md:text-base">
              सामान्य माणसासाठी कायदा सोपा करणे. कायद्याचे ज्ञान कोणा एकाचा विशेषाधिकार नसून तो प्रत्येकाचा मूलभूत हक्क आहे. क्लिष्ट कायदे आणि दैनंदिन जीवनातील उपयोग यांमधील दरी भरून काढणे हेच आमचे ध्येय.
            </p>
          </div>
          <div className="rounded-2xl border-l-4 border-brand-teal/30 bg-white p-7 shadow-sm">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-teal/8">
              <BookOpen className="h-5 w-5 text-brand-teal" />
            </div>
            <h2 className="mb-3 text-xl font-black text-brand-teal">आम्ही काय करतो</h2>
            <p className="text-sm leading-relaxed text-gray-600 md:text-base">
              भारतातील दैनंदिन जीवनाशी संबंधित विविध कायदेशीर विषयांवर उच्च-दर्जाची मराठी ई-बुक्स तयार करतो. मालमत्ता कायदा, ग्राहक हक्क, सायबर फसवणूक — प्रत्येक विषय सोप्या भाषेत.
            </p>
          </div>
        </div>

        {/* Big quote */}
        <div className="relative my-14 overflow-hidden rounded-3xl bg-brand-teal px-8 py-10 text-center md:px-16 md:py-14">
          <span className="absolute top-4 left-6 font-serif text-8xl leading-none text-brand-gold/15 select-none">"</span>
          <p className="relative z-10 text-lg font-bold leading-relaxed text-white/90 md:text-2xl">
            कायद्याचे अज्ञान हे हक्क गमावण्याचे मुख्य कारण आहे.
            <br className="hidden md:block" />
            <span className="text-brand-gold"> आमचे उद्दिष्ट — प्रत्येक नागरिकाला सक्षम करणे.</span>
          </p>
          <span className="absolute right-6 bottom-4 font-serif text-8xl leading-none text-brand-gold/15 select-none">"</span>
        </div>

        {/* Why us — alternating rows */}
        <div className="my-14">
          <h2 className="mb-8 flex items-center gap-3 text-xl font-black text-brand-teal md:text-2xl">
            <span className="h-6 w-1.5 rounded-full bg-brand-gold" />
            आम्हालाच का निवडावे?
          </h2>
          <div className="space-y-0">
            {[
              { n: "01", title: "सोपी मराठी भाषा", desc: "कायद्याची क्लिष्ट भाषा काढून टाकून, रोज वापरल्या जाणाऱ्या भाषेत माहिती देतो. विद्यार्थी, शेतकरी, गृहिणी — सर्वांसाठी समजण्यास सोपे." },
              { n: "02", title: "तज्ञांनी तयार केलेले", desc: "सर्व ई-बुक्स अनुभवी वकिलांनी आणि कायदा तज्ज्ञांनी तयार केल्या आहेत. माहिती अचूक, अद्ययावत आणि विश्वासार्ह." },
              { n: "03", title: "तत्काळ डिजिटल वितरण", desc: "पेमेंट यशस्वी झाल्यावर लगेच WhatsApp आणि Email वर PDF. कोठेही, केव्हाही वाचा." },
              { n: "04", title: "परवडणारी किंमत", desc: "₹49 पासून सुरू. वकिलाचे शुल्क नाही, कोर्टाचा त्रास नाही — फक्त माहिती." },
            ].map((item, i) => (
              <div key={item.n} className={`flex gap-6 border-b border-gray-100 py-6 last:border-0 ${i % 2 === 1 ? "flex-row-reverse" : ""}`}>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-brand-gold/20 bg-brand-gold/8 font-mono text-xs font-black text-brand-gold md:h-14 md:w-14 md:text-sm">
                  {item.n}
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 font-black text-brand-teal">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact info — dark navy card, no "AS Consultancy" */}
        <div className="overflow-hidden rounded-2xl bg-brand-teal">
          <div className="border-b border-white/10 px-6 py-5">
            <h2 className="font-black text-white">संपर्क माहिती</h2>
            <p className="mt-0.5 text-xs text-white/40">वकिली आणि कायदे · vakilianikayde.in</p>
          </div>
          <div className="grid gap-4 px-6 py-5 sm:grid-cols-2 md:grid-cols-3">
            {[
              { icon: Mail, label: "Email", value: "vakilianikayde@gmail.com", href: "mailto:vakilianikayde@gmail.com" },
              { icon: Phone, label: "Phone / WhatsApp", value: "+91 8149319058", href: "tel:+918149319058" },
              { icon: MapPin, label: "Location", value: "Pune, Maharashtra, India", href: null },
            ].map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10">
                  <Icon className="h-4 w-4 text-brand-gold" />
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-wider text-white/30 uppercase">{label}</p>
                  {href ? (
                    <a href={href} className="text-sm font-semibold text-white hover:text-brand-gold transition-colors">{value}</a>
                  ) : (
                    <p className="text-sm font-semibold text-white/70">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 px-6 py-4">
            <p className="text-xs text-white/25">
              Digital ebooks only — educational & reference purpose. Not legal advice. Response within 48 hours.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link
            href="/ebooks"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-gold px-6 py-3 text-sm font-black text-white shadow-sm transition-all hover:bg-brand-gold/90 hover:-translate-y-0.5"
          >
            <BookOpen className="h-4 w-4" />
            ई-बुक्स पहा
          </Link>
        </div>

      </div>
    </div>
  );
}
