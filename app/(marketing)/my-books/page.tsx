"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  BookOpen,
  Download,
  Search,
  Loader2,
  FileText,
  CheckCircle2,
  ShieldCheck,
  Phone,
  RefreshCw,
  Library,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { format } from "date-fns";
import { ComboCarousel } from "./combo-carousel";
import { PurchasePixelEvent } from "@/components/purchase-pixel-event";
import { LANGUAGES, coerceLanguage, type Language } from "@/lib/languages";
import { MYBOOKS_LABELS } from "./labels";

interface Order {
  id: string;
  date: string;
  amount: number;
  items: {
    title: string;
    ebookId: string;
    url: string;
    pages?: number | null;
    isCombo?: boolean;
    language?: string;
  }[];
}

const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER || "";

// Pick the language the customer reads in — the most common across their books.
function dominantLanguage(orders: Order[]): Language {
  const tally: Partial<Record<Language, number>> = {};
  for (const order of orders) {
    for (const item of order.items) {
      const lang = coerceLanguage(item.language);
      tally[lang] = (tally[lang] ?? 0) + 1;
    }
  }
  let best: Language = "MARATHI";
  let bestCount = -1;
  for (const lang of LANGUAGES) {
    const count = tally[lang] ?? 0;
    if (count > bestCount) { bestCount = count; best = lang; }
  }
  return best;
}

// API returns relative /d/CODE paths. Build absolute URLs from the real browser
// origin so shared/WhatsApp links always point at the production domain.
function withAbsoluteUrls(orders: Order[]): Order[] {
  if (typeof window === "undefined") return orders;
  const origin = window.location.origin;
  return orders.map((order) => ({
    ...order,
    items: order.items.map((item) => ({
      ...item,
      url: item.url.startsWith("http") ? item.url : `${origin}${item.url}`,
    })),
  }));
}

