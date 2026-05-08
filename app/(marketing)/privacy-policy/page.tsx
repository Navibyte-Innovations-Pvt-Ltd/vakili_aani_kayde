import type { Metadata } from "next";
import { Lock } from "lucide-react";
import { LegalPageWrapper, LegalSection, LegalInfoCard } from "@/components/legal-page-wrapper";

export const metadata: Metadata = {
  title: "गोपनीयता धोरण | वकिली आणि कायदे",
  description: "Privacy Policy for Vakili Aani Kayde — how we collect, use, and protect your personal data. (गोपनीयता धोरण)",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageWrapper
      title="गोपनीयता धोरण"
      titleEn="Privacy Policy"
      icon={Lock}
      badge="डेटा संरक्षण"
      badgeEn="Compliant with IT Act 2000, IT (Amendment) Act 2008, and Digital Personal Data Protection Act 2023."
      bannerText="तुमची गोपनीयता आमच्यासाठी महत्त्वाची आहे. आम्ही तुमचा डेटा सुरक्षित ठेवण्यासाठी वचनबद्ध आहोत."
    >
      <LegalInfoCard>
        <p className="mb-1 font-black text-sm">Platform / प्लॅटफॉर्म माहिती</p>
        <p><strong>Brand:</strong> वकिली आणि कायदे (Vakili Aani Kayde)</p>
        <p><strong>Website:</strong> https://vakilianikayde.in</p>
        <p><strong>Last Updated:</strong> May 2026</p>
      </LegalInfoCard>

      <LegalSection number="१" title="आम्ही कोणती माहिती गोळा करतो? (Information We Collect)">
        <p className="mb-3">आम्ही खालील माहिती गोळा करू शकतो:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li><strong>वैयक्तिक माहिती:</strong> नाव, ईमेल पत्ता, फोन/WhatsApp नंबर (खरेदी प्रक्रियेत).</li>
          <li><strong>पेमेंट माहिती:</strong> आम्ही स्वत: कार्ड माहिती साठवत नाही. ती Razorpay (PCI-DSS compliant gateway) द्वारे प्रोसेस केली जाते. आम्हाला फक्त Transaction ID आणि payment status मिळतो.</li>
          <li><strong>तांत्रिक माहिती:</strong> IP address, browser type, device information, आणि pages visited (Vercel Analytics द्वारे).</li>
          <li><strong>Cookies:</strong> Session management आणि security साठी आवश्यक cookies वापरल्या जातात.</li>
        </ul>
        <p className="mt-3 text-slate-400">We collect: Name, Email, Phone Number (during purchase); Transaction metadata from Razorpay (not raw card data); Technical data via Vercel Analytics; Session cookies for security.</p>
      </LegalSection>

      <LegalSection number="२" title="माहितीचा वापर (Use of Information)">
        <p className="mb-3">तुमची माहिती खालील कारणांसाठी वापरली जाते:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>ऑर्डर प्रोसेस करण्यासाठी आणि ई-बुक वितरित करण्यासाठी (ईमेल + WhatsApp).</li>
          <li>पेमेंट पावती (Invoice) पाठवण्यासाठी.</li>
          <li>नवीन पुस्तके आणि ऑफर्सबद्दल माहिती देण्यासाठी (तुम्ही कधीही अनसबस्क्राइब करू शकता).</li>
          <li>खाते सुरक्षितता आणि फसवणूक रोखण्यासाठी.</li>
          <li>कायदेशीर बंधने पूर्ण करण्यासाठी.</li>
        </ul>
        <p className="mt-3 text-slate-400">We use your data to: process and deliver orders; send invoices; send product updates (unsubscribe anytime); prevent fraud; comply with legal obligations.</p>
      </LegalSection>

      <LegalSection number="३" title="तृतीय-पक्ष सेवा प्रदाते (Third-Party Service Providers)">
        <p className="mb-3">आम्ही खालील विश्वसनीय सेवा प्रदात्यांसह डेटा शेअर करतो (फक्त आवश्यक तितका):</p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 p-3 text-left font-semibold">Provider</th>
                <th className="border border-gray-200 p-3 text-left font-semibold">Purpose</th>
                <th className="border border-gray-200 p-3 text-left font-semibold">Data Shared</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-200 p-3 font-medium">Razorpay</td>
                <td className="border border-gray-200 p-3">Payment processing</td>
                <td className="border border-gray-200 p-3">Name, email, phone, order amount</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-200 p-3 font-medium">Amazon Web Services (S3)</td>
                <td className="border border-gray-200 p-3">Secure PDF storage &amp; delivery</td>
                <td className="border border-gray-200 p-3">None (no personal data)</td>
              </tr>
              <tr>
                <td className="border border-gray-200 p-3 font-medium">Twilio / WhatsApp</td>
                <td className="border border-gray-200 p-3">Order delivery notification</td>
                <td className="border border-gray-200 p-3">Phone number, download link</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-200 p-3 font-medium">Vercel Analytics</td>
                <td className="border border-gray-200 p-3">Anonymous page analytics</td>
                <td className="border border-gray-200 p-3">Anonymous usage data only</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-slate-400">We never sell, rent, or trade your personal data. We only share with service providers strictly necessary to fulfill your order.</p>
      </LegalSection>

      <LegalSection number="४" title="डेटा संग्रहण कालावधी (Data Retention)">
        <p className="mb-3">आम्ही तुमची माहिती खालील कालावधीसाठी ठेवतो:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li><strong>ऑर्डर डेटा:</strong> 7 वर्षे (कर कायदे आणि लेखापरीक्षणाच्या आवश्यकतांनुसार)</li>
          <li><strong>खाते माहिती:</strong> खाते सक्रिय असेपर्यंत + बंद केल्यानंतर 1 वर्ष</li>
          <li><strong>Session data / Cookies:</strong> Session संपेपर्यंत (browser बंद केल्यावर)</li>
        </ul>
        <p className="mt-3 text-slate-400">Order data retained 7 years (tax/audit compliance). Account data retained while active + 1 year post-closure. Session cookies expire on browser close.</p>
      </LegalSection>

      <LegalSection number="५" title="डेटा सुरक्षा (Data Security)">
        <p className="mb-2">तुमची माहिती सुरक्षित ठेवण्यासाठी आम्ही खालील उपाययोजना करतो: SSL/TLS encryption, Razorpay PCI-DSS compliance, AWS S3 secure storage, आणि database-level encryption.</p>
        <p className="text-slate-400">We implement SSL/TLS encryption, PCI-DSS compliant Razorpay for payments, and secure AWS S3 for file storage. No internet transmission is 100% secure — we mitigate risk through industry-standard measures.</p>
      </LegalSection>

      <LegalSection number="६" title="तुमचे अधिकार (Your Rights — DPDPA 2023)">
        <p className="mb-3">डिजिटल वैयक्तिक डेटा संरक्षण कायदा 2023 अंतर्गत तुम्हाला खालील अधिकार आहेत:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li><strong>माहिती मिळवणे:</strong> आम्ही तुमच्याबद्दल काय डेटा ठेवतो ते जाणून घेण्याचा अधिकार.</li>
          <li><strong>दुरुस्ती:</strong> चुकीची माहिती सुधारण्याचा अधिकार.</li>
          <li><strong>हटवणे:</strong> काही अटींच्या अधीन, तुमचा डेटा हटवण्याची विनंती करण्याचा अधिकार.</li>
          <li><strong>नामांकन:</strong> तुमच्या मृत्यूनंतर डेटा व्यवस्थापनासाठी व्यक्ती नामांकित करण्याचा अधिकार.</li>
        </ul>
        <p className="mt-3 text-slate-400">Under DPDPA 2023, you have rights to: access your data, correct inaccuracies, request erasure (subject to legal retention requirements), and nominate a person to manage your data. To exercise any right, email: <a href="mailto:vakilianikayde@gmail.com" className="text-brand-gold hover:underline">vakilianikayde@gmail.com</a></p>
      </LegalSection>

      <LegalSection number="७" title="तक्रार निवारण अधिकारी (Grievance Officer)">
        <div className="rounded-lg border border-gray-100 bg-gray-50 p-4 text-sm space-y-1">
          <p><strong>Platform:</strong> वकिली आणि कायदे (vakilianikayde.in)</p>
          <p><strong>Email:</strong> <a href="mailto:vakilianikayde@gmail.com" className="text-brand-gold hover:underline">vakilianikayde@gmail.com</a></p>
          <p><strong>Phone:</strong> +91 8149319058</p>
          <p><strong>Address:</strong> Pune, Maharashtra, India</p>
          <p><strong>तक्रार प्रतिसाद वेळ:</strong> 48 तासांत (Response within 48 hours)</p>
          <p><strong>निराकरण वेळ:</strong> 30 दिवसांत (Resolution within 30 days)</p>
        </div>
      </LegalSection>

      <LegalSection number="८" title="संपर्क (Contact Us)">
        <address className="rounded-lg border border-gray-100 bg-gray-50 p-4 not-italic text-sm space-y-1">
          <p><strong>वकिली आणि कायदे (Vakili Aani Kayde)</strong></p>
          <p>Email: <a href="mailto:vakilianikayde@gmail.com" className="text-brand-gold hover:underline">vakilianikayde@gmail.com</a></p>
          <p>Pune, Maharashtra, India</p>
        </address>
      </LegalSection>
    </LegalPageWrapper>
  );
}
