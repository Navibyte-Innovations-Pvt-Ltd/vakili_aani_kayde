import type { Metadata } from "next";
import { Mail, MapPin, Phone, MessageCircle, Clock, Scale } from "lucide-react";
import { ContactForm } from "./_components/contact-form";

export const metadata: Metadata = {
  title: "संपर्क करा | वकिली आणि कायदे",
  description: "वकिली आणि कायदे शी संपर्क करा — ई-बुक सपोर्ट, ऑर्डर मदत किंवा कोणत्याही प्रश्नासाठी.",
};

const CONTACT_ITEMS = [
  {
    icon: Mail,
    label: "Email",
    value: "vakilianikayde@gmail.com",
    sub: "48 तासांत उत्तर",
    href: "mailto:vakilianikayde@gmail.com",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: process.env.NEXT_PUBLIC_WA_NUMBER ? `+${process.env.NEXT_PUBLIC_WA_NUMBER.replace(/^91/, "")}` : "Support unavailable",
    sub: "जलद मदतीसाठी",
    href: process.env.NEXT_PUBLIC_WA_NUMBER ? `https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER}` : null,
  },
  {
    icon: Phone,
    label: "Phone",
    value: process.env.NEXT_PUBLIC_WA_NUMBER ? `+${process.env.NEXT_PUBLIC_WA_NUMBER.replace(/^91/, "")}` : "Support unavailable",
    sub: "सोम–शनि, सकाळी ९ – संध्या ६",
    href: process.env.NEXT_PUBLIC_WA_NUMBER ? `tel:+${process.env.NEXT_PUBLIC_WA_NUMBER}` : null,
  },
  {
    icon: MapPin,
    label: "Address",
    value: "Pune, Maharashtra",
    sub: "India",
    href: null,
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Split hero */}
      <div className="grid md:grid-cols-2">

        {/* Left — dark navy info panel */}
        <div className="flex flex-col bg-brand-teal px-6 py-12 md:min-h-[70vh] md:px-12 md:py-16">
          <div className="flex items-center gap-2 mb-8">
            <Scale className="h-4 w-4 text-brand-gold" />
            <span className="text-xs font-black tracking-widest text-brand-gold uppercase">संपर्क</span>
          </div>

          <h1 className="mb-4 text-3xl font-black leading-tight text-white md:text-4xl">
            काही मदत<br />हवी आहे?
          </h1>
          <p className="mb-10 text-sm leading-relaxed text-white/50 md:text-base">
            ई-बुकबद्दल प्रश्न असो किंवा ऑर्डर सपोर्ट — आम्ही लवकरात लवकर प्रतिसाद देतो.
          </p>

          <div className="flex flex-col gap-5">
            {CONTACT_ITEMS.map(({ icon: Icon, label, value, sub, href }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/8">
                  <Icon className="h-5 w-5 text-brand-gold" />
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-widest text-white/30 uppercase">{label}</p>
                  {href ? (
                    <a href={href} target={href.startsWith("https") ? "_blank" : undefined} rel="noopener noreferrer"
                      className="text-sm font-bold text-white transition-colors hover:text-brand-gold">
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm font-bold text-white">{value}</p>
                  )}
                  <p className="text-[11px] text-white/35">{sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Response time note */}
          <div className="mt-auto flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 mt-10">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" />
            <p className="text-xs leading-relaxed text-white/40">
              सामान्यतः <strong className="text-white/60">48 तासांत</strong> प्रतिसाद आणि <strong className="text-white/60">7 कार्यालयीन दिवसांत</strong> निराकरण.
            </p>
          </div>
        </div>

        {/* Right — form on cream */}
        <div className="flex flex-col justify-center bg-brand-cream px-6 py-12 md:px-12 md:py-16">
          <h2 className="mb-1 text-xl font-black text-brand-teal">संदेश पाठवा</h2>
          <p className="mb-7 text-sm text-gray-400">Send us a message</p>
          <ContactForm />
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-gray-100 bg-white px-4 py-6 text-center">
        <p className="text-xs text-gray-400">
          वकिली आणि कायदे · vakilianikayde.in · Pune, Maharashtra, India
          <span className="mx-2 text-gray-200">|</span>
          Digital ebooks for educational purposes only — not legal advice.
        </p>
      </div>
    </div>
  );
}
