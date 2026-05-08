"use client";

import { useState, useEffect, useCallback } from "react";
import confetti from "canvas-confetti";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  BookOpen,
  Download,
  Search,
  Loader2,
  ArrowLeft,
  FileText,
  CheckCircle2,
  ShieldCheck,
  Phone,
  RefreshCw,
  Scale,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import { format } from "date-fns";
import { ComboCarousel } from "./combo-carousel";
import { DownloadInstructions } from "./_components/download-instructions";

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
  }[];
}

const WA_NUMBER = "918149319058";

export default function MyBooksPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [showInstructions, setShowInstructions] = useState(false);
  const [isFinalizing, setIsFinalizing] = useState(false);
  const [pollingTimedOut, setPollingTimedOut] = useState(false);
  const [justPurchasedOrder, setJustPurchasedOrder] = useState<{
    title: string;
    ebookId: string;
    amount: number;
    downloadUrl?: string;
  } | null>(null);
  const isMobile = useIsMobile();

  const performSearch = useCallback(async (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/orders/lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchTerm.trim() }),
      });
      if (res.status === 429) throw new Error("खूप जास्त वेळा प्रयत्न केले गेले आहेत. कृपया थोड्या वेळाने प्रयत्न करा.");
      if (!res.ok) throw new Error("काहीतरी चूक झाली. कृपया पुन्हा प्रयत्न करा.");
      const data = await res.json();
      setOrders(data.orders);
      if (data.orders.length > 0 && !justPurchasedOrder) {
        toast.success(`${data.orders.length} पुस्तके सापडली!`);
        localStorage.setItem("customer_phone", searchTerm.trim());
      }
    } catch (error) {
      console.error(error);
      toast.error("तांत्रिक अडचण आली. कृपया थोड्या वेळाने प्रयत्न करा.");
    } finally {
      setLoading(false);
    }
  }, [justPurchasedOrder]);

  useEffect(() => {
    let pollIntervalId: ReturnType<typeof setInterval> | null = null;
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const paramPhone = params.get("phone");
      const paramEmail = params.get("email");
      if (paramPhone) { localStorage.setItem("customer_phone", paramPhone); setQuery(paramPhone); }
      if (paramEmail) { localStorage.setItem("customer_email", paramEmail); }

      const accessToken = params.get("access_token");
      if (accessToken) {
        try {
          const existingTokens = JSON.parse(localStorage.getItem("authorized_tokens") || "[]");
          if (!existingTokens.includes(accessToken)) { existingTokens.push(accessToken); localStorage.setItem("authorized_tokens", JSON.stringify(existingTokens)); }
        } catch(e) { console.error(e); }
      }

      if (params.get("payment_success") === "true") {
        const amount = parseFloat(params.get("amount") || "0");
        const title = params.get("title") || "Unknown Book";
        const ebookId = params.get("ebook_id") || "";
        const currency = params.get("currency") || "INR";
        setJustPurchasedOrder({ title, ebookId, amount });
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ["#0A1F3D", "#C9962A", "#25D366"] });
        const phoneToSearch = paramPhone || localStorage.getItem("customer_phone");
        if (phoneToSearch) performSearch(phoneToSearch);
        if (isMobile) setTimeout(() => setShowInstructions(true), 2500);
        if (amount > 0) {
          const trackPurchase = () => { if (window.fbq) window.fbq("track", "Purchase", { currency, value: amount, content_name: title, content_type: "product", content_ids: ebookId ? [ebookId] : undefined }); };
          trackPurchase();
          if (!window.fbq) setTimeout(trackPurchase, 1500);
          setIsFinalizing(true);
          setTimeout(() => setIsFinalizing(false), 3000);
          toast.success("खरेदी यशस्वी! तुमचे पुस्तक खालील आहे.");
        }
      } else if (params.get("payment_pending") === "true") {
        const pendingOrderId = params.get("orderId");
        const phoneToSearch = paramPhone || localStorage.getItem("customer_phone");
        if (phoneToSearch) {
          setQuery(phoneToSearch);
          toast.loading("पेमेंट प्रक्रियेत आहे... कृपया थांबा.", { id: "pending-poll" });
          let pollCount = 0;
          const MAX_POLLS = 6;
          pollIntervalId = setInterval(async () => {
            pollCount++;
            try {
              const res = await fetch("/api/orders/lookup", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ query: phoneToSearch.trim() }) });
              if (res.ok) {
                const data = await res.json();
                const paidOrder = pendingOrderId ? data.orders?.find((o: Order) => o.id === pendingOrderId) : data.orders?.length > 0;
                if (paidOrder) {
                  if (pollIntervalId !== null) clearInterval(pollIntervalId);
                  setOrders(data.orders);
                  toast.success("खरेदी यशस्वी! तुमचे पुस्तक तयार आहे.", { id: "pending-poll" });
                  confetti({ particleCount: 100, spread: 60, origin: { y: 0.6 } });
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
  }, [isMobile, performSearch]);

  const handleSearch = async (e: React.FormEvent) => { e.preventDefault(); performSearch(query); };

  const justPurchasedItem = justPurchasedOrder && orders
    ? orders.flatMap(o => o.items).find(i => i.ebookId === justPurchasedOrder.ebookId || i.title === justPurchasedOrder.title)
    : null;

  return (
    <div className="flex min-h-screen flex-col bg-[#F5F5F0]">

      {/* Header */}
      <header className="sticky top-0 z-50 bg-brand-teal shadow-md">
        <div className="mx-auto flex max-w-2xl items-center gap-3 px-4 py-3.5">
          <Link href="/" className="rounded-lg p-1.5 text-white/50 transition-colors hover:bg-white/10 hover:text-white active:scale-95">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex items-center gap-2.5 flex-1">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-gold/20">
              <Scale className="h-4 w-4 text-brand-gold" />
            </div>
            <div>
              <h1 className="text-sm font-black leading-none text-white">My Books</h1>
              <span className="text-[9px] font-bold tracking-widest text-white/35 uppercase">Digital Library</span>
            </div>
          </div>
          <DownloadInstructions open={showInstructions} onOpenChange={setShowInstructions} />
        </div>
      </header>

      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-5">

        {/* Success card after purchase */}
        {justPurchasedOrder && (
          <div className="animate-in slide-in-from-top-4 mb-5 duration-700">
            <div className="relative overflow-hidden rounded-2xl bg-brand-teal p-5 shadow-xl">
              <div className="absolute -top-10 -right-10 h-36 w-36 rounded-full bg-brand-gold/10 blur-3xl" />
              <div className="relative flex flex-col items-center text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-400/20">
                  <CheckCircle2 className="h-7 w-7 text-green-400" />
                </div>
                <h2 className="text-lg font-black text-white">Purchase Successful!</h2>
                <div className="mt-3 mb-3 w-full rounded-xl border border-white/10 bg-white/8 px-4 py-3">
                  <h3 className="text-sm font-black leading-tight text-white">{justPurchasedOrder.title}</h3>
                </div>
                <div className="mb-4 w-full flex items-start gap-2 rounded-xl border border-green-400/20 bg-green-400/10 px-3 py-2.5">
                  <FaWhatsapp className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-400" />
                  <p className="text-[10px] leading-relaxed text-green-300/80 text-left">PDF sent to your WhatsApp. If not received, use the button below.</p>
                </div>
                {justPurchasedItem ? (
                  <div className="flex w-full flex-col gap-2">
                    <Button asChild size="lg" className="w-full rounded-xl bg-brand-gold font-black text-white shadow-lg active:scale-95">
                      <a href={justPurchasedItem.url} target="_blank" rel="noopener noreferrer">
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </a>
                    </Button>
                    <p className="text-[10px] text-white/30">Saved to your browser&apos;s &quot;Downloads&quot; folder.</p>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-sm font-bold text-white/50">
                    <Loader2 className="h-4 w-4 animate-spin text-brand-gold" />
                    Preparing your link...
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Search */}
        <form onSubmit={handleSearch} className="mb-4 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Enter your WhatsApp number..."
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
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          </Button>
        </form>

        {/* Quick actions */}
        <div className="mb-5 flex gap-2">
          <a href="tel:+918149319058" className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-gray-200 bg-white py-2.5 text-xs font-bold text-brand-teal shadow-sm transition-all hover:border-brand-teal/30 active:scale-95">
            <Phone className="h-3.5 w-3.5" />
            Call Us
          </a>
          <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hello, I need help downloading my books.")}`} target="_blank" rel="noopener noreferrer" className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-green-100 bg-white py-2.5 text-xs font-bold text-green-600 shadow-sm transition-all hover:border-green-300 active:scale-95">
            <FaWhatsapp className="h-3.5 w-3.5" />
            WhatsApp Help
          </a>
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

        {/* Results */}
        {orders === null ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-3xl border-2 border-dashed border-brand-gold/20 bg-white">
              <BookOpen className="h-9 w-9 text-brand-gold/40" />
            </div>
            <p className="font-black text-brand-teal">Find Your Books</p>
            <p className="mt-1 text-sm text-gray-400">Enter your WhatsApp number above</p>
          </div>
        ) : orders.length > 0 ? (
          <div className="space-y-3">
            <p className="px-1 text-[11px] font-black tracking-widest text-gray-400 uppercase">{orders.length} orders found</p>
            {orders.map((order) => (
              <div key={order.id} className="overflow-hidden rounded-2xl bg-white shadow-sm">
                {/* Thin gold top bar */}
                <div className="h-1 w-full bg-brand-gold/40" />
                <div className="flex items-center justify-between px-4 py-3">
                  <div className="flex items-center gap-2">
                    <FileText className="h-3.5 w-3.5 text-gray-400" />
                    <span className="text-xs font-semibold text-gray-400">{format(new Date(order.date), "dd MMM yyyy")}</span>
                  </div>
                  <span className="rounded-full bg-green-50 px-2.5 py-0.5 text-[11px] font-black text-green-600">₹{order.amount} Paid</span>
                </div>

                <div className="space-y-px">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="px-4 pb-4">
                      <h3 className="mb-2 text-sm font-black leading-snug text-brand-teal">{item.title}</h3>
                      <div className="mb-3 flex flex-wrap gap-1.5">
                        {item.pages ? <span className="rounded-full border border-brand-gold/25 bg-brand-gold/8 px-2 py-0.5 text-[10px] font-bold text-brand-gold">{item.pages} pages</span> : null}
                        {item.isCombo && <span className="rounded-full border border-amber-100 bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-600">Combo PDF</span>}
                        {justPurchasedOrder?.ebookId === item.ebookId && <span className="animate-pulse rounded-full border border-green-100 bg-green-50 px-2 py-0.5 text-[10px] font-bold text-green-600">New</span>}
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hello,\nMy book: ${item.title}\nLink: ${item.url}\nPlease save this message.`)}`} target="_blank" rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 rounded-xl border border-green-200 bg-green-50 py-2.5 text-xs font-bold text-green-700 transition-colors hover:bg-green-100 active:scale-95">
                          <FaWhatsapp className="h-3.5 w-3.5" />
                          Save Link
                        </a>
                        <a href={item.url} target="_blank" rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 rounded-xl bg-brand-teal py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-brand-teal/90 active:scale-95"
                          onClick={() => setShowInstructions(true)}>
                          <Download className="h-3.5 w-3.5" />
                          Download PDF
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-red-100 bg-red-50">
              <BookOpen className="h-8 w-8 text-red-300" />
            </div>
            <div>
              <p className="font-black text-gray-700">No books found</p>
              <p className="mt-1 text-xs text-gray-400">Check your number or contact support.</p>
            </div>
            <button onClick={() => window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hello, I paid for a book but it's not showing. My number: ${query || "N/A"}`)}`, '_blank')}
              className="rounded-xl border border-dashed border-gray-300 px-4 py-2.5 text-xs font-bold text-gray-500 transition-colors hover:border-brand-teal hover:text-brand-teal active:scale-95">
              I paid but book is missing?
            </button>
          </div>
        )}

        {/* Recommended combos */}
        {orders !== null && orders.length > 0 && (
          <div className="mt-8 mb-2">
            <p className="mb-3 px-1 text-[11px] font-black tracking-widest text-gray-400 uppercase">Recommended for you</p>
            <ComboCarousel />
          </div>
        )}
      </main>

      {/* Support footer */}
      <footer className="border-t border-gray-100 bg-white px-4 py-8 pb-24 text-center md:pb-8">
        <p className="mb-4 text-xs font-bold text-gray-400">मदत हवी? आम्ही येथे आहोत.</p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <a href="tel:+918149319058" className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-brand-teal px-8 text-sm font-bold text-white shadow-lg shadow-brand-teal/20 transition-transform hover:-translate-y-0.5 active:scale-95">
            <Phone className="h-4 w-4" />
            कॉल करा (+91 8149319058)
          </a>
          <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("नमस्कार, मला माझी पुस्तके डाऊनलोड करण्यास मदत हवी आहे.")}`} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-8 text-sm font-bold text-white shadow-lg shadow-green-500/20 transition-transform hover:-translate-y-0.5 active:scale-95">
            <FaWhatsapp className="h-4 w-4" />
            WhatsApp वर मदत घ्या
          </a>
        </div>
      </footer>
    </div>
  );
}
