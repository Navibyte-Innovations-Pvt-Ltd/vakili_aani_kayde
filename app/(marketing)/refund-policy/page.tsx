import type { Metadata } from "next";
import { AlertTriangle, Mail, Phone } from "lucide-react";
import { LegalPageWrapper, LegalSection } from "@/components/legal-page-wrapper";

export const metadata: Metadata = {
  title: "परतावा धोरण (Refund Policy) | वकिली आणि कायदे",
  description: "वकिली आणि कायदे — डिजिटल ई-बुक खरेदीसाठी लागू होणारे परतावा व रद्दीकरण धोरण. (Refund & Cancellation terms for digital ebook orders.)",
};

export default function RefundPolicyPage() {
  return (
    <LegalPageWrapper
      title="परतावा धोरण"
      titleEn="Refund & Cancellation Policy"
      icon={AlertTriangle}
      badge="डिजिटल उत्पादन धोरण"
      badgeEn="Every product is a digital ebook in PDF format only — nothing physical is shipped."
      bannerText="आमची सर्व उत्पादने केवळ डिजिटल ई-बुक्स (PDF) आहेत. खरेदी एकदा पूर्ण झाली की परतावा अथवा रद्दीकरण दिले जात नाही."
    >
      <LegalSection number="१" title="आम्ही काय विकतो? (What We Sell)">
        <ul className="list-disc space-y-2 pl-6">
          <li><strong>उत्पादनाचे स्वरूप:</strong> फक्त डिजिटल ई-बुक (PDF फाइल) — कुठलीही Hard Copy किंवा Printed Book दिली जात नाही.</li>
          <li><strong>वितरण:</strong> ईमेल आणि WhatsApp मार्फत, पेमेंट यशस्वी होताच लगेच.</li>
          <li><strong>उद्देश:</strong> माहिती व संदर्भासाठी (Reference &amp; Educational) — हा कायदेशीर सल्ला नव्हे.</li>
        </ul>
        <p className="mt-3 text-slate-400">These are PDF-only digital ebooks with no printed or physical version. They reach you immediately through email and WhatsApp, and are meant purely for reference and learning rather than as legal advice.</p>
      </LegalSection>

      <LegalSection number="२" title="परतावा धोरण (Refund Policy)">
        <p className="mb-2">प्रत्येक पुस्तक हे PDF स्वरूपातील डिजिटल उत्पादन असल्याने, डाउनलोड लिंक एकदा पाठवल्यावर परतावा देता येत नाही. म्हणूनच खरेदीआधी उत्पादनाचे वर्णन नीट वाचून घ्यावे.</p>
        <p className="text-slate-400">Because each item is a digital PDF, no refund can be given once the download link has been sent. We urge buyers to go through the product description thoroughly before placing an order.</p>
      </LegalSection>

      <LegalSection number="३" title="रद्दीकरण धोरण (Cancellation Policy)">
        <p className="mb-2">डिजिटल उत्पादनांचे वितरण लगेच होत असल्यामुळे, पेमेंट पूर्ण झाल्यावर ऑर्डर रद्द करता येत नाही. मात्र पेमेंट पूर्ण होण्याआधी — म्हणजे Razorpay विंडो बंद करून — तुम्ही रद्द करू शकता.</p>
        <p className="text-slate-400">As digital products go out instantly, an order cannot be cancelled once payment is done. Cancellation is only possible before you finish paying — simply close the Razorpay payment window.</p>
      </LegalSection>

      <LegalSection number="४" title="अपवाद परिस्थिती (Exceptional Circumstances)">
        <p className="mb-3">पुढील प्रसंगांमध्ये मात्र आम्ही तुमच्या मदतीला येऊ:</p>
        <ul className="list-disc space-y-3 pl-6">
          <li>
            <strong>दुहेरी पेमेंट (Double Payment):</strong> एखाद्या तांत्रिक बिघाडामुळे एकाच ऑर्डरचे पैसे दोन वेळा कापले गेले, तर जादा कापलेली रक्कम परत दिली जाईल.
            <span className="block text-sm text-slate-400 mt-1">(Should a technical glitch deduct money twice for one order, the surplus amount is returned to you.)</span>
          </li>
          <li>
            <strong>पेमेंट कापले पण पुस्तक नाही (Payment Deducted, Product Not Received):</strong> पैसे यशस्वीरीत्या कापले गेले परंतु 30 मिनिटांत पुस्तक पोहोचले नाही, अशा वेळी आम्ही ते पुन्हा पाठवू किंवा पूर्ण परतावा देऊ.
            <span className="block text-sm text-slate-400 mt-1">(If the amount was taken but no ebook arrived within 30 minutes, we will either send it again or process a full refund.)</span>
          </li>
        </ul>

        <div className="mt-4 rounded-lg border border-gray-100 bg-gray-50 p-4 text-sm">
          <p className="font-semibold mb-2">अशा वेळी कोणती पावले उचलावीत? (What to do)</p>
          <ol className="list-decimal pl-5 space-y-1 text-gray-600">
            <li>तुमचा Transaction ID व पेमेंटचा screenshot जवळ ठेवा.</li>
            <li>48 तासांच्या आत खालील ईमेलवर आम्हाला कळवा.</li>
            <li>आमचा प्रतिसाद 48–72 तासांत येईल आणि 7 कार्यालयीन दिवसांत प्रकरण निकाली काढले जाईल.</li>
          </ol>
          <p className="mt-2 text-slate-400">(Keep your Transaction ID and screenshot ready, write to us at the email below within 48 hours; we reply in 48–72 hours and settle the matter inside 7 working days.)</p>
        </div>
      </LegalSection>

      <LegalSection number="५" title="परतावा प्रक्रिया (Refund Process)">
        <p className="mb-2">मंजूर झालेला परतावा ज्या पद्धतीने पैसे भरले होते त्याच मार्गाने (UPI / Card / Net Banking) जमा केला जातो. Razorpay मार्फत यासाठी 5–7 कार्यालयीन दिवस लागतात.</p>
        <p className="text-slate-400">Once approved, the refund returns to the same payment route you used (UPI/Card/Net Banking), processed through Razorpay over 5–7 working days.</p>
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
