import type { Metadata } from "next";
import { Lock } from "lucide-react";
import { LegalPageWrapper, LegalSection, LegalInfoCard } from "@/components/legal-page-wrapper";

export const metadata: Metadata = {
  title: "Privacy Policy | Vakili Aani Kayde",
  description: "Vakili Aani Kayde's Privacy Policy — what personal data we gather, the ways we use it, and how we keep it safe.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageWrapper
      title="Privacy Policy"
      titleEn=""
      icon={Lock}
      badge="Data Protection"
      badgeEn="Compliant with IT Act 2000, IT (Amendment) Act 2008, and Digital Personal Data Protection Act 2023."
      bannerText="We value your privacy and are committed to keeping your data secure."
    >
      <LegalInfoCard>
        <p className="mb-1 font-black text-sm">Platform Information</p>
        <p><strong>Brand:</strong> Vakili Aani Kayde</p>
        <p><strong>Website:</strong> https://vakilianikayde.in</p>
        <p><strong>Last Updated:</strong> May 2026</p>
      </LegalInfoCard>

      <LegalSection number="1" title="Information We Collect">
        <p className="mb-3">The information we gather includes your Name, Email and Phone Number provided at purchase, transaction metadata received from Razorpay (never the raw card details), technical data captured through Vercel Analytics, and session cookies used to keep the site secure.</p>
        <ul className="list-disc space-y-2 pl-6">
          <li><strong>Personal Information:</strong> Your name, email address and phone/WhatsApp number provided during purchase.</li>
          <li><strong>Payment Information:</strong> We never store card details ourselves; they are handled by Razorpay (a PCI-DSS compliant gateway), and we only receive the Transaction ID and payment status.</li>
          <li><strong>Technical Information:</strong> IP address, browser type and device information obtained through Vercel Analytics, along with the pages you visit.</li>
          <li><strong>Cookies:</strong> Only the cookies strictly necessary to maintain your session and keep the site secure.</li>
        </ul>
      </LegalSection>

      <LegalSection number="2" title="Use of Information">
        <p className="mb-3">Your data helps us fulfil and deliver orders, issue invoices, share product updates (which you may unsubscribe from at any time), guard against fraud, and meet our legal obligations.</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>To fulfil your order and deliver the ebook to you via email and WhatsApp.</li>
          <li>To send you the purchase invoice.</li>
          <li>To inform you about new books and offers (you always have the option to unsubscribe at any time).</li>
          <li>To keep your account secure and prevent fraud.</li>
          <li>To comply with applicable legal obligations.</li>
        </ul>
      </LegalSection>

      <LegalSection number="3" title="Third-Party Service Providers">
        <p className="mb-3">Your personal data is never sold, rented, or traded by us. We share only the data strictly required with the following trusted service providers to complete your order.</p>
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
      </LegalSection>

      <LegalSection number="4" title="Data Retention">
        <p className="mb-3">For tax and audit compliance, order data is kept for 7 years, while account data stays with us for as long as the account is active plus 1 year after it is closed; session cookies are cleared the moment the browser is closed.</p>
        <ul className="list-disc space-y-2 pl-6">
          <li><strong>Order Data:</strong> 7 years, to meet tax and audit compliance requirements</li>
          <li><strong>Account Information:</strong> As long as the account is active, plus 1 year after it is closed</li>
          <li><strong>Session data / Cookies:</strong> Until the session ends when the browser is closed</li>
        </ul>
      </LegalSection>

      <LegalSection number="5" title="Data Security">
        <p className="mb-3">We rely on SSL/TLS encryption, the PCI-DSS compliant Razorpay gateway for payments, secure AWS S3 storage for files, and database-level encryption. Since no transmission over the internet can be guaranteed 100% safe, we reduce the risk by applying industry-standard safeguards.</p>
      </LegalSection>

      <LegalSection number="6" title="Your Rights — DPDPA 2023">
        <p className="mb-3">DPDPA 2023 entitles you to view the data we hold about you, to have any inaccuracies corrected, to ask for your data to be erased (within the limits of legally required retention), and to nominate someone to handle your data. Write to <a href="mailto:vakilianikayde@gmail.com" className="text-brand-gold hover:underline">vakilianikayde@gmail.com</a> to exercise any of these rights.</p>
        <ul className="list-disc space-y-2 pl-6">
          <li><strong>Right to Access:</strong> The right to know what data we hold about you.</li>
          <li><strong>Right to Correction:</strong> The right to have inaccurately recorded information corrected.</li>
          <li><strong>Right to Erasure:</strong> The right to request deletion of your data, subject to certain conditions.</li>
          <li><strong>Right to Nominate:</strong> The right to nominate a person to handle your data after your death.</li>
        </ul>
      </LegalSection>

      <LegalSection number="7" title="Grievance Officer">
        <div className="rounded-lg border border-gray-100 bg-gray-50 p-4 text-sm space-y-1">
          <p><strong>Platform:</strong> Vakili Aani Kayde (vakilianikayde.in)</p>
          <p><strong>Email:</strong> <a href="mailto:vakilianikayde@gmail.com" className="text-brand-gold hover:underline">vakilianikayde@gmail.com</a></p>
          <p><strong>Phone:</strong> +91 8149319058</p>
          <p><strong>Address:</strong> Pune, Maharashtra, India</p>
          <p><strong>Response Time:</strong> We respond within 48 hours</p>
          <p><strong>Resolution Time:</strong> Issues are resolved within 30 days</p>
        </div>
      </LegalSection>

      <LegalSection number="8" title="Contact Us">
        <address className="rounded-lg border border-gray-100 bg-gray-50 p-4 not-italic text-sm space-y-1">
          <p><strong>Vakili Aani Kayde</strong></p>
          <p>Email: <a href="mailto:vakilianikayde@gmail.com" className="text-brand-gold hover:underline">vakilianikayde@gmail.com</a></p>
          <p>Pune, Maharashtra, India</p>
        </address>
      </LegalSection>
    </LegalPageWrapper>
  );
}
