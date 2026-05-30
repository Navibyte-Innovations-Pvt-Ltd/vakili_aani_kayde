import type { Metadata } from "next";
import { Trash2, ShieldAlert } from "lucide-react";
import { LegalPageWrapper, LegalSection } from "@/components/legal-page-wrapper";

export const metadata: Metadata = {
  title: "डेटा हटवण्याच्या सूचना | वकिली आणि कायदे",
  description: "Vakili Aani Kayde वरून तुमचा डेटा काढून टाकण्याची विनंती कशी नोंदवायची ते जाणून घ्या. (डेटा हटवण्याच्या सूचना)",
};

export default function DataDeletionPage() {
  return (
    <LegalPageWrapper
      title="डेटा हटवण्याच्या सूचना"
      titleEn="Data Deletion Instructions"
      icon={Trash2}
      badge="गोपनीयता नियंत्रण"
      badgeEn="Your privacy matters to us, and requesting deletion of your data is simple and transparent."
      bannerText="तुमच्या गोपनीयतेला आम्ही मोल देतो. तुमचा डेटा काढून टाकण्याची सुलभ प्रक्रिया आम्ही तुमच्यासाठी तयार ठेवली आहे."
    >
      <LegalSection number="१" title="कोणता डेटा आम्ही साठवतो? (Data We Store)">
        <ul className="list-disc space-y-2 pl-6">
          <li><strong>संपर्क माहिती (Contact Info):</strong> तुमचे नाव, ईमेल आणि फोन क्रमांक.</li>
          <li><strong>ऑर्डर इतिहास (Order History):</strong> तुम्ही घेतलेली पुस्तके व त्या व्यवहारांचे तपशील.</li>
        </ul>
        <p className="mt-3 text-slate-400">The data we keep includes your name, email and phone number, along with your purchase history and transaction details.</p>
      </LegalSection>

      <LegalSection number="२" title="डेटा हटवण्यासाठी विनंती कशी करावी? (How to Request Deletion)">
        <p className="mb-4">तुमचा डेटा कायमचा काढून टाकवून घेण्यासाठी पुढील पायऱ्या पूर्ण करा:</p>
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-gold/15 text-xs font-bold text-brand-gold">1</div>
            <p>ज्या ईमेलने तुम्ही नोंदणी केली, त्याच ईमेलवरून <strong>vakilianikayde@gmail.com</strong> या पत्त्यावर संदेश पाठवा.</p>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-gold/15 text-xs font-bold text-brand-gold">2</div>
            <p>त्या ईमेलचा विषय (Subject) पुढीलप्रमाणे लिहा: <strong>&quot;Data Deletion Request - [Your Name]&quot;</strong>.</p>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-gold/15 text-xs font-bold text-brand-gold">3</div>
            <p>संदेशात नोंदणीच्या वेळी दिलेला फोन क्रमांकही लिहायला विसरू नका.</p>
          </div>
        </div>
        <p className="mt-4 border-l-4 border-brand-gold/30 pl-4 text-sm text-slate-500 italic">
          तुमची विनंती मिळाल्यावर आमची टीम ७-१० कामकाजाच्या दिवसांत त्यावर कार्यवाही पूर्ण करते. (Process takes 7-10 business days.)
        </p>
      </LegalSection>

      <LegalSection number="३" title="डेटा हटवल्याचे परिणाम (Impact of Deletion)">
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-900">
          <p className="mb-2 flex items-center gap-2 text-xs font-bold tracking-wide uppercase">
            <ShieldAlert className="h-4 w-4" />
            चेतावणी (Warning):
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>तुम्ही विकत घेतलेली ई-बुक्स यापुढे उघडता येणार नाहीत. (Loss of access to purchased ebooks)</li>
            <li>एकदा हटवलेला ऑर्डर इतिहास परत मिळवणे शक्य होणार नाही. (Order history cannot be recovered)</li>
          </ul>
        </div>
      </LegalSection>

      <LegalSection number="४" title="कायदेशीर पालन (Legal Compliance)">
        <p className="mb-2">एक बाब ध्यानात घ्या — कर व कायद्याच्या तरतुदींमुळे (उदा. Indian Tax Laws) काही व्यवहारांच्या नोंदी (Invoices) आम्हाला ७ वर्षांपर्यंत राखून ठेवणे बंधनकारक असते. अशा नोंदींचा वापर कधीही मार्केटिंगसाठी केला जात नाही.</p>
        <p className="text-slate-400">Under Indian tax laws we are obliged to keep certain transaction records for 7 years, and such records are never used for any marketing purpose.</p>
      </LegalSection>
    </LegalPageWrapper>
  );
}
