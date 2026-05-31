import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { LegalPageWrapper, LegalSection, LegalInfoCard } from "@/components/legal-page-wrapper";

export const metadata: Metadata = {
  title: "Terms of Use | Vakili Aani Kayde",
  description: "Read the terms governing your use of Vakili Aani Kayde and the purchase of our digital ebooks.",
};

export default function TermsPage() {
  return (
    <LegalPageWrapper
      title="Terms & Conditions"
      titleEn=""
      icon={ShieldCheck}
      badge="Official information about the platform"
      badgeEn="The brand Vakili Aani Kayde (vakilianikayde.in) owns and runs this platform."
      bannerText="This digital platform is operated by the brand Vakili Aani Kayde (vakilianikayde.in)."
    >
      <LegalInfoCard>
        <p className="mb-1 font-black text-sm">Business Details</p>
        <p><strong>Brand:</strong> Vakili Aani Kayde</p>
        <p><strong>Website:</strong> https://vakilianikayde.in</p>
        <p><strong>Business Type:</strong> Digital Goods — Educational Ebooks (PDF format only)</p>
        <p><strong>Address:</strong> Pune, Maharashtra, India</p>
        <p><strong>Email:</strong> vakilianikayde@gmail.com</p>
  <p><strong>Phone:</strong> {process.env.NEXT_PUBLIC_WA_NUMBER ? `+${process.env.NEXT_PUBLIC_WA_NUMBER.replace(/^91/, "")}` : "Support unavailable"}</p>
      </LegalInfoCard>

      <LegalSection number="1" title="Agreement to Terms">
        <p>When you use the Site, you accept these Terms in full. Should you disagree with them, you may not continue to use the Site.</p>
      </LegalSection>

      <LegalSection number="2" title="Nature of Business">
        <p>The products offered by <strong>Vakili Aani Kayde</strong> are entirely digital (ebooks/PDFs); we neither sell nor ship physical items. Every order reaches you at once in digital form through email and/or WhatsApp.</p>
      </LegalSection>

      <LegalSection number="3" title="Intellectual Property">
        <p>Every piece of content, ebook, and design on the Site belongs exclusively to <strong>Vakili Aani Kayde</strong>. Without our prior written consent, none of it may be reproduced, copied, resold, shared, or otherwise used.</p>
      </LegalSection>

      <LegalSection number="4" title="User Representations">
        <p>Using the Site means you confirm that every detail you provide is accurate and true, that you will abide by these Terms, and that you will not employ the Site for any unlawful or unauthorized end.</p>
      </LegalSection>

      <LegalSection number="5" title="Purchases and Payment">
        <p>Payments through UPI (Google Pay, PhonePe), Credit/Debit Cards, and Net Banking are handled securely by <strong>Razorpay</strong>. The moment your payment goes through, you are given digital access right away.</p>
      </LegalSection>

      <LegalSection number="6" title="Digital Products Usage">
        <p>A purchase grants you a personal licence for your own use that cannot be passed on to anyone else. Sharing, reselling, or redistributing the ebook breaches copyright law.</p>
      </LegalSection>

      <LegalSection number="7" title="Refund and Cancellation">
        <p>Once a digital product (PDF) has been delivered, it cannot be refunded. However, if a technical fault causes a duplicate charge, or money is deducted without the book reaching you, we set things right within 48–72 hours. For details, read our complete <a href="/refund-policy" className="text-brand-gold hover:underline">Refund Policy</a>.</p>
      </LegalSection>

      <LegalSection number="8" title="Limitation of Liability">
        <p>Vakili Aani Kayde accepts no responsibility for indirect or consequential losses. In any case, our combined liability will stay limited to the sum you paid for that particular purchase.</p>
      </LegalSection>

      <LegalSection number="9" title="Disclaimer of Legal Advice">
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <p className="mb-2 font-bold uppercase">Important Legal Notice:</p>
          <p>Everything shared on this Site serves a general educational purpose alone. It is not legal advice, nor does it create any attorney-client relationship; for your own circumstances, always seek out a qualified lawyer.</p>
        </div>
      </LegalSection>

      <LegalSection number="10" title="Governing Law">
        <p>Indian law applies to these Terms, including the IT Act 2000, the Consumer Protection (E-Commerce) Rules 2020, and the DPDPA 2023. Any dispute falls under the sole jurisdiction of the courts at Pune, Maharashtra.</p>
      </LegalSection>

      <LegalSection number="11" title="Grievance Officer">
        <div className="rounded-lg border border-gray-100 bg-gray-50 p-4 text-sm space-y-1">
          <p><strong>Platform:</strong> Vakili Aani Kayde (vakilianikayde.in)</p>
          <p><strong>Email:</strong> <a href="mailto:vakilianikayde@gmail.com" className="text-brand-gold hover:underline">vakilianikayde@gmail.com</a></p>
          <p><strong>Phone:</strong> {process.env.NEXT_PUBLIC_WA_NUMBER ? `+${process.env.NEXT_PUBLIC_WA_NUMBER.replace(/^91/, "")}` : "Support unavailable"}</p>
          <p><strong>Response:</strong> Within 48 hours</p>
          <p><strong>Resolution:</strong> Within 30 days</p>
        </div>
      </LegalSection>

      <LegalSection number="12" title="Contact Us">
        <address className="rounded-lg border border-gray-100 bg-gray-50 p-4 not-italic text-sm space-y-1">
          <p><strong>Vakili Aani Kayde</strong></p>
          <p>Email: <a href="mailto:vakilianikayde@gmail.com" className="text-brand-gold hover:underline">vakilianikayde@gmail.com</a></p>
          <p>Phone: {process.env.NEXT_PUBLIC_WA_NUMBER ? (<a href={`tel:+${process.env.NEXT_PUBLIC_WA_NUMBER}`} className="text-brand-gold hover:underline">+{process.env.NEXT_PUBLIC_WA_NUMBER.replace(/^91/, "")}</a>) : "Support unavailable"}</p>
          <p>Pune, Maharashtra, India</p>
        </address>
      </LegalSection>
    </LegalPageWrapper>
  );
}
