import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { BuyButton } from "@/components/buy-button";
import { ShieldCheck, BookOpen, Download as DownloadIcon, Zap, Mail, Home, ChevronRight, FileText, Smartphone, RefreshCw, Scale } from "lucide-react";
import { EbookPreview } from "@/components/ebook-preview";
import { ShareButtons } from "@/components/share-buttons";
import { RecommendedCarousel } from "./recommended-carousel";
import { EbookGallery } from "@/components/marketing/ebook-gallery";
import { PreviewTrigger } from "@/components/marketing/preview-trigger";
import { DescriptionToggle } from "./_components/description-toggle";
import { ScrollToTop } from "./_components/scroll-to-top";
import Image from "next/image";
import { getEbookById, getComboEbooks } from "@/lib/data-access";
import { SALE_CONFIG, getInflatedOriginalPrice } from "@/lib/sale-config";
import { SaleTimer } from "@/components/marketing/sale-timer";

export const revalidate = 86400;

const LANGUAGE_LABELS: Record<string, string> = {
  MARATHI: "मराठी",
  HINDI: "हिंदी",
  ENGLISH: "English",
};

const PAGE_LABELS = {
  MARATHI: {
    backNav: "मागील पृष्ठ",
    onlyText: "फक्त",
    discount: "सवलत",
    downloadBtn: "आत्ताच डाऊनलोड करा",
    downloadBtnDesktop: "आत्ताच डाऊनलोड करा (Download Now)",
    securePayment: "सुरक्षित पेमेंट | UPI, Card, Netbanking",
    securePaymentDesktop: "सुरक्षित पेमेंट (Safe & Secure Payment)",
    digitalNotice: "हे केवळ Digital PDF E-Book आहे — कोणतीही Physical / Printed प्रत पाठवली जात नाही.",
    refundNotice: "एकदा PDF डाउनलोड केल्यानंतर परतावा (Refund) शक्य नाही.",
    faqHeader: "नेहमी विचारले जाणारे प्रश्न",
    faq1Q: "हे पुस्तक मला कसे मिळेल?",
    faq1AfterPayment: "पेमेंट यशस्वी झाल्यानंतर:",
    faq1Download: "तुम्हाला लगेच Download Button दिसेल.",
    faq1WhatsApp: "WhatsApp वर पाठवले जाईल.",
    faq1Email: "Email वर देखील PDF पाठवली जाईल.",
    faq2Q: "पेमेंट सुरक्षित आहे का?",
    faq2A: "हो, Razorpay 100% सुरक्षित आहे. GooglePay, PhonePe, Paytm किंवा कार्डद्वारे पेमेंट करा.",
    faq3Q: "मोबाईलवर वाचता येते का?",
    faq3A: "हो! PDF फाइल कोणत्याही मोबाईल, लॅपटॉप किंवा टॅब्लेटवर वाचता येते.",
    faq4Q: "हे Physical पुस्तक आहे का?",
    faq4A: "नाही. हे पूर्णपणे Digital PDF E-Book आहे. कोणतीही Printed / Hard Copy पाठवली जात नाही. खरेदी केल्यानंतर तुम्हाला PDF फाइल ईमेल आणि WhatsApp वर मिळेल.",
    faq5Q: "किती डिव्हाइसवर वाचता येईल?",
    faq5A: "PDF वर कोणतेही बंधन नाही — तुम्ही तुमच्या Mobile, Tablet, Laptop, Desktop — कोणत्याही डिव्हाइसवर वाचू शकता.",
    faq6Q: "भविष्यात Update मिळेल का?",
    faq6A: "कायद्यात महत्त्वाचे बदल झाल्यास आम्ही Updated Edition प्रकाशित करतो. Current Version ची माहिती Product Page वर दिली आहे.",
    faq7Q: "हे पुस्तक कायदेशीर सल्ला देते का?",
    faq7A: "नाही. हे पुस्तक केवळ संदर्भ आणि शैक्षणिक उद्देशाने आहे. हा कोणत्याही प्रकारचा कायदेशीर सल्ला (Legal Advice) नाही. तुमच्या विशिष्ट कायदेशीर समस्येसाठी नेहमी तज्ञ वकिलाचा सल्ला घ्या.",
    helpMobile: "मदत हवी आहे का?",
    helpMobileSub: "WhatsApp वर बोला",
    helpDesktop: "काही मदत हवी आहे का? (Need Help?)",
    helpDesktopSub: "आमच्या सपोर्ट टीमशी बोला",
    waMessage: "नमस्ते, मला या ई-बुकबद्दल माहिती हवी आहे:",
    recommendedTitle: "तुम्हाला हे देखील आवडेल",
    recommendedSub: "आमची इतर काही महत्वाची पुस्तके पहा",
    authorLabel: "लेखकाबद्दल",
    authorBio: "Adv. Omkar Shinde हे पुणे उच्च न्यायालयात प्रॅक्टिस करणारे अनुभवी वकील आहेत. त्यांनी सामान्य नागरिकांसाठी कायद्याची माहिती सोप्या मराठी भाषेत उपलब्ध करून देण्यासाठी 'वकिली आणि कायदे' ची स्थापना केली.",
    socialProof: "वाचकांनी विश्वास ठेवला",
  },
  HINDI: {
    backNav: "वापस जाएं",
    onlyText: "केवल",
    discount: "छूट",
    downloadBtn: "अभी डाउनलोड करें",
    downloadBtnDesktop: "अभी डाउनलोड करें (Download Now)",
    securePayment: "सुरक्षित भुगतान | UPI, Card, Netbanking",
    securePaymentDesktop: "सुरक्षित भुगतान (Safe & Secure Payment)",
    digitalNotice: "यह केवल Digital PDF E-Book है — कोई Physical / Printed प्रति नहीं भेजी जाती।",
    refundNotice: "PDF डाउनलोड के बाद Refund संभव नहीं है।",
    faqHeader: "अक्सर पूछे जाने वाले प्रश्न",
    faq1Q: "यह पुस्तक मुझे कैसे मिलेगी?",
    faq1AfterPayment: "भुगतान सफल होने के बाद:",
    faq1Download: "आपको तुरंत Download Button दिखेगा।",
    faq1WhatsApp: "WhatsApp पर भेजा जाएगा।",
    faq1Email: "Email पर भी PDF भेजी जाएगी।",
    faq2Q: "क्या भुगतान सुरक्षित है?",
    faq2A: "हां, Razorpay 100% सुरक्षित है। GooglePay, PhonePe, Paytm या कार्ड से भुगतान करें।",
    faq3Q: "क्या मोबाइल पर पढ़ा जा सकता है?",
    faq3A: "हां! PDF फ़ाइल किसी भी मोबाइल, लैपटॉप या टैबलेट पर पढ़ी जा सकती है।",
    faq4Q: "क्या यह Physical पुस्तक है?",
    faq4A: "नहीं। यह पूरी तरह Digital PDF E-Book है। कोई Printed / Hard Copy नहीं भेजी जाती। खरीद के बाद PDF Email और WhatsApp पर मिलेगी।",
    faq5Q: "कितने डिवाइस पर पढ़ सकते हैं?",
    faq5A: "PDF पर कोई प्रतिबंध नहीं — Mobile, Tablet, Laptop, Desktop — किसी भी डिवाइस पर पढ़ सकते हैं।",
    faq6Q: "क्या भविष्य में Update मिलेगा?",
    faq6A: "कानून में महत्वपूर्ण बदलाव होने पर हम Updated Edition प्रकाशित करते हैं। Current Version की जानकारी Product Page पर दी गई है।",
    faq7Q: "क्या यह पुस्तक Legal Advice देती है?",
    faq7A: "नहीं। यह पुस्तक केवल संदर्भ और शैक्षणिक उद्देश्य के लिए है। यह किसी भी प्रकार की Legal Advice नहीं है। अपनी विशिष्ट कानूनी समस्या के लिए हमेशा किसी योग्य वकील से सलाह लें।",
    helpMobile: "मदद चाहिए?",
    helpMobileSub: "WhatsApp पर बात करें",
    helpDesktop: "कोई सहायता चाहिए? (Need Help?)",
    helpDesktopSub: "हमारी सपोर्ट टीम से बात करें",
    waMessage: "नमस्ते, मुझे इस ई-बुक के बारे में जानकारी चाहिए:",
    recommendedTitle: "आपको यह भी पसंद आएगा",
    recommendedSub: "हमारी अन्य महत्वपूर्ण पुस्तकें देखें",
    authorLabel: "लेखक के बारे में",
    authorBio: "Adv. Omkar Shinde पुणे उच्च न्यायालय में प्रैक्टिस करने वाले अनुभवी वकील हैं। उन्होंने आम नागरिकों के लिए कानूनी जानकारी को सरल भाषा में उपलब्ध कराने के लिए 'वकिली आणि कायदे' की स्थापना की।",
    socialProof: "पाठकों का विश्वास",
  },
  ENGLISH: {
    backNav: "Go Back",
    onlyText: "only",
    discount: "off",
    downloadBtn: "Download Now",
    downloadBtnDesktop: "Download Now",
    securePayment: "Secure Payment | UPI, Card, Netbanking",
    securePaymentDesktop: "Secure Payment (Safe & Secure)",
    digitalNotice: "This is a Digital PDF E-Book only — No Physical / Printed copy is shipped.",
    refundNotice: "No refund once PDF is downloaded.",
    faqHeader: "Frequently Asked Questions",
    faq1Q: "How will I get this book?",
    faq1AfterPayment: "After successful payment:",
    faq1Download: "You will see a Download Button immediately.",
    faq1WhatsApp: "It will be sent to you on WhatsApp.",
    faq1Email: "PDF will also be sent to your Email.",
    faq2Q: "Is payment secure?",
    faq2A: "Yes, Razorpay is 100% secure. Pay via GooglePay, PhonePe, Paytm or card.",
    faq3Q: "Can I read it on mobile?",
    faq3A: "Yes! The PDF can be read on any mobile, laptop or tablet.",
    faq4Q: "Is this a physical book?",
    faq4A: "No. This is a Digital PDF E-Book only. No printed or hard copy is shipped. After purchase, you receive the PDF via Email and WhatsApp instantly.",
    faq5Q: "How many devices can I read it on?",
    faq5A: "There are no device restrictions on PDFs — read on your Mobile, Tablet, Laptop, or Desktop.",
    faq6Q: "Will I get future updates?",
    faq6A: "We publish an updated edition when significant legal changes occur. The current version details are mentioned on the product page.",
    faq7Q: "Does this book provide legal advice?",
    faq7A: "No. This book is for reference and educational purposes only. It does not constitute legal advice of any kind. For your specific legal issue, always consult a qualified advocate.",
    helpMobile: "Need Help?",
    helpMobileSub: "Chat on WhatsApp",
    helpDesktop: "Need Help?",
    helpDesktopSub: "Talk to our support team",
    waMessage: "Hello, I need information about this e-book:",
    recommendedTitle: "You May Also Like",
    recommendedSub: "Explore more important books",
    authorLabel: "About the Author",
    authorBio: "Adv. Omkar Shinde is a practising advocate at the Pune High Court. He founded 'Vakili Aani Kayde' to make legal knowledge accessible to every citizen in simple, everyday language.",
    socialProof: "Trusted by readers",
  },
} as const;

