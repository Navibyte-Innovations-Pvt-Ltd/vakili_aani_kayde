import type { Metadata } from "next";
import { AlertTriangle, Mail, Phone } from "lucide-react";
import { LegalPageWrapper, LegalSection } from "@/components/legal-page-wrapper";

export const metadata: Metadata = {
  title: "परतावा धोरण (Refund Policy) | वकिली आणि कायदे",
  description: "Refund and Cancellation Policy for Vakili Aani Kayde — digital ebook purchases. (परतावा धोरण)",
};

export default function RefundPolicyPage() {
  return (
    <LegalPageWrapper
      title="परतावा धोरण"
      titleEn="Refund & Cancellation Policy"
      icon={AlertTriangle}
      badge="डिजिटल उत्पादन धोरण"
      badgeEn="All products are digital ebooks (PDF only). No physical copies are shipped."
      bannerText="आम्ही केवळ डिजिटल ई-बुक्स (PDF) विकतो. एकदा खरेदी केल्यानंतर परतावा किंवा रद्दीकरण स्वीकारले जात नाही."
    >
      <LegalSection number="१" title="आम्ही काय विकतो? (What We Sell)">
        <ul className="list-disc space-y-2 pl-6">
          <li><strong>उत्पादनाचे स्वरूप:</strong> केवळ डिजिटल ई-बुक (PDF फाइल) — कोणतीही Hard Copy / Printed Book नाही.</li>
          <li><strong>वितरण:</strong> पेमेंट यशस्वी झाल्यावर तत्काळ — ईमेल + WhatsApp द्वारे.</li>
          <li><strong>उद्देश:</strong> संदर्भ आणि माहिती (Reference &amp; Educational) — कायदेशीर सल्ला नाही.</li>
        </ul>
        <p className="mt-3 text-slate-400">Product type: Digital ebook PDF only. No physical/hard copy. Delivered instantly via email and WhatsApp. For reference and educational purposes only — not legal advice.</p>
      </LegalSection>

      <LegalSection number="२" title="परतावा धोरण (Refund Policy)">
        <p className="mb-2">आमची सर्व पुस्तके PDF स्वरूपातील डिजिटल उत्पादने आहेत. एकदा डाउनलोड लिंक दिल्यानंतर परतावा शक्य नाही. खरेदी करण्यापूर्वी उत्पादन वर्णन काळजीपूर्वक वाचावे.</p>
        <p className="text-slate-400">All products are digital PDFs. Once the download link is delivered, a refund is not possible. Customers are strongly advised to read the product description carefully before purchasing.</p>
      </LegalSection>

      <LegalSection number="३" title="रद्दीकरण धोरण (Cancellation Policy)">
        <p className="mb-2">डिजिटल उत्पादने तात्काळ वितरित होतात, त्यामुळे पेमेंट पूर्ण झाल्यानंतर ऑर्डर रद्द करता येत नाही. पेमेंट सुरू केल्यावर — Razorpay पेमेंट विंडो बंद करण्यापूर्वी — रद्द करणे शक्य आहे.</p>
        <p className="text-slate-400">Since digital products are delivered instantly, cancellations are not possible after payment is completed. You may cancel before completing payment (by closing the Razorpay payment window).</p>
      </LegalSection>

      <LegalSection number="४" title="अपवाद परिस्थिती (Exceptional Circumstances)">
        <p className="mb-3">खालील परिस्थितीत आम्ही मदत करू:</p>
        <ul className="list-disc space-y-3 pl-6">
          <li>
            <strong>दुहेरी पेमेंट (Double Payment):</strong> तांत्रिक त्रुटीमुळे एकाच ऑर्डरसाठी दोनदा पैसे कापले गेल्यास — अतिरिक्त रक्कम परत केली जाईल.
            <span className="block text-sm text-slate-400 mt-1">(If charged twice for the same order due to a technical error, the extra amount will be refunded.)</span>
          </li>
          <li>
            <strong>पेमेंट कापले पण पुस्तक नाही (Payment Deducted, Product Not Received):</strong> पेमेंट यशस्वी झाले पण 30 मिनिटांत पुस्तक मिळाले नाही, तर आम्ही पुस्तक पुन्हा पाठवू किंवा परतावा देऊ.
            <span className="block text-sm text-slate-400 mt-1">(If payment was deducted but ebook was not delivered within 30 minutes, we will resend the ebook or initiate a full refund.)</span>
          </li>
        </ul>

        <div className="mt-4 rounded-lg border border-gray-100 bg-gray-50 p-4 text-sm">
          <p className="font-semibold mb-2">या परिस्थितीत काय करावे? (What to do)</p>
          <ol className="list-decimal pl-5 space-y-1 text-gray-600">
            <li>Transaction ID आणि पेमेंटचा screenshot तयार करा.</li>
            <li>खालील ईमेल वर 48 तासांत संपर्क करा.</li>
            <li>आम्ही 48–72 तासांत प्रतिसाद देऊ आणि 7 कार्यालयीन दिवसांत निराकरण करू.</li>
          </ol>
          <p className="mt-2 text-slate-400">(Prepare: Transaction ID + screenshot. Email us within 48 hours. We respond within 48–72 hours and resolve within 7 working days.)</p>
        </div>
      </LegalSection>

      <LegalSection number="५" title="परतावा प्रक्रिया (Refund Process)">
        <p className="mb-2">मान्य परतावा मूळ पेमेंट पद्धतीने (UPI / Card / Net Banking) दिला जातो. Razorpay processing वेळ: 5–7 कार्यालयीन दिवस.</p>
        <p className="text-slate-400">Approved refunds are credited back to the original payment method (UPI/Card/Net Banking) via Razorpay within 5–7 working days.</p>
      </LegalSection>

      <LegalSection number="६" title="तक्रार / Support संपर्क (Grievance Contact)">
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
        <p className="mt-4 text-xs text-slate-400 text-center">वकिली आणि कायदे — Pune, Maharashtra, India</p>
      </LegalSection>
    </LegalPageWrapper>
  );
}
