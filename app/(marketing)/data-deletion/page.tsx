import type { Metadata } from "next";
import { Trash2, ShieldAlert } from "lucide-react";
import { LegalPageWrapper, LegalSection } from "@/components/legal-page-wrapper";

export const metadata: Metadata = {
  title: "डेटा हटवण्याच्या सूचना | वकिली आणि कायदे",
  description: "Learn how to request deletion of your data from Vakili Aani Kayde. (डेटा हटवण्याच्या सूचना)",
};

export default function DataDeletionPage() {
  return (
    <LegalPageWrapper
      title="डेटा हटवण्याच्या सूचना"
      titleEn="Data Deletion Instructions"
      icon={Trash2}
      badge="गोपनीयता नियंत्रण"
      badgeEn="We value your privacy and provide a clear path to request data deletion."
      bannerText="आम्ही तुमच्या गोपनीयतेचा आदर करतो. तुमची माहिती हटवण्याचा सोपा मार्ग आम्ही उपलब्ध करून दिला आहे."
    >
      <LegalSection number="१" title="कोणता डेटा आम्ही साठवतो? (Data We Store)">
        <ul className="list-disc space-y-2 pl-6">
          <li><strong>संपर्क माहिती (Contact Info):</strong> नाव, ईमेल, फोन नंबर.</li>
          <li><strong>ऑर्डर इतिहास (Order History):</strong> खरेदी केलेली पुस्तके आणि व्यवहाराचे तपशील.</li>
        </ul>
        <p className="mt-3 text-slate-400">We store: Name, email, phone number; Purchase history and transaction details.</p>
      </LegalSection>

      <LegalSection number="२" title="डेटा हटवण्यासाठी विनंती कशी करावी? (How to Request Deletion)">
        <p className="mb-4">तुमची माहिती कायमस्वरूपी हटवण्यासाठी, खालील पायऱ्या फॉलो करा:</p>
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-gold/15 text-xs font-bold text-brand-gold">1</div>
            <p>तुमच्या नोंदणीकृत ईमेलवरून <strong>vakilianikayde@gmail.com</strong> ला ईमेल करा.</p>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-gold/15 text-xs font-bold text-brand-gold">2</div>
            <p>ईमेल चा विषय (Subject) असा ठेवा: <strong>&quot;Data Deletion Request - [Your Name]&quot;</strong>.</p>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-gold/15 text-xs font-bold text-brand-gold">3</div>
            <p>ईमेलमध्ये तुमचा नोंदणीकृत फोन नंबर नमूद करा.</p>
          </div>
        </div>
        <p className="mt-4 border-l-4 border-brand-gold/30 pl-4 text-sm text-slate-500 italic">
          आमची टीम ७-१० दिवसांत तुमच्या विनंतीवर प्रक्रिया करेल. (Process takes 7-10 business days.)
        </p>
      </LegalSection>

      <LegalSection number="३" title="डेटा हटवल्याचे परिणाम (Impact of Deletion)">
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-900">
          <p className="mb-2 flex items-center gap-2 text-xs font-bold tracking-wide uppercase">
            <ShieldAlert className="h-4 w-4" />
            चेतावणी (Warning):
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>तुम्ही खरेदी केलेल्या ई-बुक्सचा ॲक्सेस गमावाल. (Loss of access to purchased ebooks)</li>
            <li>तुमचा ऑर्डर इतिहास पुन्हा मिळवता येणार नाही. (Order history cannot be recovered)</li>
          </ul>
        </div>
      </LegalSection>

      <LegalSection number="४" title="कायदेशीर पालन (Legal Compliance)">
        <p className="mb-2">कृपया लक्षात घ्या की टॅक्स आणि कायद्याच्या नियमांनुसार (उदा. Indian Tax Laws), काही व्यवहार रेकॉर्ड्स (Invoices) आम्हाला ७ वर्षांपर्यंत जतन करून ठेवावे लागतात. हे रेकॉर्ड्स मार्केटिंगसाठी वापरले जात नाहीत.</p>
        <p className="text-slate-400">We are legally required to retain certain transaction records for 7 years as per Indian tax laws. These are not used for marketing purposes.</p>
      </LegalSection>
    </LegalPageWrapper>
  );
}
