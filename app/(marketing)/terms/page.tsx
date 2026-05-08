import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { LegalPageWrapper, LegalSection, LegalInfoCard } from "@/components/legal-page-wrapper";

export const metadata: Metadata = {
  title: "नियम आणि अटी | वकिली आणि कायदे",
  description: "Terms and Conditions for using Vakili Aani Kayde and purchasing our digital ebooks. (नियम आणि अटी)",
};

export default function TermsPage() {
  return (
    <LegalPageWrapper
      title="नियम आणि अटी"
      titleEn="Terms and Conditions"
      icon={ShieldCheck}
      badge="अधिकृत प्लॅटफॉर्म माहिती"
      badgeEn="This platform is owned and operated under the brand Vakili Aani Kayde (vakilianikayde.in)."
      bannerText="हे डिजिटल प्लॅटफॉर्म &quot;वकिली आणि कायदे&quot; (vakilianikayde.in) या ब्रँड नावाखाली चालवले जाते."
    >
      <LegalInfoCard>
        <p className="mb-1 font-black text-sm">Business Details / व्यवसाय तपशील</p>
        <p><strong>Brand:</strong> वकिली आणि कायदे (Vakili Aani Kayde)</p>
        <p><strong>Website:</strong> https://vakilianikayde.in</p>
        <p><strong>Business Type:</strong> Digital Goods — Educational Ebooks (PDF only)</p>
        <p><strong>Address:</strong> Pune, Maharashtra, India</p>
        <p><strong>Email:</strong> vakilianikayde@gmail.com</p>
        <p><strong>Phone:</strong> +91 8149319058</p>
      </LegalInfoCard>

      <LegalSection number="१" title="अटींचा स्वीकार (Agreement to Terms)">
        <p className="mb-2">या साइटला भेट देऊन किंवा आमची उत्पादने खरेदी करून, तुम्ही या नियम आणि अटींना बांधील राहण्यास सहमती दर्शवता.</p>
        <p className="text-slate-400">By accessing the Site, you agree to be bound by these Terms. If you do not agree, you are prohibited from using the Site.</p>
      </LegalSection>

      <LegalSection number="२" title="व्यवसायाचे स्वरूप (Nature of Business)">
        <p className="mb-2"><strong>वकिली आणि कायदे</strong> हे पूर्णपणे डिजिटल उत्पादनांचे (ई-बुक्स/PDF) विक्रेते आहे. आम्ही कोणतेही भौतिक उत्पादन विकत नाही. सर्व खरेदी डिजिटल स्वरूपात तत्काळ दिली जाते — ईमेल आणि/किंवा WhatsApp द्वारे.</p>
        <p className="text-slate-400">Vakili Aani Kayde exclusively sells digital products (ebooks/PDFs). No physical goods are sold or shipped. All purchases are delivered digitally and instantly via email and/or WhatsApp.</p>
      </LegalSection>

      <LegalSection number="३" title="बौद्धिक संपदा अधिकार (Intellectual Property)">
        <p className="mb-2">साइटवरील सर्व मजकूर, ई-बुक्स, आणि डिझाइन <strong>वकिली आणि कायदे</strong> ची मालमत्ता आहे. आमच्या लेखी परवानगीशिवाय कोणत्याही सामग्रीची कॉपी, विक्री किंवा वितरण करण्यास सक्त मनाई आहे.</p>
        <p className="text-slate-400">All Site content and ebooks are proprietary property of Vakili Aani Kayde. No part may be copied, reproduced, sold, shared, or exploited without our prior written permission.</p>
      </LegalSection>

      <LegalSection number="४" title="वापरकर्ता प्रतिज्ञा (User Representations)">
        <p className="mb-2">साइट वापरताना तुम्ही हे मान्य करता की: (१) तुम्ही दिलेली माहिती सत्य आणि अचूक आहे, (२) तुम्ही कायद्याचे पालन कराल, आणि (३) तुम्ही कोणत्याही अनधिकृत कामासाठी साइटचा वापर करणार नाही.</p>
        <p className="text-slate-400">By using the Site, you represent that all information you submit is truthful, you will comply with these Terms, and you will not use the Site for any illegal or unauthorized purpose.</p>
      </LegalSection>

      <LegalSection number="५" title="खरेदी आणि पेमेंट (Purchases and Payment)">
        <p className="mb-2">आम्ही UPI (Google Pay, PhonePe), क्रेडिट/डेबिट कार्ड्स, नेट बँकिंग स्वीकारतो. आम्ही <strong>Razorpay</strong> सुरक्षित पेमेंट गेटवे वापरतो. पेमेंट यशस्वी झाल्यावर तुम्हाला तत्काळ डाउनलोड लिंक मिळेल.</p>
        <p className="text-slate-400">We accept UPI, Credit/Debit Cards, and Net Banking via Razorpay. Upon successful payment, digital access is granted immediately.</p>
      </LegalSection>

      <LegalSection number="६" title="डिजिटल उत्पादनांचा वापर (Digital Products Usage)">
        <p className="mb-2">खरेदी केल्यानंतर तुम्हाला ई-बुक वापरण्याचा वैयक्तिक, हस्तांतरण-अयोग्य परवाना मिळतो. हे ई-बुक इतरांना शेअर करणे, विकणे किंवा पुनर्वितरण करणे कायदेशीर गुन्हा आहे.</p>
        <p className="text-slate-400">Upon purchase, you receive a personal, non-transferable license for personal use only. Distributing, sharing, or reselling ebook content is a violation of copyright law.</p>
      </LegalSection>

      <LegalSection number="७" title="परतावा आणि रद्दीकरण (Refund and Cancellation)">
        <p className="mb-2">डिजिटल उत्पादन (PDF) एकदा वितरित केल्यावर परतावा शक्य नाही. तांत्रिक त्रुटीमुळे दुहेरी पेमेंट झाल्यास किंवा पेमेंट कापले पण पुस्तक न मिळाल्यास, आम्ही 48-72 तासांत परिस्थिती सुधारू.</p>
        <p className="text-slate-400">Digital products are non-refundable once delivered. Double payments or payment-without-delivery issues are resolved within 48–72 hours. See our full <a href="/refund-policy" className="text-brand-gold hover:underline">Refund Policy</a>.</p>
      </LegalSection>

      <LegalSection number="८" title="दायित्व मर्यादा (Limitation of Liability)">
        <p className="mb-2">वकिली आणि कायदे कोणत्याही अप्रत्यक्ष किंवा परिणामी नुकसानीसाठी जबाबदार नाही. आमची एकूण जबाबदारी तुम्ही दिलेल्या खरेदी रकमेपेक्षा जास्त असणार नाही.</p>
        <p className="text-slate-400">Vakili Aani Kayde shall not be liable for any indirect or consequential damages. Total liability shall not exceed the amount paid for the specific purchase.</p>
      </LegalSection>

      <LegalSection number="९" title="कायदेशीर सल्ल्याचे अस्वीकरण (Disclaimer of Legal Advice)">
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <p className="mb-2 font-bold uppercase">महत्वाची कायदेशीर सूचना:</p>
          <p className="mb-2">या साइटवरील माहिती केवळ शैक्षणिक उद्देशाने आहे. हा कोणताही कायदेशीर सल्ला नाही.</p>
          <p className="text-xs text-amber-800/80">The information on this Site is for general educational purposes only. It does not constitute legal advice, and no attorney-client relationship is formed. Always consult a qualified lawyer for your specific situation.</p>
        </div>
      </LegalSection>

      <LegalSection number="१०" title="लागू कायदा (Governing Law)">
        <p className="mb-2">हे नियम आणि अटी भारतीय कायद्यानुसार आहेत — माहिती तंत्रज्ञान कायदा 2000, ग्राहक संरक्षण (ई-कॉमर्स) नियम 2020, आणि डिजिटल वैयक्तिक डेटा संरक्षण कायदा 2023. कोणतेही वाद पुणे, महाराष्ट्र न्यायालयाच्या अधिकारक्षेत्रात येतील.</p>
        <p className="text-slate-400">Governed by the laws of India including IT Act 2000, Consumer Protection (E-Commerce) Rules 2020, and DPDPA 2023. Disputes subject to exclusive jurisdiction of courts in Pune, Maharashtra.</p>
      </LegalSection>

      <LegalSection number="११" title="तक्रार निवारण अधिकारी (Grievance Officer)">
        <div className="rounded-lg border border-gray-100 bg-gray-50 p-4 text-sm space-y-1">
          <p><strong>Platform:</strong> वकिली आणि कायदे (vakilianikayde.in)</p>
          <p><strong>Email:</strong> <a href="mailto:vakilianikayde@gmail.com" className="text-brand-gold hover:underline">vakilianikayde@gmail.com</a></p>
          <p><strong>Phone:</strong> +91 8149319058</p>
          <p><strong>Response:</strong> 48 तासांत (Within 48 hours)</p>
          <p><strong>Resolution:</strong> 30 दिवसांत (Within 30 days)</p>
        </div>
      </LegalSection>

      <LegalSection number="१२" title="संपर्क (Contact Us)">
        <address className="rounded-lg border border-gray-100 bg-gray-50 p-4 not-italic text-sm space-y-1">
          <p><strong>वकिली आणि कायदे (Vakili Aani Kayde)</strong></p>
          <p>Email: <a href="mailto:vakilianikayde@gmail.com" className="text-brand-gold hover:underline">vakilianikayde@gmail.com</a></p>
          <p>Phone: <a href="tel:+918149319058" className="text-brand-gold hover:underline">+91 8149319058</a></p>
          <p>Pune, Maharashtra, India</p>
        </address>
      </LegalSection>
    </LegalPageWrapper>
  );
}
