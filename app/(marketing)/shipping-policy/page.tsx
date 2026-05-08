import type { Metadata } from "next";
import { Zap, Send, Mail, AlertCircle } from "lucide-react";
import { LegalPageWrapper, LegalSection } from "@/components/legal-page-wrapper";

export const metadata: Metadata = {
  title: "वितरण धोरण (Delivery Policy) | वकिली आणि कायदे",
  description: "Digital Delivery Policy — Instant PDF delivery via Email/WhatsApp. No physical shipping. (वितरण धोरण)",
};

export default function ShippingPolicyPage() {
  return (
    <LegalPageWrapper
      title="वितरण धोरण"
      titleEn="Delivery Policy"
      icon={Zap}
      badge="केवळ डिजिटल वितरण"
      badgeEn="All products are digital ebooks (PDF). No physical / printed books are shipped."
      bannerText="आमची सर्व पुस्तके केवळ डिजिटल (PDF) स्वरूपात आहेत. खरेदी यशस्वी झाल्यानंतर तत्काळ ई-बुक लिंक मिळेल."
    >
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 flex items-start gap-3">
        <AlertCircle className="h-5 w-5 shrink-0 text-amber-600 mt-0.5" />
        <div className="text-sm text-amber-900">
          <strong>महत्त्वाचे (Important):</strong> आमची ई-बुक्स केवळ <strong>संदर्भ आणि माहितीच्या उद्देशाने</strong> आहेत. हे कोणत्याही प्रकारचा कायदेशीर सल्ला नाही. विशिष्ट कायदेशीर समस्येसाठी नेहमी तज्ञ वकिलाचा सल्ला घ्यावा.
          <span className="block mt-1 text-xs text-amber-700">(Our ebooks are for reference and educational purposes only. They do not constitute legal advice. Always consult a qualified lawyer for specific legal matters.)</span>
        </div>
      </div>

      <LegalSection number="१" title="माझे पुस्तक मला कसे मिळेल? (How will I receive my ebook?)">
        <p className="mb-4">पेमेंट पूर्ण झाल्यावर दोन प्रकारे तुम्हाला पुस्तक मिळेल:</p>
        <ul className="space-y-4">
          <li className="flex items-start gap-3 rounded-lg border border-gray-100 bg-gray-50 p-4">
            <Send className="mt-1 h-5 w-5 shrink-0 text-green-600" />
            <div>
              <strong className="block text-gray-900">स्क्रीनवर आणि WhatsApp वर (On Screen &amp; WhatsApp)</strong>
              पेमेंट यशस्वी झाल्यावर लगेच &apos;Download&apos; बटण दिसेल. तसेच, तुम्ही दिलेल्या WhatsApp नंबरवर PDF डाउनलोड लिंक पाठवली जाईल.
              <span className="block mt-1 text-xs text-gray-500">(Download button appears immediately. PDF link also sent to your WhatsApp.)</span>
            </div>
          </li>
          <li className="flex items-start gap-3 rounded-lg border border-gray-100 bg-gray-50 p-4">
            <Mail className="mt-1 h-5 w-5 shrink-0 text-blue-600" />
            <div>
              <strong className="block text-gray-900">ईमेल द्वारे (Via Email)</strong>
              तुमच्या नोंदणीकृत ईमेल पत्त्यावर डाउनलोड लिंकसह पावती (Invoice) पाठवली जाईल.
              <span className="block mt-1 text-xs text-gray-500">(Download link + invoice sent to your registered email.)</span>
            </div>
          </li>
        </ul>
      </LegalSection>

      <LegalSection number="२" title="डिलिव्हरी वेळ (Delivery Time)">
        <p className="mb-2">साधारणतः <strong>0–5 मिनिटांत</strong> प्रक्रिया पूर्ण होते. कधीकधी इंटरनेट किंवा सर्व्हरच्या समस्यांमुळे 10–15 मिनिटे लागू शकतात.</p>
        <p className="text-slate-400">Typically instant (0–5 mins). In rare cases of network/server issues, up to 10–15 minutes.</p>
      </LegalSection>

      <LegalSection number="३" title="भौगोलिक निर्बंध (Geographic Restrictions)">
        <p className="mb-2">डिजिटल वितरणामुळे भौगोलिक निर्बंध नाहीत. भारतातील कोठूनही ई-बुक खरेदी करता येते. आंतरराष्ट्रीय ग्राहकांसाठी: आमची पुस्तके मराठी/हिंदी/इंग्रजी भाषेत आहेत.</p>
        <p className="text-slate-400">No geographic restrictions for digital delivery. Available across India. International customers: ebooks are in Marathi/Hindi/English.</p>
      </LegalSection>

      <LegalSection number="४" title="अडचण येत आहे? (Facing Issues?)">
        <div className="rounded-xl border-l-4 border-amber-400 bg-amber-50 p-5">
          <p className="mb-2 text-sm text-amber-800">
            जर पेमेंट होऊनही 30 मिनिटांत पुस्तक मिळाले नाही, तर Transaction ID सह आम्हाला तत्काळ संपर्क करा. आम्ही 48 तासांत पुस्तक पुन्हा पाठवू किंवा परतावा देऊ.
          </p>
          <p className="text-sm font-bold text-brand-teal">
            Email: vakilianikayde@gmail.com<br />
            WhatsApp: +91 8149319058
          </p>
          <p className="mt-1 text-xs text-gray-500">
            (If not received within 30 minutes of payment, contact us with your Transaction ID. We will resend or refund within 48 hours.)
          </p>
        </div>
      </LegalSection>
    </LegalPageWrapper>
  );
}
