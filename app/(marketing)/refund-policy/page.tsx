import type { Metadata } from "next";
import { AlertTriangle, Mail, Phone } from "lucide-react";
import { LegalPageWrapper, LegalSection } from "@/components/legal-page-wrapper";

export const metadata: Metadata = {
  title: "Refund Policy | Vakili Aani Kayde",
  description: "Vakili Aani Kayde — Refund & Cancellation terms applicable to digital ebook orders.",
};

export default function RefundPolicyPage() {
  return (
    <LegalPageWrapper
      title="Refund Policy"
      titleEn=""
      icon={AlertTriangle}
      badge="Digital Product Policy"
      badgeEn="Every product is a digital ebook in PDF format only — nothing physical is shipped."
      bannerText="All our products are digital ebooks (PDF) only. Once a purchase is complete, no refund or cancellation is provided."
    >
      <LegalSection number="1" title="What We Sell">
        <ul className="list-disc space-y-2 pl-6">
          <li><strong>Product type:</strong> Digital ebook (PDF file) only — no hard copy or printed book is provided.</li>
          <li><strong>Delivery:</strong> Via email and WhatsApp, immediately once payment is successful.</li>
          <li><strong>Purpose:</strong> Reference &amp; educational use only — this is not legal advice.</li>
        </ul>
        <p className="mt-3">These are PDF-only digital ebooks with no printed or physical version. They reach you immediately through email and WhatsApp, and are meant purely for reference and learning rather than as legal advice.</p>
      </LegalSection>

      <LegalSection number="2" title="Refund Policy">
        <p>Because each item is a digital PDF, no refund can be given once the download link has been sent. We urge buyers to go through the product description thoroughly before placing an order.</p>
      </LegalSection>

      <LegalSection number="3" title="Cancellation Policy">
        <p>As digital products go out instantly, an order cannot be cancelled once payment is done. Cancellation is only possible before you finish paying — simply close the Razorpay payment window.</p>
      </LegalSection>

      <LegalSection number="4" title="Exceptional Circumstances">
        <p className="mb-3">In the following situations, however, we will come to your aid:</p>
        <ul className="list-disc space-y-3 pl-6">
          <li>
            <strong>Double Payment:</strong> Should a technical glitch deduct money twice for one order, the surplus amount is returned to you.
          </li>
          <li>
            <strong>Payment Deducted, Product Not Received:</strong> If the amount was taken but no ebook arrived within 30 minutes, we will either send it again or process a full refund.
          </li>
        </ul>

        <div className="mt-4 rounded-lg border border-gray-100 bg-gray-50 p-4 text-sm">
          <p className="font-semibold mb-2">What to do</p>
          <ol className="list-decimal pl-5 space-y-1 text-gray-600">
            <li>Keep your Transaction ID and payment screenshot ready.</li>
            <li>Write to us at the email below within 48 hours.</li>
            <li>We reply in 48–72 hours and settle the matter inside 7 working days.</li>
          </ol>
        </div>
      </LegalSection>

      <LegalSection number="5" title="Refund Process">
        <p>Once approved, the refund returns to the same payment route you used (UPI/Card/Net Banking), processed through Razorpay over 5–7 working days.</p>
      </LegalSection>

      <LegalSection number="6" title="Grievance Contact">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100">
              <Mail className="h-5 w-5 text-brand-teal" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase">Email (48 hrs response)</p>
              <a href="mailto:vakilianikayde@gmail.com" className="font-bold text-brand-gold hover:underline">
                vakilianikayde@gmail.com
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100">
              <Phone className="h-5 w-5 text-brand-teal" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase">WhatsApp / Phone</p>
              {process.env.NEXT_PUBLIC_WA_NUMBER ? (
                <a href={`tel:+${process.env.NEXT_PUBLIC_WA_NUMBER}`} className="font-bold text-brand-gold hover:underline">
                  +{process.env.NEXT_PUBLIC_WA_NUMBER.replace(/^91/, "")}
                </a>
              ) : (
                <span className="font-bold text-gray-400">Support unavailable</span>
              )}
            </div>
          </div>
        </div>
        <p className="mt-4 text-xs text-slate-400 text-center">Vakili Aani Kayde — Pune, Maharashtra, India</p>
      </LegalSection>
    </LegalPageWrapper>
  );
}