export default function MyBooksPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [bookLang, setBookLang] = useState<Language>("MARATHI");
  // Ref mirrors bookLang so memoized callbacks (performSearch, poll) read the
  // current language without being re-created on every language change.
  const langRef = useRef<Language>("MARATHI");
  const applyLang = useCallback((lang: Language) => {
    langRef.current = lang;
    setBookLang(lang);
  }, []);
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [downloadingKey, setDownloadingKey] = useState<string | null>(null);
  const [isFinalizing, setIsFinalizing] = useState(false);
  const [pollingTimedOut, setPollingTimedOut] = useState(false);
  const [justPurchasedOrder, setJustPurchasedOrder] = useState<{
    title: string;
    ebookId: string;
    amount: number;
    downloadUrl?: string;
  } | null>(null);
  const [purchasePixel, setPurchasePixel] = useState<{
    orderId: string;
    amount: number;
    contentIds: string[];
  } | null>(null);

  const [isUnauthorized, setIsUnauthorized] = useState(false);

  const performSearch = useCallback(async (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    setLoading(true);
    setIsUnauthorized(false);
    try {
      const phoneTokens: Record<string, string> = JSON.parse(localStorage.getItem("phone_access_tokens") || "{}");
      const accessToken = phoneTokens[searchTerm.trim()] ?? null;

      const res = await fetch("/api/orders/lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchTerm.trim(), accessToken }),
      });
      if (res.status === 401) { setIsUnauthorized(true); setOrders([]); return; }
      if (res.status === 429) throw new Error(MYBOOKS_LABELS[langRef.current].rateLimited);
      if (!res.ok) throw new Error(MYBOOKS_LABELS[langRef.current].somethingWrong);
      const data = await res.json();
      setOrders(withAbsoluteUrls(data.orders));
      if (data.orders.length > 0) {
        const lang = dominantLanguage(data.orders);
        applyLang(lang);
        if (!justPurchasedOrder) {
          toast.success(MYBOOKS_LABELS[lang].booksFound.replace("{n}", String(data.orders.length)));
          localStorage.setItem("customer_phone", searchTerm.trim());
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(MYBOOKS_LABELS[langRef.current].techError);
    } finally {
      setLoading(false);
    }
  }, [justPurchasedOrder, applyLang]);

  useEffect(() => {
    let pollIntervalId: ReturnType<typeof setInterval> | null = null;
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const paramPhone = params.get("phone");
      const paramEmail = params.get("email");
      if (paramPhone) { localStorage.setItem("customer_phone", paramPhone); setQuery(paramPhone); }
      if (paramEmail) { localStorage.setItem("customer_email", paramEmail); }

      // Language carried from the buy flow → localize from first paint (before orders load).
      const paramLang = params.get("lang");
      if (paramLang) applyLang(coerceLanguage(paramLang));

      const accessToken = params.get("access_token");
      if (accessToken && paramPhone) {
        try {
          const phoneTokens: Record<string, string> = JSON.parse(localStorage.getItem("phone_access_tokens") || "{}");
          phoneTokens[paramPhone] = accessToken;
          localStorage.setItem("phone_access_tokens", JSON.stringify(phoneTokens));
        } catch(e) { console.error(e); }
      }

      if (params.get("payment_success") === "true") {
        const amount = parseFloat(params.get("amount") || "0");
        const title = params.get("title") || "Unknown Book";
        const ebookId = params.get("ebook_id") || "";
        const orderId = params.get("orderId") || `order_${Date.now()}`;
        setJustPurchasedOrder({ title, ebookId, amount });
        if (amount > 0 && ebookId) {
          setPurchasePixel({ orderId, amount, contentIds: [ebookId] });
        }
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ["#5A1A2B", "#C79A3E", "#25D366"] });
        const phoneToSearch = paramPhone || localStorage.getItem("customer_phone");
        if (phoneToSearch) performSearch(phoneToSearch);
        if (amount > 0) {
          setIsFinalizing(true);
          setTimeout(() => setIsFinalizing(false), 3000);
          toast.success(MYBOOKS_LABELS[langRef.current].purchaseSuccessToast);
        }

      } else if (params.get("payment_pending") === "true") {
        const pendingOrderId = params.get("orderId");
        const pendingAmount = parseFloat(params.get("amount") || "0");
        const pendingEbookId = params.get("ebook_id") || "";
        const phoneToSearch = paramPhone || localStorage.getItem("customer_phone");
        if (phoneToSearch) {
          setQuery(phoneToSearch);
          toast.loading(MYBOOKS_LABELS[langRef.current].paymentProcessingToast, { id: "pending-poll" });
          let pollCount = 0;
          const MAX_POLLS = 6;
          pollIntervalId = setInterval(async () => {
            pollCount++;
            try {
              const res = await fetch("/api/orders/lookup", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ query: phoneToSearch.trim() }) });
              if (res.ok) {
                const data = await res.json();
                const paidOrder: Order | undefined = pendingOrderId
                  ? data.orders?.find((o: Order) => o.id === pendingOrderId)
                  : data.orders?.[0];
                if (paidOrder) {
                  if (pollIntervalId !== null) clearInterval(pollIntervalId);
                  setOrders(withAbsoluteUrls(data.orders));
                  applyLang(dominantLanguage(data.orders));
                  toast.success(MYBOOKS_LABELS[dominantLanguage(data.orders)].purchaseReadyToast, { id: "pending-poll" });
                  confetti({ particleCount: 100, spread: 60, origin: { y: 0.6 } });
                  // Fire Purchase pixel — payment was captured even though callback failed
                  const pixelAmount = pendingAmount || paidOrder.amount;
                  const pixelEbookId = pendingEbookId || paidOrder.items[0]?.ebookId || "";
                  if (pixelAmount > 0 && pixelEbookId) {
                    setPurchasePixel({ orderId: paidOrder.id, amount: pixelAmount, contentIds: [pixelEbookId] });
                  }
                }
              }
            } catch { /* ignore poll errors */ }
            if (pollCount >= MAX_POLLS) {
              if (pollIntervalId !== null) clearInterval(pollIntervalId);
              toast.dismiss("pending-poll");
              setPollingTimedOut(true);
              performSearch(phoneToSearch);
            }
          }, 5000);
        }
      } else {
        const phoneToSearch = paramPhone || localStorage.getItem("customer_phone");
        if (phoneToSearch) { setQuery(phoneToSearch); performSearch(phoneToSearch); }
      }

      if (accessToken || params.get("payment_success") === "true" || params.get("payment_pending") === "true" || paramPhone) {
        window.history.replaceState({}, "", window.location.pathname);
      }
    }
    return () => { if (pollIntervalId !== null) clearInterval(pollIntervalId); };
  }, [performSearch, applyLang]);

  const handleSearch = async (e: React.FormEvent) => { e.preventDefault(); performSearch(query); };

  // Trigger the PDF download and show a loader on the button. The file is served
  // via a CloudFront/S3 signed URL (cross-origin, no CORS) so the browser handles
  // the actual download — we can't read completion in JS. Show the loader for a
  // short window to confirm the click registered, then reset.
  const handleDownload = useCallback((url: string, key: string) => {
    if (downloadingKey) return;
    setDownloadingKey(key);
    const dlUrl = `${url}?dl=1`;
    // Kick off the download without navigating away from the page.
    const a = document.createElement("a");
    a.href = dlUrl;
    a.rel = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => {
      setDownloadingKey(null);
      toast.success(MYBOOKS_LABELS[langRef.current].downloadStarted);
    }, 2500);
  }, [downloadingKey]);

  const justPurchasedItem = justPurchasedOrder && orders
    ? orders.flatMap(o => o.items).find(i => i.ebookId === justPurchasedOrder.ebookId || i.title === justPurchasedOrder.title)
    : null;

  const L = MYBOOKS_LABELS[bookLang];

  return (
    <div className="flex min-h-screen flex-col bg-[#F5F5F0]">

      {purchasePixel && (
        <PurchasePixelEvent
          orderId={purchasePixel.orderId}
          amount={purchasePixel.amount}
          contentIds={purchasePixel.contentIds}
          numItems={purchasePixel.contentIds.length}
        />
      )}

      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-5 md:max-w-4xl">

        {/* Success card after purchase */}
        {justPurchasedOrder && (
          <div className="animate-in fade-in slide-in-from-top-4 mb-5 duration-700">
            <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-brand-teal to-[#0a2540] p-6 shadow-xl shadow-brand-teal/20">
              {/* decorative glows */}
              <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-brand-gold/15 blur-3xl" />
              <div className="absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-green-400/10 blur-3xl" />

              <div className="relative flex flex-col items-center text-center">
                {/* animated check */}
                <div className="relative mb-4">
                  <span className="absolute inset-0 animate-ping rounded-full bg-green-400/30" />
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-green-400/15 ring-1 ring-green-400/30">
                    <CheckCircle2 className="h-8 w-8 text-green-400" />
                  </div>
                </div>

                <h2 className="text-xl font-black tracking-tight text-white">Payment Successful!</h2>
                <p className="mt-1 text-xs font-medium text-white/40">{L.bookReady}</p>

                {/* book block */}
                <div className="mt-4 w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3.5 text-left backdrop-blur-sm">
                  <h3 className="text-sm font-black leading-snug text-white">{justPurchasedOrder.title}</h3>
                  <div className="mt-2 flex flex-wrap items-center gap-1.5">
                    {justPurchasedItem?.pages ? <span className="rounded-full bg-brand-gold/15 px-2 py-0.5 text-[10px] font-bold text-brand-gold">{justPurchasedItem.pages} pages</span> : null}
                    {justPurchasedItem?.isCombo ? <span className="rounded-full bg-amber-400/15 px-2 py-0.5 text-[10px] font-bold text-amber-300">Combo PDF</span> : null}
                    {justPurchasedOrder.amount > 0 ? <span className="rounded-full bg-green-400/15 px-2 py-0.5 text-[10px] font-bold text-green-300">₹{justPurchasedOrder.amount} Paid</span> : null}
                  </div>
                </div>

                {/* WhatsApp delivery note */}
                <div className="mt-3 flex w-full items-start gap-2 rounded-xl border border-green-400/20 bg-green-400/10 px-3 py-2.5 text-left">
                  <FaWhatsapp className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-400" />
                  <p className="text-[10px] leading-relaxed text-green-200/80">{L.waDelivered}</p>
                </div>

                {/* CTAs */}
                {justPurchasedItem ? (
                  <div className="mt-4 w-full">
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        disabled={downloadingKey === "just-purchased"}
                        onClick={() => handleDownload(justPurchasedItem.url, "just-purchased")}
                        className="flex items-center justify-center gap-1.5 rounded-xl bg-brand-gold py-3 text-sm font-black text-white shadow-lg shadow-brand-gold/20 transition-all hover:bg-brand-gold/90 active:scale-95 disabled:opacity-70"
                      >
                        {downloadingKey === "just-purchased" ? (
                          <><Loader2 className="h-4 w-4 animate-spin" /> {L.downloading}</>
                        ) : (
                          <><Download className="h-4 w-4" /> Download</>
                        )}
                      </button>
                      {WA_NUMBER ? (
                        <a
                          href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`📚 *${L.waMyPdf}*\n\n📖 *${justPurchasedItem.title}*\n\n🔗 Download Link:\n${justPurchasedItem.url}\n\n⚠️ ${L.waLinkNote}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 rounded-xl bg-[#25D366] py-3 text-sm font-black text-white shadow-lg shadow-green-500/20 transition-all hover:bg-[#25D366]/90 active:scale-95"
                        >
                          <FaWhatsapp className="h-4 w-4" /> WhatsApp
                        </a>
                      ) : (
                        <a
                          href={justPurchasedItem.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 rounded-xl bg-white/10 py-3 text-sm font-black text-white transition-all hover:bg-white/15 active:scale-95"
                        >
                          <BookOpen className="h-4 w-4" /> Open
                        </a>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 flex items-center gap-2 text-sm font-bold text-white/50">
                    <Loader2 className="h-4 w-4 animate-spin text-brand-gold" />
                    {L.linkPreparing}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Library hero + search */}
        <div className="relative mb-6 overflow-hidden rounded-3xl border border-brand-gold/15 bg-linear-to-br from-white to-brand-gold/5 p-5 shadow-sm sm:p-6">
          <div className="absolute -top-10 -right-8 h-32 w-32 rounded-full bg-brand-gold/10 blur-3xl" />
          <div className="relative">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-teal text-brand-gold shadow-md shadow-brand-teal/20">
                <Library className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-base font-black text-brand-teal">{L.libraryTitle}</h1>
                <p className="text-[11px] font-medium text-gray-400">{L.librarySub}</p>
              </div>
            </div>

            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  inputMode="numeric"
                  placeholder={L.phonePlaceholder}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="h-12 rounded-xl border-gray-200 bg-white pl-10 text-sm font-semibold shadow-sm focus:border-brand-teal focus:ring-1 focus:ring-brand-teal focus-visible:ring-offset-0"
                />
              </div>
              <Button
                type="submit"
                disabled={loading || !query.trim()}
                className="h-12 shrink-0 rounded-xl bg-brand-teal px-6 font-black text-white shadow-sm active:scale-95 disabled:opacity-50"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Search className="h-4 w-4 sm:mr-1.5" /><span className="hidden sm:inline">{L.searchBtn}</span></>}
              </Button>
            </form>

            {/* Quick action chips */}
            {process.env.NEXT_PUBLIC_WA_NUMBER ? (
              <div className="mt-3 flex flex-wrap gap-2">
                <a href={`tel:+${process.env.NEXT_PUBLIC_WA_NUMBER}`} className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-[11px] font-bold text-brand-teal shadow-sm transition-all hover:border-brand-teal/40 active:scale-95">
                  <Phone className="h-3 w-3" />
                  Call Us
                </a>
                <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER}?text=${encodeURIComponent(L.waHelpRequest)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-3.5 py-1.5 text-[11px] font-bold text-green-700 transition-all hover:bg-green-100 active:scale-95">
                  <FaWhatsapp className="h-3 w-3" />
                  WhatsApp Help
                </a>
              </div>
            ) : null}
          </div>
        </div>

        {/* Finalizing */}
        {isFinalizing && (
          <div className="animate-in fade-in mb-4 duration-500">
            <div className="flex items-center gap-4 rounded-2xl border border-brand-gold/20 bg-white p-4 shadow-sm">
              <div className="relative shrink-0">
                <div className="absolute inset-0 animate-ping rounded-full bg-brand-teal/15" />
                <CheckCircle2 className="relative h-10 w-10 text-brand-teal" />
              </div>
              <div>
                <h2 className="font-black text-brand-teal">Order Complete!</h2>
                <p className="text-xs text-gray-400">Verifying your payment securely...</p>
              </div>
            </div>
          </div>
        )}

        {/* Polling timed out */}
        {pollingTimedOut && (
          <div className="animate-in fade-in mb-4 duration-500">
            <div className="flex items-center gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-4">
              <ShieldCheck className="h-8 w-8 shrink-0 text-amber-500" />
              <div className="flex-1">
                <h2 className="text-sm font-black text-amber-800">Payment processing...</h2>
                <p className="text-xs text-amber-700/70">Your payment was received but delivery is delayed. Tap refresh.</p>
              </div>
              <Button size="sm" onClick={() => { setPollingTimedOut(false); performSearch(query); }} className="shrink-0 rounded-xl bg-amber-500 text-xs font-bold text-white hover:bg-amber-600 active:scale-95">
                <RefreshCw className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        )}

        {/* Unauthorized — no device token */}
        {isUnauthorized && (
          <div className="animate-in fade-in mb-4 duration-500">
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-red-100 bg-red-50 p-5 text-center">
              <ShieldCheck className="h-8 w-8 text-red-400" />
              <div>
                <p className="font-black text-red-800">Access not authorized on this device</p>
                <p className="mt-1 text-xs text-red-600/80">Your books are linked to the device/browser where you purchased. Open the download link from your WhatsApp message, or contact us.</p>
              </div>
              {WA_NUMBER ? (
                <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`मला माझ्या books access करायच्या आहेत. Phone: ${query}`)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#25D366] px-4 py-2.5 text-xs font-bold text-white active:scale-95">
                  <FaWhatsapp className="h-3.5 w-3.5" /> Get Access via WhatsApp
                </a>
              ) : null}
            </div>
          </div>
        )}

        {/* Results */}
        {orders === null ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="relative mb-5">
              <div className="absolute inset-0 animate-pulse rounded-3xl bg-brand-gold/10 blur-xl" />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl border-2 border-dashed border-brand-gold/25 bg-white">
                <Library className="h-9 w-9 text-brand-gold/50" />
              </div>
            </div>
            <p className="text-base font-black text-brand-teal">{L.searchYourBooks}</p>
            <p className="mt-1 max-w-xs text-sm text-gray-400">{L.searchPrompt}</p>
          </div>
        ) : orders.length > 0 ? (
          <div>
            <div className="mb-3 flex items-center gap-2 px-1">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-teal/8 px-3 py-1 text-[11px] font-black text-brand-teal">
                <BookOpen className="h-3 w-3" />
                {L.booksCount.replace("{n}", String(orders.reduce((n, o) => n + o.items.length, 0)))}
              </span>
              <span className="h-px flex-1 bg-gray-200/70" />
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {orders.map((order) => (
              <div key={order.id} className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:border-brand-gold/30 hover:shadow-md">
                {/* Accent rail */}
                <div className="absolute inset-y-0 left-0 w-1 bg-linear-to-b from-brand-gold to-brand-teal" />

                <div className="flex items-center justify-between border-b border-gray-50 py-2.5 pr-4 pl-5">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-400">
                    <FileText className="h-3 w-3" />
                    {format(new Date(order.date), "dd MMM yyyy")}
                  </div>
                  <span className="rounded-full bg-green-50 px-2.5 py-0.5 text-[11px] font-black text-green-600">₹{order.amount} Paid</span>
                </div>

                <div className="divide-y divide-gray-50">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="px-4 pt-3 pb-4 pl-5">
                      <div className="flex gap-3">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-teal/5 text-brand-teal">
                          <BookOpen className="h-5 w-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-sm font-black leading-snug text-brand-teal">{item.title}</h3>
                          <div className="mt-1.5 flex flex-wrap gap-1.5">
                            {item.pages ? <span className="rounded-full border border-brand-gold/25 bg-brand-gold/8 px-2 py-0.5 text-[10px] font-bold text-brand-gold">{item.pages} pages</span> : null}
                            {item.isCombo && <span className="rounded-full border border-amber-100 bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-600">Combo PDF</span>}
                            {justPurchasedOrder?.ebookId === item.ebookId && <span className="animate-pulse rounded-full border border-green-100 bg-green-50 px-2 py-0.5 text-[10px] font-bold text-green-600">New</span>}
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`📚 *${L.waMyPdf}*\n\n📖 *${item.title}*\n\n🔗 Download Link:\n${item.url}\n\n⚠️ ${L.waLinkNoteExpire}`)}`} target="_blank" rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 rounded-xl border border-green-200 bg-green-50 py-2.5 text-xs font-bold text-green-700 transition-colors hover:bg-green-100 active:scale-95">
                          <FaWhatsapp className="h-3.5 w-3.5" />
                          Save Link
                        </a>
                        <button type="button"
                          disabled={downloadingKey === `${order.id}-${idx}`}
                          className="flex items-center justify-center gap-1.5 rounded-xl bg-brand-teal py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-brand-teal/90 active:scale-95 disabled:opacity-70"
                          onClick={() => handleDownload(item.url, `${order.id}-${idx}`)}>
                          {downloadingKey === `${order.id}-${idx}` ? (
                            <><Loader2 className="h-3.5 w-3.5 animate-spin" /> {L.downloading}</>
                          ) : (
                            <><Download className="h-3.5 w-3.5" /> Download</>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-gray-200 bg-white/60 px-6 py-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-100 bg-amber-50">
              <Search className="h-7 w-7 text-amber-400" />
            </div>
            <div>
              <p className="font-black text-gray-700">{L.noBooksFound}</p>
              <p className="mt-1 text-xs text-gray-400">{L.checkNumber}</p>
            </div>
            <button onClick={() => window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(L.waPaidNoBook.replace("{phone}", query || "N/A"))}`, '_blank')}
              className="inline-flex items-center gap-1.5 rounded-xl bg-brand-teal px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-brand-teal/90 active:scale-95">
              <FaWhatsapp className="h-3.5 w-3.5" />
              {L.paidButNoBook}
            </button>
          </div>
        )}

        {/* Recommended combos */}
        {orders !== null && orders.length > 0 && (
          <div className="mt-10 mb-2">
            <div className="mb-3 flex items-center gap-2 px-1">
              <Sparkles className="h-3.5 w-3.5 text-brand-gold" />
              <p className="text-[11px] font-black tracking-widest text-gray-500 uppercase">{L.suggestedForYou}</p>
              <ArrowRight className="h-3 w-3 text-gray-300" />
            </div>
            <ComboCarousel />
          </div>
        )}
      </main>

      {/* Support footer */}
      <footer className="border-t border-gray-100 bg-white px-4 py-8 pb-24 text-center md:pb-8">
        <p className="mb-4 text-xs font-bold text-gray-400">{L.needHelp}</p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
          {process.env.NEXT_PUBLIC_WA_NUMBER ? (
            <>
              <a href={`tel:+${process.env.NEXT_PUBLIC_WA_NUMBER}`} className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-brand-teal px-8 text-sm font-bold text-white shadow-lg shadow-brand-teal/20 transition-transform hover:-translate-y-0.5 active:scale-95">
                <Phone className="h-4 w-4" />
                {L.callCta}
              </a>
              <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER}?text=${encodeURIComponent(L.waHelpRequest)}`} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-8 text-sm font-bold text-white shadow-lg shadow-green-500/20 transition-transform hover:-translate-y-0.5 active:scale-95">
                <FaWhatsapp className="h-4 w-4" />
                {L.whatsappHelpCta}
              </a>
            </>
          ) : (
            <div className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-gray-100 px-8 text-sm font-bold text-gray-500">Support unavailable</div>
          )}
        </div>
      </footer>
    </div>
  );
}
