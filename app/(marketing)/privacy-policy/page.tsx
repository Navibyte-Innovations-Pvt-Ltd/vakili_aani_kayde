import type { Metadata } from "next";
import { Lock } from "lucide-react";
import { LegalPageWrapper, LegalSection, LegalInfoCard } from "@/components/legal-page-wrapper";

export const metadata: Metadata = {
  title: "गोपनीयता धोरण | वकिली आणि कायदे",
  description: "Vakili Aani Kayde's Privacy Policy — what personal data we gather, the ways we use it, and how we keep it safe. (गोपनीयता धोरण)",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageWrapper
      title="गोपनीयता धोरण"
      titleEn="Privacy Policy"
      icon={Lock}
      badge="डेटा संरक्षण"
      badgeEn="Compliant with IT Act 2000, IT (Amendment) Act 2008, and Digital Personal Data Protection Act 2023."
      bannerText="आम्ही तुमच्या गोपनीयतेला महत्त्व देतो आणि तुमचा डेटा सुरक्षित राखण्यासाठी कटिबद्ध आहोत."
    >
      <LegalInfoCard>
        <p className="mb-1 font-black text-sm">Platform / प्लॅटफॉर्म माहिती</p>
        <p><strong>Brand:</strong> वकिली आणि कायदे (Vakili Aani Kayde)</p>
        <p><strong>Website:</strong> https://vakilianikayde.in</p>
        <p><strong>Last Updated:</strong> May 2026</p>
      </LegalInfoCard>

      <LegalSection number="१" title="आम्ही कोणती माहिती गोळा करतो? (Information We Collect)">
        <p className="mb-3">खालीलप्रमाणे माहिती आमच्याकडून संकलित केली जाऊ शकते:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li><strong>वैयक्तिक माहिती:</strong> खरेदी करताना दिलेले तुमचे नाव, ईमेल पत्ता आणि फोन/WhatsApp नंबर.</li>
          <li><strong>पेमेंट माहिती:</strong> कार्डची माहिती आम्ही स्वतःकडे ठेवत नाही; ती Razorpay (PCI-DSS compliant gateway) मार्फत हाताळली जाते आणि आम्हाला केवळ Transaction ID व payment status एवढीच मिळते.</li>
          <li><strong>तांत्रिक माहिती:</strong> Vercel Analytics मार्फत मिळणारे IP address, browser type, device information तसेच भेट दिलेली pages.</li>
          <li><strong>Cookies:</strong> Session सांभाळण्यासाठी आणि security राखण्यासाठी जेवढ्या आवश्यक तेवढ्याच cookies वापरल्या जातात.</li>
        </ul>
        <p className="mt-3 text-slate-400">The information we gather includes your Name, Email and Phone Number provided at purchase, transaction metadata received from Razorpay (never the raw card details), technical data captured through Vercel Analytics, and session cookies used to keep the site secure.</p>
      </LegalSection>

      <LegalSection number="२" title="माहितीचा वापर (Use of Information)">
        <p className="mb-3">पुढील उद्देशांसाठी तुमच्या माहितीचा उपयोग केला जातो:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>तुमची ऑर्डर पूर्ण करून ई-बुक ईमेल आणि WhatsApp द्वारे तुमच्यापर्यंत पोहोचवण्यासाठी.</li>
          <li>खरेदीची पावती (Invoice) तुम्हाला पाठवण्यासाठी.</li>
          <li>नवीन पुस्तके व ऑफर्सची माहिती देण्यासाठी (हे केव्हाही अनसबस्क्राइब करण्याचा पर्याय तुमच्याकडे असतो).</li>
          <li>तुमचे खाते सुरक्षित ठेवण्यासाठी आणि फसवणूक टाळण्यासाठी.</li>
          <li>लागू असलेली कायदेशीर बंधने पाळण्यासाठी.</li>
        </ul>
        <p className="mt-3 text-slate-400">Your data helps us fulfil and deliver orders, issue invoices, share product updates (which you may unsubscribe from at any time), guard against fraud, and meet our legal obligations.</p>
      </LegalSection>

      <LegalSection number="३" title="तृतीय-पक्ष सेवा प्रदाते (Third-Party Service Providers)">
        <p className="mb-3">जेवढी गरज असेल तेवढाच डेटा आम्ही पुढील विश्वासार्ह सेवा प्रदात्यांसोबत शेअर करतो:</p>
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
        <p className="mt-3 text-slate-400">Your personal data is never sold, rented, or traded by us. It is shared solely with the service providers that are strictly required to complete your order.</p>
      </LegalSection>

      <LegalSection number="४" title="डेटा संग्रहण कालावधी (Data Retention)">
        <p className="mb-3">तुमची माहिती आम्ही पुढील मुदतीपर्यंत जपून ठेवतो:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li><strong>ऑर्डर डेटा:</strong> कर कायदे व लेखापरीक्षणाच्या नियमांची पूर्तता म्हणून 7 वर्षे</li>
          <li><strong>खाते माहिती:</strong> खाते सुरू असेपर्यंत, आणि ते बंद झाल्यानंतर आणखी 1 वर्ष</li>
          <li><strong>Session data / Cookies:</strong> browser बंद होऊन Session संपेपर्यंत</li>
        </ul>
        <p className="mt-3 text-slate-400">For tax and audit compliance, order data is kept for 7 years, while account data stays with us for as long as the account is active plus 1 year after it is closed; session cookies are cleared the moment the browser is closed.</p>
      </LegalSection>

      <LegalSection number="५" title="डेटा सुरक्षा (Data Security)">
        <p className="mb-2">तुमची माहिती जपण्यासाठी आम्ही SSL/TLS encryption, Razorpay चे PCI-DSS compliance, AWS S3 चे secure storage आणि database-level encryption अशा उपाययोजना अमलात आणतो.</p>
        <p className="text-slate-400">We rely on SSL/TLS encryption, the PCI-DSS compliant Razorpay gateway for payments, and secure AWS S3 storage for files. Since no transmission over the internet can be guaranteed 100% safe, we reduce the risk by applying industry-standard safeguards.</p>
      </LegalSection>

      <LegalSection number="६" title="तुमचे अधिकार (Your Rights — DPDPA 2023)">
        <p className="mb-3">डिजिटल वैयक्तिक डेटा संरक्षण कायदा 2023 नुसार तुम्हाला पुढील अधिकार प्राप्त आहेत:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li><strong>माहिती मिळवणे:</strong> तुमच्याबद्दल आमच्याकडे कोणता डेटा आहे हे जाणून घेण्याचा अधिकार.</li>
          <li><strong>दुरुस्ती:</strong> चुकीची नोंद झालेली माहिती दुरुस्त करून घेण्याचा अधिकार.</li>
          <li><strong>हटवणे:</strong> ठरावीक अटींच्या अधीन राहून तुमचा डेटा काढून टाकण्याची विनंती करण्याचा अधिकार.</li>
          <li><strong>नामांकन:</strong> तुमच्या निधनानंतर डेटा सांभाळण्यासाठी एखाद्या व्यक्तीचे नामांकन करण्याचा अधिकार.</li>
        </ul>
        <p className="mt-3 text-slate-400">DPDPA 2023 entitles you to view the data we hold about you, to have any inaccuracies corrected, to ask for your data to be erased (within the limits of legally required retention), and to nominate someone to handle your data. Write to <a href="mailto:vakilianikayde@gmail.com" className="text-brand-gold hover:underline">vakilianikayde@gmail.com</a> to exercise any of these rights.</p>
      </LegalSection>

      <LegalSection number="७" title="तक्रार निवारण अधिकारी (Grievance Officer)">
        <div className="rounded-lg border border-gray-100 bg-gray-50 p-4 text-sm space-y-1">
          <p><strong>Platform:</strong> वकिली आणि कायदे (vakilianikayde.in)</p>
          <p><strong>Email:</strong> <a href="mailto:vakilianikayde@gmail.com" className="text-brand-gold hover:underline">vakilianikayde@gmail.com</a></p>
          <p><strong>Phone:</strong> +91 8149319058</p>
          <p><strong>Address:</strong> Pune, Maharashtra, India</p>
          <p><strong>तक्रार प्रतिसाद वेळ:</strong> 48 तासांच्या आत (We respond within 48 hours)</p>
          <p><strong>निराकरण वेळ:</strong> 30 दिवसांच्या आत (Issues are resolved within 30 days)</p>
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
