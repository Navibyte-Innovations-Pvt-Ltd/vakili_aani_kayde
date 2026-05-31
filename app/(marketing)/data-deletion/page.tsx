import type { Metadata } from "next";
import { Trash2, ShieldAlert } from "lucide-react";
import { LegalPageWrapper, LegalSection } from "@/components/legal-page-wrapper";

export const metadata: Metadata = {
  title: "Data Deletion | Vakili Aani Kayde",
  description: "Learn how to request the deletion of your data from Vakili Aani Kayde.",
};

export default function DataDeletionPage() {
  return (
    <LegalPageWrapper
      title="Data Deletion Instructions"
      titleEn=""
      icon={Trash2}
      badge="Privacy Controls"
      badgeEn="Your privacy matters to us, and requesting deletion of your data is simple and transparent."
      bannerText="Your privacy matters to us. We have prepared a simple process for you to have your data removed."
    >
      <LegalSection number="1" title="Data We Store">
        <ul className="list-disc space-y-2 pl-6">
          <li><strong>Contact Info:</strong> Your name, email and phone number.</li>
          <li><strong>Order History:</strong> The books you have purchased and the details of those transactions.</li>
        </ul>
        <p className="mt-3">The data we keep includes your name, email and phone number, along with your purchase history and transaction details.</p>
      </LegalSection>

      <LegalSection number="2" title="How to Request Deletion">
        <p className="mb-4">To have your data permanently removed, complete the following steps:</p>
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-gold/15 text-xs font-bold text-brand-gold">1</div>
            <p>Send a message to <strong>vakilianikayde@gmail.com</strong> from the same email address you used to register.</p>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-gold/15 text-xs font-bold text-brand-gold">2</div>
            <p>Write the subject of that email as follows: <strong>&quot;Data Deletion Request - [Your Name]&quot;</strong>.</p>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-gold/15 text-xs font-bold text-brand-gold">3</div>
            <p>Do not forget to include the phone number you provided at the time of registration in your message.</p>
          </div>
        </div>
        <p className="mt-4 border-l-4 border-brand-gold/30 pl-4 text-sm text-slate-500 italic">
          Once we receive your request, our team completes the process within 7-10 business days.
        </p>
      </LegalSection>

      <LegalSection number="3" title="Impact of Deletion">
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-900">
          <p className="mb-2 flex items-center gap-2 text-xs font-bold tracking-wide uppercase">
            <ShieldAlert className="h-4 w-4" />
            Warning:
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>You will no longer be able to open the ebooks you have purchased. (Loss of access to purchased ebooks)</li>
            <li>Once deleted, your order history cannot be recovered. (Order history cannot be recovered)</li>
          </ul>
        </div>
      </LegalSection>

      <LegalSection number="4" title="Legal Compliance">
        <p>Please note that under Indian tax laws we are obliged to keep certain transaction records (such as invoices) for up to 7 years. Such records are never used for any marketing purpose.</p>
      </LegalSection>
    </LegalPageWrapper>
  );
}