export async function generateMetadata(
  props: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  try {
    const params = await props.params;
    const ebook = await getEbookById(params.id);
    if (!ebook) {
      return { title: "Ebook Not Found | वकिली आणि कायदे" };
    }
    const plainDescription = ebook.description?.replace(/<[^>]+>/g, " ").trim() || `Buy ${ebook.title} - Legal Ebook in Marathi`;
    const truncatedDescription = plainDescription.length > 155 ? plainDescription.slice(0, 152) + "..." : plainDescription;
    const rawTitle = ebook.title.replace(/<[^>]+>/g, "").trim();
    const ogTitle = rawTitle.length > 55 ? rawTitle.slice(0, 52) + "..." : rawTitle;
    return {
      title: { absolute: `${ogTitle} | वकिली आणि कायदे` },
      description: truncatedDescription,
      openGraph: {
        title: ogTitle,
        description: truncatedDescription,
        url: `https://www.vakilianikayde.in/ebooks/${params.id}`,
        type: "book",
        siteName: "वकिली आणि कायदे",
        images: [{ url: `/ebooks/${params.id}/opengraph-image`, width: 1200, height: 630, alt: ogTitle }],
      },
      twitter: { card: "summary_large_image", title: ogTitle, description: truncatedDescription, images: [`/ebooks/${params.id}/opengraph-image`] },
      authors: [{ name: "Adv. Omkar Shinde" }],
    };
  } catch {
    return { title: "वकिली आणि कायदे", description: "Legal Knowledge Center." };
  }
}

