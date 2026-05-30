import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { LegalPageWrapper, LegalSection, LegalInfoCard } from "@/components/legal-page-wrapper";

export const metadata: Metadata = {
  title: "नियम व अटी | वकिली आणि कायदे",
  description: "Read the terms governing your use of Vakili Aani Kayde and the purchase of our digital ebooks. (नियम आणि अटी)",
};

export default function TermsPage() {
  return (
    <LegalPageWrapper
      title="नियम व अटी"
      titleEn="Terms & Conditions"
      icon={ShieldCheck}
      badge="प्लॅटफॉर्मविषयी अधिकृत माहिती"
      badgeEn="The brand Vakili Aani Kayde (vakilianikayde.in) owns and runs this platform."
      bannerText="&quot;वकिली आणि कायदे&quot; (vakilianikayde.in) या ब्रँडमार्फत हे डिजिटल प्लॅटफॉर्म संचालित केले जाते."
    >
      <LegalInfoCard>
        <p className="mb-1 font-black text-sm">Business Details / व्यवसाय तपशील</p>
        <p><strong>Brand:</strong> वकिली आणि कायदे (Vakili Aani Kayde)</p>
        <p><strong>Website:</strong> https://vakilianikayde.in</p>
        <p><strong>Business Type:</strong> Digital Goods — Educational Ebooks (PDF format only)</p>
        <p><strong>Address:</strong> Pune, Maharashtra, India</p>
        <p><strong>Email:</strong> vakilianikayde@gmail.com</p>
  <p><strong>Phone:</strong> {process.env.NEXT_PUBLIC_WA_NUMBER ? `+${process.env.NEXT_PUBLIC_WA_NUMBER.replace(/^91/, "")}` : "Support unavailable"}</p>
      </LegalInfoCard>

      <LegalSection number="१" title="अटींचा स्वीकार (Agreement to Terms)">
        <p className="mb-2">ही साइट वापरताना किंवा येथून उत्पादने विकत घेताना, तुम्ही या नियम व अटी पाळण्याचे मान्य करत आहात.</p>
        <p className="text-slate-400">When you use the Site, you accept these Terms in full. Should you disagree with them, you may not continue to use the Site.</p>
      </LegalSection>

      <LegalSection number="२" title="व्यवसायाचे स्वरूप (Nature of Business)">
        <p className="mb-2"><strong>वकिली आणि कायदे</strong> केवळ डिजिटल उत्पादने (ई-बुक्स/PDF) पुरवते; येथे कोणतीही भौतिक वस्तू विकली जात नाही. प्रत्येक खरेदी ईमेल आणि/किंवा WhatsApp मार्फत लगेचच डिजिटल स्वरूपात पोहोचवली जाते.</p>
        <p className="text-slate-400">The products offered by Vakili Aani Kayde are entirely digital (ebooks/PDFs); we neither sell nor ship physical items. Every order reaches you at once in digital form through email and/or WhatsApp.</p>
      </LegalSection>

      <LegalSection number="३" title="बौद्धिक संपदा अधिकार (Intellectual Property)">
        <p className="mb-2">साइटवरील मजकूर, ई-बुक्स आणि डिझाइन यांवर <strong>वकिली आणि कायदे</strong> चा हक्क आहे. आमच्या आधीच्या लेखी संमतीशिवाय यापैकी काहीही कॉपी करणे, विकणे किंवा वाटणे यास पूर्ण बंदी आहे.</p>
        <p className="text-slate-400">Every piece of content, ebook, and design on the Site belongs exclusively to Vakili Aani Kayde. Without our prior written consent, none of it may be reproduced, copied, resold, shared, or otherwise used.</p>
      </LegalSection>

      <LegalSection number="४" title="वापरकर्ता प्रतिज्ञा (User Representations)">
        <p className="mb-2">साइट वापरून तुम्ही पुष्टी करता की: (१) तुम्ही पुरवलेली प्रत्येक माहिती खरी व बरोबर आहे, (२) तुम्ही या अटींचे पालन कराल, आणि (३) बेकायदेशीर किंवा अनधिकृत कोणत्याही कारणासाठी तुम्ही साइट वापरणार नाही.</p>
        <p className="text-slate-400">Using the Site means you confirm that every detail you provide is accurate and true, that you will abide by these Terms, and that you will not employ the Site for any unlawful or unauthorized end.</p>
      </LegalSection>

      <LegalSection number="५" title="खरेदी आणि पेमेंट (Purchases and Payment)">
        <p className="mb-2">UPI (Google Pay, PhonePe), क्रेडिट/डेबिट कार्ड आणि नेट बँकिंग या पर्यायांद्वारे पेमेंट करता येते आणि त्यासाठी आम्ही <strong>Razorpay</strong> हे सुरक्षित पेमेंट गेटवे वापरतो. पेमेंट पूर्ण होताच डाउनलोड लिंक लगेच तुमच्यापर्यंत पोहोचते.</p>
        <p className="text-slate-400">Payments through UPI, Credit/Debit Cards, and Net Banking are handled securely by Razorpay. The moment your payment goes through, you are given digital access right away.</p>
      </LegalSection>

      <LegalSection number="६" title="डिजिटल उत्पादनांचा वापर (Digital Products Usage)">
        <p className="mb-2">ई-बुक विकत घेतल्यावर ते केवळ स्वतःपुरते वापरण्याचा, इतरांकडे हस्तांतरित न करता येणारा परवाना तुम्हाला मिळतो. हे ई-बुक दुसऱ्यांना देणे, विकणे किंवा पुन्हा वाटणे हा कॉपीराइट कायद्याचा भंग ठरतो.</p>
        <p className="text-slate-400">A purchase grants you a personal licence for your own use that cannot be passed on to anyone else. Sharing, reselling, or redistributing the ebook breaches copyright law.</p>
      </LegalSection>

      <LegalSection number="७" title="परतावा आणि रद्दीकरण (Refund and Cancellation)">
        <p className="mb-2">डिजिटल उत्पादन (PDF) एकदा पोहोचवल्यानंतर त्याचा परतावा मिळत नाही. मात्र तांत्रिक चुकीमुळे दोनदा पैसे कापले गेल्यास, किंवा पैसे कापूनही पुस्तक न मिळाल्यास, आम्ही 48-72 तासांच्या आत ते दुरुस्त करतो.</p>
        <p className="text-slate-400">Once a digital product (PDF) has been delivered, it cannot be refunded. However, if a technical fault causes a duplicate charge, or money is deducted without the book reaching you, we set things right within 48–72 hours. For details, read our complete <a href="/refund-policy" className="text-brand-gold hover:underline">Refund Policy</a>.</p>
      </LegalSection>

      <LegalSection number="८" title="दायित्व मर्यादा (Limitation of Liability)">
        <p className="mb-2">कोणत्याही अप्रत्यक्ष अथवा परिणामी नुकसानीची जबाबदारी वकिली आणि कायदे घेत नाही. आमची एकूण जबाबदारी संबंधित खरेदीसाठी तुम्ही भरलेल्या रकमेपुरतीच मर्यादित राहील.</p>
        <p className="text-slate-400">Vakili Aani Kayde accepts no responsibility for indirect or consequential losses. In any case, our combined liability will stay limited to the sum you paid for that particular purchase.</p>
      </LegalSection>

      <LegalSection number="९" title="कायदेशीर सल्ल्याचे अस्वीकरण (Disclaimer of Legal Advice)">
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <p className="mb-2 font-bold uppercase">महत्वाची कायदेशीर सूचना:</p>
          <p className="mb-2">येथील मजकूर फक्त शैक्षणिक हेतूने दिलेला आहे आणि तो कोणत्याही प्रकारचा कायदेशीर सल्ला नाही.</p>
          <p className="text-xs text-amber-800/80">Everything shared on this Site serves a general educational purpose alone. It is not legal advice, nor does it create any attorney-client relationship; for your own circumstances, always seek out a qualified lawyer.</p>
        </div>
      </LegalSection>

      <LegalSection number="१०" title="लागू कायदा (Governing Law)">
        <p className="mb-2">या नियम व अटींना भारतीय कायदे लागू होतात — माहिती तंत्रज्ञान कायदा 2000, ग्राहक संरक्षण (ई-कॉमर्स) नियम 2020 आणि डिजिटल वैयक्तिक डेटा संरक्षण कायदा 2023. उद्भवणाऱ्या कोणत्याही वादांचे अधिकारक्षेत्र फक्त पुणे, महाराष्ट्र येथील न्यायालयांकडे असेल.</p>
        <p className="text-slate-400">Indian law applies to these Terms, including the IT Act 2000, the Consumer Protection (E-Commerce) Rules 2020, and the DPDPA 2023. Any dispute falls under the sole jurisdiction of the courts at Pune, Maharashtra.</p>
      </LegalSection>

      <LegalSection number="११" title="तक्रार निवारण अधिकारी (Grievance Officer)">
        <div className="rounded-lg border border-gray-100 bg-gray-50 p-4 text-sm space-y-1">
          <p><strong>Platform:</strong> वकिली आणि कायदे (vakilianikayde.in)</p>
          <p><strong>Email:</strong> <a href="mailto:vakilianikayde@gmail.com" className="text-brand-gold hover:underline">vakilianikayde@gmail.com</a></p>
          <p><strong>Phone:</strong> {process.env.NEXT_PUBLIC_WA_NUMBER ? `+${process.env.NEXT_PUBLIC_WA_NUMBER.replace(/^91/, "")}` : "Support unavailable"}</p>
          <p><strong>Response:</strong> 48 तासांच्या आत (Within 48 hours)</p>
          <p><strong>Resolution:</strong> 30 दिवसांच्या आत (Within 30 days)</p>
        </div>
      </LegalSection>

      <LegalSection number="१२" title="संपर्क (Contact Us)">
        <address className="rounded-lg border border-gray-100 bg-gray-50 p-4 not-italic text-sm space-y-1">
          <p><strong>वकिली आणि कायदे (Vakili Aani Kayde)</strong></p>
          <p>Email: <a href="mailto:vakilianikayde@gmail.com" className="text-brand-gold hover:underline">vakilianikayde@gmail.com</a></p>
          <p>Phone: {process.env.NEXT_PUBLIC_WA_NUMBER ? (<a href={`tel:+${process.env.NEXT_PUBLIC_WA_NUMBER}`} className="text-brand-gold hover:underline">+{process.env.NEXT_PUBLIC_WA_NUMBER.replace(/^91/, "")}</a>) : "Support unavailable"}</p>
          <p>Pune, Maharashtra, India</p>
        </address>
      </LegalSection>
    </LegalPageWrapper>
  );
}
