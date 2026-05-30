import type { Metadata } from "next";
import { Zap, Send, Mail, AlertCircle } from "lucide-react";
import { LegalPageWrapper, LegalSection } from "@/components/legal-page-wrapper";

export const metadata: Metadata = {
  title: "वितरण धोरण (Delivery Policy) | वकिली आणि कायदे",
  description: "Our digital delivery terms — every PDF reaches you instantly over Email/WhatsApp, with nothing physical to ship. (वितरण धोरण)",
};

export default function ShippingPolicyPage() {
  return (
    <LegalPageWrapper
      title="वितरण धोरण"
      titleEn="Delivery Policy"
      icon={Zap}
      badge="फक्त डिजिटल स्वरूपात वितरण"
      badgeEn="Each product is a digital ebook in PDF form — we ship no printed or physical copies."
      bannerText="आमची प्रत्येक पुस्तक केवळ PDF (डिजिटल) रूपात उपलब्ध आहे. पेमेंट यशस्वी होताच ई-बुकची लिंक लगेच तुमच्यापर्यंत पोहोचते."
    >
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 flex items-start gap-3">
        <AlertCircle className="h-5 w-5 shrink-0 text-amber-600 mt-0.5" />
        <div className="text-sm text-amber-900">
          <strong>महत्त्वाचे (Important):</strong> ही ई-बुक्स <strong>केवळ माहिती व अभ्यासाच्या हेतूने</strong> तयार केली आहेत. यांना कायदेशीर सल्ला मानू नये. एखाद्या ठराविक कायदेशीर बाबीसाठी नेहमी पात्र वकिलाशी सल्लामसलत करा.
          <span className="block mt-1 text-xs text-amber-700">(These ebooks serve only an informational and learning purpose; they are not legal advice. For any particular legal issue, always seek guidance from a qualified lawyer.)</span>
        </div>
      </div>

      <LegalSection number="१" title="माझे पुस्तक मला कसे मिळेल? (How will I receive my ebook?)">
        <p className="mb-4">पेमेंट पूर्ण होताच पुस्तक तुमच्यापर्यंत दोन मार्गांनी पोहोचते:</p>
        <ul className="space-y-4">
          <li className="flex items-start gap-3 rounded-lg border border-gray-100 bg-gray-50 p-4">
            <Send className="mt-1 h-5 w-5 shrink-0 text-green-600" />
            <div>
              <strong className="block text-gray-900">स्क्रीनवर आणि WhatsApp वर (On Screen &amp; WhatsApp)</strong>
              पेमेंट यशस्वी होताच स्क्रीनवर &apos;Download&apos; बटण उपलब्ध होते. याशिवाय PDF ची डाउनलोड लिंक तुम्ही नोंदवलेल्या WhatsApp नंबरवरही पाठवली जाते.
              <span className="block mt-1 text-xs text-gray-500">(A Download button shows up right away, and the PDF link is delivered to your WhatsApp as well.)</span>
            </div>
          </li>
          <li className="flex items-start gap-3 rounded-lg border border-gray-100 bg-gray-50 p-4">
            <Mail className="mt-1 h-5 w-5 shrink-0 text-blue-600" />
            <div>
              <strong className="block text-gray-900">ईमेल द्वारे (Via Email)</strong>
              डाउनलोड लिंक आणि पावती (Invoice) तुमच्या नोंदणीकृत ईमेल पत्त्यावर एकत्रच पाठवली जाते.
              <span className="block mt-1 text-xs text-gray-500">(Your registered email receives both the download link and the invoice.)</span>
            </div>
          </li>
        </ul>
      </LegalSection>

      <LegalSection number="२" title="डिलिव्हरी वेळ (Delivery Time)">
        <p className="mb-2">बहुतेक वेळा संपूर्ण प्रक्रिया <strong>0–5 मिनिटांत</strong> आटोपते. नेटवर्क किंवा सर्व्हरमध्ये अडथळा आल्यास क्वचित प्रसंगी 10–15 मिनिटे लागू शकतात.</p>
        <p className="text-slate-400">It usually happens almost at once (0–5 mins); only when there is a network or server hiccup might it stretch to 10–15 minutes.</p>
      </LegalSection>

      <LegalSection number="३" title="भौगोलिक निर्बंध (Geographic Restrictions)">
        <p className="mb-2">वितरण डिजिटल असल्याने कोणतेही प्रादेशिक बंधन लागू होत नाही. भारतातील कोणत्याही ठिकाणाहून ई-बुक खरेदी करता येते. परदेशातील ग्राहकांनी हे लक्षात घ्यावे की आमची पुस्तके मराठी/हिंदी/इंग्रजी भाषांमध्ये आहेत.</p>
        <p className="text-slate-400">Since delivery is digital, no location-based limits apply, and the ebook can be bought from anywhere in India. Customers abroad should note that our books come in Marathi/Hindi/English.</p>
      </LegalSection>

      <LegalSection number="४" title="अडचण येत आहे? (Facing Issues?)">
        <div className="rounded-xl border-l-4 border-amber-400 bg-amber-50 p-5">
          <p className="mb-2 text-sm text-amber-800">
            पेमेंट होऊनसुद्धा 30 मिनिटांत पुस्तक न मिळाल्यास, तुमच्या Transaction ID सह लगेच आमच्याशी संपर्क साधा. 48 तासांच्या आत आम्ही पुस्तक पुन्हा पाठवू अथवा रक्कम परत करू.
          </p>
          <p className="text-sm font-bold text-brand-teal">
            Email: vakilianikayde@gmail.com<br />
            WhatsApp: +91 8149319058
          </p>
          <p className="mt-1 text-xs text-gray-500">
            (Should the ebook not arrive within 30 minutes of payment, reach out to us with your Transaction ID and we will either resend it or issue a refund within 48 hours.)
          </p>
        </div>
      </LegalSection>
    </LegalPageWrapper>
  );
}