export async function generateStaticParams() { return []; }

const FaqItem = ({ q, children, open, accent }: { q: string; children: React.ReactNode; open?: boolean; accent?: "gold" | "red" }) => (
  <details open={open} className="group overflow-hidden rounded-xl border border-gray-100 bg-white [&_summary::-webkit-details-marker]:hidden open:border-brand-gold/30 open:shadow-sm">
    <summary className="flex min-h-11 cursor-pointer items-center justify-between gap-3 px-4 py-3 text-[13px] font-semibold text-gray-800 transition-colors hover:bg-brand-cream group-open:text-brand-teal">
      <span className="flex items-center gap-2.5">
        {accent === "gold" && <Scale className="h-3.5 w-3.5 shrink-0 text-brand-gold" />}
        {accent === "red" && <FileText className="h-3.5 w-3.5 shrink-0 text-red-400" />}
        {q}
      </span>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-180" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    </summary>
    <div className="border-t border-gray-100 px-4 pb-4 pt-3 text-[13px] leading-relaxed text-gray-600 group-open:border-brand-gold/20">
      {children}
    </div>
  </details>
);

export default async function EbookDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;
  const ebook = await getEbookById(id);

  if (!ebook || !ebook.isEnabled) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Ebook not found</h1>
          <p className="text-muted-foreground">This book may have been removed or is temporarily unavailable.</p>
          <Button asChild className="bg-brand-teal hover:bg-brand-teal/90">
            <Link href="/ebooks">Browse All Ebooks</Link>
          </Button>
        </div>
      </div>
    );
  }

  const combosOnly = await getComboEbooks();
  const recommendedBooks = combosOnly
    .filter((b) => b.id !== id)
    .slice(0, 8)
    .map((b) => ({ ...b, price: Number(b.price) }));

  const plainDescription = ebook.description?.replace(/<[^>]+>/g, " ").trim().slice(0, 160) + "..." || "";
  const labels = PAGE_LABELS[(ebook.language ?? "MARATHI") as keyof typeof PAGE_LABELS] ?? PAGE_LABELS.MARATHI;
  const finalPrice = Number(ebook.price);
  const crossedPrice = getInflatedOriginalPrice(finalPrice);
  const isSaleActive = SALE_CONFIG.isActive;
  const discountPercent = isSaleActive
    ? SALE_CONFIG.discountPercent
    : Math.round(((crossedPrice - finalPrice) / crossedPrice) * 100);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: ebook.title,
    description: plainDescription,
    image: ebook.coverImage || "",
    inLanguage: ebook.language === "HINDI" ? "hi" : ebook.language === "ENGLISH" ? "en" : "mr",
    bookFormat: "https://schema.org/EBook",
    fileFormat: "application/pdf",
    author: { "@type": "Person", name: "Adv. Omkar Shinde" },
    publisher: { "@type": "Organization", name: "Vakili Aani Kayde", url: "https://www.vakilianikayde.in" },
    offers: { "@type": "Offer", price: finalPrice, priceCurrency: "INR", availability: "https://schema.org/InStock", url: `https://www.vakilianikayde.in/ebooks/${id}` },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.vakilianikayde.in" },
      { "@type": "ListItem", position: 2, name: "Ebooks", item: "https://www.vakilianikayde.in/ebooks" },
      { "@type": "ListItem", position: 3, name: ebook.title, item: `https://www.vakilianikayde.in/ebooks/${id}` },
    ],
  };

  return (
    <div className="min-h-screen bg-white pb-28 md:pb-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* Breadcrumb */}
      <div className="sticky top-0 z-30 border-b border-brand-gold/15 bg-brand-cream/95 backdrop-blur-md">
        <div className="container mx-auto flex h-11 items-center gap-1.5 px-4 md:h-13">
          <Link href="/" className="text-brand-teal/50 transition-colors hover:text-brand-teal">
            <Home className="h-3.5 w-3.5" />
          </Link>
          <ChevronRight className="h-3 w-3 text-brand-gold/40" />
          <Link href="/ebooks" className="text-xs text-brand-teal/50 transition-colors hover:text-brand-teal">Ebooks</Link>
          <ChevronRight className="h-3 w-3 text-brand-gold/40" />
          <span className="max-w-40 truncate text-xs font-semibold text-brand-teal md:max-w-sm">{ebook.title}</span>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-4 md:py-8">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-12">

          {/* Left: Gallery */}
          <div className="h-fit lg:sticky lg:top-20 lg:col-span-5">
            <EbookGallery coverImage={ebook.coverImage} sampleImages={ebook.sampleImages} title={ebook.title} />
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col lg:col-span-7">

            {/* ID + language chips */}
            <div className="mb-3 flex flex-wrap items-center gap-2">
              {ebook.displayId && (
                <span className="rounded-md bg-brand-gold/15 px-2.5 py-0.5 text-[11px] font-black text-brand-gold">
                  #{ebook.displayId}
                </span>
              )}
              <span className="rounded-md border border-brand-teal/15 bg-brand-teal/5 px-2.5 py-0.5 text-[11px] font-semibold text-brand-teal">
                {LANGUAGE_LABELS[ebook.language ?? "MARATHI"]} PDF
              </span>
              {ebook.isCombo && (
                <span className="rounded-md bg-purple-100 px-2.5 py-0.5 text-[11px] font-bold text-purple-700">Combo Pack</span>
              )}
            </div>

            {/* Title */}
            <h1 className="mb-2 text-xl font-black leading-tight text-brand-teal sm:text-2xl md:text-3xl">
              {ebook.title}
            </h1>

            {/* Social proof strip */}
            <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-gray-500">
              <span className="flex items-center gap-1">
                {[1,2,3,4,5].map(i => <span key={i} className="text-brand-gold text-xs">★</span>)}
                <span className="ml-1 font-bold text-gray-700">4.8</span>
              </span>
              <span className="h-3 w-px bg-gray-200" />
              <span><strong className="text-gray-700">10,000+</strong> {labels.socialProof}</span>
              <span className="h-3 w-px bg-gray-200" />
              <span className="font-semibold text-brand-teal">⚡ Instant Delivery</span>
            </div>

            {/* Price block — dark navy */}
            <div className="mb-4 overflow-hidden rounded-2xl bg-brand-teal">
              <div className="flex items-center justify-between px-4 py-4">
                <div className="flex flex-col">
                  <span className="text-[11px] font-medium text-white/40 line-through">₹{crossedPrice}</span>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-4xl font-black leading-none tracking-tight ${isSaleActive ? "text-red-300" : "text-brand-gold"}`}>
                      ₹{finalPrice}
                    </span>
                    <span className="text-xs text-white/50">{labels.onlyText}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`rounded-lg px-3 py-1 text-xs font-black ${isSaleActive ? "bg-red-500/20 text-red-300 animate-pulse" : "bg-brand-gold/20 text-brand-gold"}`}>
                    {discountPercent}% {labels.discount}
                  </span>
                  {isSaleActive && <SaleTimer />}
                </div>
              </div>
              {/* Mobile CTA inside price block */}
              <div className="border-t border-white/10 px-4 pb-4 pt-3 md:hidden">
                <BuyButton ebookId={ebook.id} price={finalPrice} title={ebook.title} customLabel={labels.downloadBtn} language={ebook.language} />
                <p className="mt-2 flex items-center justify-center gap-1 text-center text-[10px] text-white/40">
                  <ShieldCheck className="h-3 w-3" /> {labels.securePayment}
                </p>
              </div>
            </div>

            {/* Notices — single combined card */}
            <div className="mb-4 rounded-xl border-l-4 border-brand-gold bg-brand-cream px-4 py-3 text-[12px] leading-relaxed text-gray-600">
              <p className="flex items-start gap-2 mb-1.5">
                <FileText className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-gold" />
                {labels.digitalNotice}
              </p>
              <p className="flex items-start gap-2 text-amber-700">
                <span className="mt-0.5 shrink-0 text-xs">⚠</span>
                {labels.refundNotice}
              </p>
            </div>

            {/* Info tags */}
            <div className="mb-5 flex flex-wrap gap-2">
              {[
                { icon: <DownloadIcon className="h-3 w-3" />, label: `PDF · ${LANGUAGE_LABELS[ebook.language ?? "MARATHI"]}` },
                ...(ebook.pages && ebook.pages > 0 ? [{ icon: <BookOpen className="h-3 w-3" />, label: `${ebook.pages} पाने` }] : []),
                { icon: <Zap className="h-3 w-3" />, label: "Instant Download" },
                { icon: <Smartphone className="h-3 w-3" />, label: "Mobile Readable" },
              ].map((tag, i) => (
                <span key={i} className="flex items-center gap-1.5 rounded-full border border-brand-gold/25 bg-brand-gold/8 px-3 py-1 text-[11px] font-semibold text-brand-teal">
                  {tag.icon}{tag.label}
                </span>
              ))}
            </div>

            {/* How to Buy — dark steps */}
            <div className="mb-5 rounded-2xl bg-brand-teal px-4 py-4">
              <p className="mb-3 text-center text-[9px] font-black tracking-[0.18em] text-white/40 uppercase">खरेदी कशी करावी / How to Buy</p>
              <div className="flex items-center justify-between">
                {[
                  { n: "1", mr: "बटन दाबा", en: "Click" },
                  { n: "2", mr: "माहिती भरा", en: "Fill Info" },
                  { n: "3", mr: "पेमेंट करा", en: "Pay" },
                  { n: "✓", mr: "PDF मिळवा", en: "Get PDF", done: true },
                ].map((step, i, arr) => (
                  <div key={i} className="flex flex-1 items-center">
                    <div className="flex flex-1 flex-col items-center gap-1.5 text-center">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-black ${step.done ? "bg-brand-gold text-brand-teal" : "border border-white/20 bg-white/10 text-white"}`}>
                        {step.n}
                      </div>
                      <div className="text-[9px] leading-tight text-white/70 sm:text-[10px]">
                        {step.mr}<br /><span className="opacity-50">{step.en}</span>
                      </div>
                    </div>
                    {i < arr.length - 1 && <div className="mb-4 h-px w-3 shrink-0 bg-white/15" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-sm mb-5 max-w-none text-gray-600">
              <h4 className="mb-2 flex items-center gap-2 text-sm font-black text-brand-teal sm:text-base">
                <span className="h-4 w-1 rounded-full bg-brand-gold" />
                वर्णन / Description
              </h4>
              <DescriptionToggle html={ebook.description} />
            </div>

            {/* Combo included books */}
            {ebook.isCombo && ebook.includedEbooks.length > 0 && (() => {
              const individualTotal = ebook.includedEbooks.reduce((sum, b) => sum + Number(b.price), 0);
              const saved = individualTotal - finalPrice;
              return (
                <div className="mb-5 rounded-2xl border border-purple-100 bg-purple-50/50 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <h4 className="flex items-center gap-2 text-sm font-bold text-purple-900">
                      <BookOpen className="h-4 w-4 text-purple-600" />
                      या पॅकेजमधील पुस्तके ({ebook.includedEbooks.length})
                    </h4>
                    {saved > 0 && (
                      <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-[11px] font-bold text-green-700">
                        ₹{saved} बचत
                      </span>
                    )}
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {ebook.includedEbooks.map((book) => (
                      <div key={book.id} className="flex items-center gap-3 rounded-xl border border-purple-100 bg-white p-2.5 shadow-sm">
                        {book.coverImage ? (
                          <Image src={book.coverImage} alt={book.title} width={36} height={48} className="rounded object-cover" />
                        ) : (
                          <div className="flex h-12 w-9 items-center justify-center rounded bg-gray-100 text-[9px] text-gray-400">N/A</div>
                        )}
                        <div className="min-w-0 flex-1">
                          <h5 className="line-clamp-2 text-xs font-bold leading-tight text-gray-900">{book.title}</h5>
                          <span className="text-[10px] font-semibold text-purple-600">₹{Number(book.price)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* Author */}
            <div className="mb-5 rounded-2xl border-l-4 border-brand-gold bg-brand-cream p-4">
              <p className="mb-2 text-[10px] font-black tracking-widest text-brand-gold/70 uppercase">{labels.authorLabel}</p>
              <div className="flex items-center gap-3">
                <Image
                  src="/omkar_shinde.png"
                  alt="Adv. Omkar Shinde"
                  width={52}
                  height={52}
                  className="h-13 w-13 shrink-0 rounded-full object-cover ring-2 ring-brand-gold/30"
                />
                <div>
                  <p className="text-sm font-black text-brand-teal">Adv. Omkar Shinde</p>
                  <p className="mt-0.5 text-[11px] leading-relaxed text-gray-500">{labels.authorBio}</p>
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="mb-5">
              <PreviewTrigger targetId="ebook-preview-section" />
              <div id="ebook-preview-section">
                <EbookPreview previewUrl={ebook.previewUrl} />
              </div>
            </div>

            {/* Desktop CTA card */}
            <div className="mb-6 hidden overflow-hidden rounded-2xl border border-brand-gold/20 bg-brand-cream p-5 shadow-sm md:block">
              <div className="flex flex-col gap-3">
                <BuyButton ebookId={ebook.id} price={finalPrice} title={ebook.title} customLabel={labels.downloadBtnDesktop} language={ebook.language} />
                <p className="flex items-center justify-center gap-1.5 text-center text-[10px] text-gray-400">
                  <ShieldCheck className="h-3 w-3 text-brand-teal" /> {labels.securePaymentDesktop}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-1.5">
                  {["UPI", "GPay", "PhonePe", "Paytm", "Visa / MC", "NetBanking"].map((m) => (
                    <span key={m} className="rounded border border-brand-teal/10 bg-white px-2 py-0.5 text-[10px] font-semibold text-gray-500">{m}</span>
                  ))}
                </div>
                <div className="border-t border-brand-gold/15 pt-3">
                  <ShareButtons title={ebook.title} text={`Check out this book: ${ebook.title}`} />
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="mb-5 space-y-2">
              <h4 className="mb-3 flex items-center gap-2 text-base font-black text-brand-teal">
                <span className="h-5 w-1 rounded-full bg-brand-gold" />
                {labels.faqHeader}
              </h4>
              <FaqItem q={labels.faq1Q}>
                <p className="mb-2 font-semibold text-gray-800">{labels.faq1AfterPayment}</p>
                <div className="space-y-1.5 pl-1">
                  <div className="flex items-start gap-2"><DownloadIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-teal" /><span>{labels.faq1Download}</span></div>
                  <div className="flex items-start gap-2"><span className="mt-0.5 shrink-0 text-green-600 text-xs">●</span><span>{labels.faq1WhatsApp}</span></div>
                  <div className="flex items-start gap-2"><Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-500" /><span>{labels.faq1Email}</span></div>
                </div>
              </FaqItem>
              <FaqItem q={labels.faq2Q}>{labels.faq2A}</FaqItem>
              <FaqItem q={labels.faq3Q}>{labels.faq3A}</FaqItem>
              <FaqItem q={labels.faq4Q} open accent="gold">{labels.faq4A}</FaqItem>
              <FaqItem q={labels.faq5Q}><div className="flex items-start gap-2"><Smartphone className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-teal" /><span>{labels.faq5A}</span></div></FaqItem>
              <FaqItem q={labels.faq6Q}><div className="flex items-start gap-2"><RefreshCw className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-teal" /><span>{labels.faq6A}</span></div></FaqItem>
              <FaqItem q={labels.faq7Q} accent="red">{labels.faq7A}</FaqItem>
            </div>

            {/* Share + WhatsApp help */}
            <div className="space-y-3">
              <ShareButtons title={ebook.title} text={`Check out this book: ${ebook.title}`} />
              <a
                href={`https://wa.me/918149319058?text=${encodeURIComponent(`${labels.waMessage} ${ebook.title}\nLink: https://www.vakilianikayde.in/ebooks/${ebook.id}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl border border-brand-gold/20 bg-brand-cream px-4 py-3 transition-colors hover:border-brand-gold/40"
              >
                <div>
                  <p className="text-xs font-bold text-brand-teal">{labels.helpDesktop}</p>
                  <p className="text-[10px] text-gray-400">{labels.helpDesktopSub}</p>
                </div>
                <span className="flex items-center gap-1.5 rounded-full bg-[#25D366] px-3 py-1.5 text-xs font-bold text-white">
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.696c1.001.572 2.135.882 3.807.882 3.123 0 5.669-2.52 5.669-5.765 0-3.186-2.586-5.786-5.669-5.786zm0 10.428c-1.353 0-2.617-.464-3.56-1.115l-.25-.173-1.637.428.44-1.593-.163-.261c-3.132-5.004.286-9.853 5.166-9.853 2.593 0 4.703 2.109 4.703 4.786 0 2.673-2.158 5.782-4.703 5.782zm2.618-4.293c-.143-.072-.857-.424-.972-.472-.143-.049-.25-.072-.321.071-.108.17-.429.525-.501.62-.107.096-.214.12-.357.049-.643-.287-1.401-.762-2.008-1.554-.25-.333.178-.309.606-1.164.072-.143.036-.262-.018-.381-.053-.12-.464-1.119-.643-1.524-.16-.381-.321-.334-.446-.334-.107-.001-.25-.001-.393-.001-.143 0-.393.048-.607.286-.214.238-.821.81-0.821 1.977 0 1.166.857 2.285.964 2.452.107.166 1.678 2.57 4.07 3.665.572.263 1.016.418 1.361.525.572.179 1.18.155 1.666.084.535-.072 1.392-.572 1.589-1.119.196-.548.196-1.024.143-1.119-.054-.096-.197-.144-.34-.215z" /></svg>
                  WhatsApp
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Recommended */}
        {recommendedBooks.length > 0 && (
          <div className="mt-14 md:mt-20">
            <div className="mb-5 flex items-end justify-between">
              <div>
                <h2 className="flex items-center gap-2 text-xl font-black text-brand-teal md:text-2xl">
                  <span className="h-6 w-1.5 rounded-full bg-brand-gold" />
                  {labels.recommendedTitle}
                </h2>
                <p className="mt-0.5 pl-3.5 text-xs text-gray-400 md:text-sm">{labels.recommendedSub}</p>
              </div>
            </div>
            <RecommendedCarousel books={recommendedBooks} />
          </div>
        )}
      </div>

      {/* Mobile Sticky Buy Bar */}
      <div className="fixed right-0 bottom-(--sticky-bar-bottom) left-0 z-40 border-t border-brand-gold/20 bg-brand-teal px-3 py-2.5 shadow-[0_-4px_20px_rgba(10,31,61,0.15)] md:hidden">
        <div className="flex items-center gap-3">
          <div className="flex shrink-0 flex-col leading-none">
            <span className="text-[10px] text-white/30 line-through">₹{crossedPrice}</span>
            <span className={`text-lg font-black ${isSaleActive ? "text-red-300" : "text-brand-gold"}`}>₹{finalPrice}</span>
          </div>
          <div className="min-w-0 flex-1">
            <BuyButton ebookId={ebook.id} price={finalPrice} title={ebook.title} customLabel={labels.downloadBtn} language={ebook.language} />
          </div>
        </div>
      </div>

      <ScrollToTop />
    </div>
  );
}
