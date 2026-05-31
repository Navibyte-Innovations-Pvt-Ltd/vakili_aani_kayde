import type { Metadata } from "next";
import { Zap, Send, Mail, AlertCircle } from "lucide-react";
import { LegalPageWrapper, LegalSection } from "@/components/legal-page-wrapper";

export const metadata: Metadata = {
  title: "Delivery Policy | Vakili Aani Kayde",
  description: "Our digital delivery terms — every PDF reaches you instantly over Email/WhatsApp, with nothing physical to ship.",
};

export default function ShippingPolicyPage() {
  return (
    <LegalPageWrapper
      title="Delivery Policy"
      titleEn=""
      icon={Zap}
      badge="Digital-only delivery"
      badgeEn="Each product is a digital ebook in PDF form — we ship no printed or physical copies."
      bannerText="Each of our books is available only in PDF (digital) form. As soon as your payment succeeds, the ebook link reaches you instantly."
    >
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 flex items-start gap-3">
        <AlertCircle className="h-5 w-5 shrink-0 text-amber-600 mt-0.5" />
        <div className="text-sm text-amber-900">
          <strong>Important:</strong> These ebooks are created <strong>only for informational and learning purposes</strong>. They should not be treated as legal advice. For any particular legal matter, always consult a qualified lawyer.
        </div>
      </div>

      <LegalSection number="1" title="How will I receive my ebook?">
        <p className="mb-4">As soon as your payment is complete, the ebook reaches you in two ways:</p>
        <ul className="space-y-4">
          <li className="flex items-start gap-3 rounded-lg border border-gray-100 bg-gray-50 p-4">
            <Send className="mt-1 h-5 w-5 shrink-0 text-green-600" />
            <div>
              <strong className="block text-gray-900">On Screen &amp; WhatsApp</strong>
              A Download button shows up right away once payment succeeds, and the PDF download link is delivered to the WhatsApp number you provided as well.
            </div>
          </li>
          <li className="flex items-start gap-3 rounded-lg border border-gray-100 bg-gray-50 p-4">
            <Mail className="mt-1 h-5 w-5 shrink-0 text-blue-600" />
            <div>
              <strong className="block text-gray-900">Via Email</strong>
              Your registered email receives both the download link and the invoice together.
            </div>
          </li>
        </ul>
      </LegalSection>

      <LegalSection number="2" title="Delivery Time">
        <p>It usually happens almost at once (0–5 mins); only when there is a network or server hiccup might it stretch to 10–15 minutes.</p>
      </LegalSection>

      <LegalSection number="3" title="Geographic Restrictions">
        <p>Since delivery is digital, no location-based limits apply, and the ebook can be bought from anywhere in India. Customers abroad should note that our books come in Marathi/Hindi/English.</p>
      </LegalSection>

      <LegalSection number="4" title="Facing Issues?">
        <div className="rounded-xl border-l-4 border-amber-400 bg-amber-50 p-5">
          <p className="mb-2 text-sm text-amber-800">
            Should the ebook not arrive within 30 minutes of payment, reach out to us with your Transaction ID and we will either resend it or issue a refund within 48 hours.
          </p>
          <p className="text-sm font-bold text-brand-teal">
            Email: vakilianikayde@gmail.com<br />
            WhatsApp: +91 8149319058
          </p>
        </div>
      </LegalSection>
    </LegalPageWrapper>
  );
}
