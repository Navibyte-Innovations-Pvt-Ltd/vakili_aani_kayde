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
    <div className="flex min-h-screen flex-col bg-brand-cream">

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-brand-teal/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center gap-3 px-4 py-3">
          <Link href="/" className="rounded-xl p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white active:scale-95">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex items-center gap-2">
            <Scale className="h-4 w-4 text-brand-gold" />
            <div>
              <h1 className="text-sm font-black leading-none text-white">माझी पुस्तके</h1>
              <span className="text-[10px] font-bold tracking-widest text-white/40 uppercase">My Digital Bookshelf</span>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-6">

        {/* Just Purchased — success card */}
        {justPurchasedOrder && (
          <div className="animate-in slide-in-from-top-4 mb-6 duration-700">
            <div className="relative overflow-hidden rounded-2xl bg-brand-teal p-6 shadow-xl">
              <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-brand-gold/10 blur-2xl" />
              <div className="relative flex flex-col items-center text-center">
                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-green-400/20 text-green-300">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h2 className="text-xl font-black text-white">अभिनंदन!</h2>
                <p className="text-xs font-bold tracking-widest text-white/40 uppercase">तुमची खरेदी यशस्वी झाली</p>
                <div className="mt-4 mb-4 w-full rounded-xl border border-white/10 bg-white/8 p-3">
                  <p className="text-[10px] font-bold text-white/40 uppercase">आता डाऊनलोड करा</p>
                  <h3 className="mt-0.5 text-base font-black leading-tight text-white">{justPurchasedOrder.title}</h3>
                </div>
                <div className="mb-5 w-full rounded-xl border border-green-400/20 bg-green-400/10 p-3 text-left">
                  <div className="flex items-center gap-2">
                    <FaWhatsapp className="h-4 w-4 text-green-400" />
                    <span className="text-[11px] font-black text-green-300">WhatsApp वर PDF पाठवली आहे!</span>
                  </div>
                  <p className="mt-1 text-[10px] leading-relaxed text-green-300/70">तुम्हाला व्हॉट्सएपवर लगेच मेसेज येईल. जर मेसेज आला नाही तर खालील बटनावरून डाऊनलोड करा.</p>
                </div>
                {justPurchasedItem ? (
                  <div className="flex w-full flex-col gap-3">
                    <Button asChild size="lg" className="w-full rounded-xl bg-brand-gold text-sm font-black text-white shadow-lg transition-all hover:-translate-y-0.5 active:scale-95">
                      <a href={justPurchasedItem.url} target="_blank" rel="noopener noreferrer">
                        <Download className="mr-2 h-5 w-5 animate-bounce" />
                        PDF डाऊनलोड करा
                      </a>
                    </Button>
                    <Button asChild variant="outline" size="sm" className="w-full rounded-xl border-white/20 bg-white/5 text-green-300 hover:bg-white/10">
                      <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`नमस्कार,\nहे माझे पुस्तक आहे: ${justPurchasedItem.title}\nलिंक: ${justPurchasedItem.url}\n\nकृपया हा मेसेज सेव्ह राहू द्या.`)}`} target="_blank" rel="noopener noreferrer">
                        <FaWhatsapp className="mr-2 h-4 w-4" />
                        लिंक WhatsApp वर सेव्ह करा
                      </a>
                    </Button>
                    <p className="text-[10px] text-white/30"><span className="font-bold text-brand-gold">टीप:</span> PDF तुमच्या ब्राउझरच्या &quot;Downloads&quot; फोल्डरमध्ये सेव्ह होईल.</p>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-sm font-bold text-white/50">
                    <Loader2 className="h-4 w-4 animate-spin text-brand-gold" />
                    तुमची लिंक तयार होत आहे...
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Search */}
        <div className="mb-5">
          <div className="rounded-2xl border border-brand-gold/15 bg-white p-4 shadow-sm">
            <p className="mb-3 text-[11px] font-black tracking-widest text-brand-teal/50 uppercase">पुस्तके शोधा</p>
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="WhatsApp नंबर किंवा Email टाका..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="h-11 rounded-xl border-gray-200 bg-brand-cream pl-9 text-sm font-bold shadow-none focus:border-brand-teal focus:bg-white focus:ring-1 focus:ring-brand-teal focus-visible:ring-offset-0"
                />
              </div>
              <Button
                type="submit"
                disabled={loading || !query.trim()}
                className="h-11 shrink-0 rounded-xl bg-brand-teal px-5 text-xs font-black text-white shadow-md shadow-brand-teal/20 active:scale-95 disabled:opacity-50"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "शोध"}
              </Button>
            </form>
            <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
              <a href="tel:+918149319058" className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-bold text-brand-teal transition-all hover:bg-brand-teal/5 active:scale-95">
                <Phone className="h-3.5 w-3.5" />
                कॉल करा
              </a>
              <DownloadInstructions open={showInstructions} onOpenChange={setShowInstructions} />
              <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("नमस्कार, मला माझी पुस्तके डाऊनलोड करण्यास मदत हवी आहे.")}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-bold text-green-600 transition-all hover:bg-green-50 active:scale-95">
                <FaWhatsapp className="h-3.5 w-3.5" />
                मदत हवी?
              </a>
            </div>
          </div>
        </div>

        {/* Finalizing */}
        {isFinalizing && (
          <div className="animate-in fade-in slide-in-from-top-2 mb-5 duration-500">
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-brand-gold/20 bg-white p-6 text-center shadow-sm">
              <div className="relative">
                <div className="absolute inset-0 animate-ping rounded-full bg-brand-teal/15" />
                <CheckCircle2 className="relative h-12 w-12 text-brand-teal" />
              </div>
              <div>
                <h2 className="text-lg font-black text-brand-teal">खरेदी पूर्ण झाली!</h2>
                <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Finalizing Your Order...</p>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-brand-teal/10 bg-brand-cream px-4 py-1.5 text-[10px] font-bold text-brand-teal">
                <ShieldCheck className="h-3 w-3" />
                Secure Verification Successful
              </div>
            </div>
          </div>
        )}

        {/* Polling timed out */}
        {pollingTimedOut && (
          <div className="animate-in fade-in slide-in-from-top-2 mb-5 duration-500">
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-center">
              <ShieldCheck className="h-10 w-10 text-amber-500" />
              <div>
                <h2 className="font-black text-amber-800">पेमेंट पडताळणी प्रक्रियेत आहे</h2>
                <p className="mt-1 max-w-xs text-xs text-amber-700/80">तुमचे पेमेंट यशस्वी झाले असावे, पण सर्व्हर जोडणीस थोडा वेळ लागत आहे.</p>
              </div>
              <Button onClick={() => { setPollingTimedOut(false); performSearch(query); }} className="rounded-xl bg-amber-500 text-sm font-bold text-white hover:bg-amber-600 active:scale-95">
                <RefreshCw className="mr-2 h-4 w-4" />
                रिफ्रेश करा
              </Button>
            </div>
          </div>
        )}

        {/* Results */}
        <div className="space-y-3">
          {orders === null ? (
            <div className="flex flex-col items-center justify-center py-14 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-brand-gold/15 bg-white shadow-sm">
                <BookOpen className="h-8 w-8 text-brand-gold/60" />
              </div>
              <p className="font-black text-brand-teal">तुमची पुस्तके शोधा</p>
              <p className="mt-1 text-sm text-gray-400">वर तुमचा WhatsApp नंबर टाका</p>
            </div>
          ) : orders.length > 0 ? (
            <>
              <div className="flex items-center gap-2 px-1">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-gold" />
                <p className="text-xs font-black tracking-wide text-brand-teal/60 uppercase">{orders.length} ऑर्डर सापडल्या</p>
              </div>
              {orders.map((order) => (
                <div key={order.id} className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md">
                  {/* Order header */}
                  <div className="flex items-center justify-between border-b border-brand-cream bg-brand-cream/60 px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-teal/10">
                        <FileText className="h-3.5 w-3.5 text-brand-teal" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">खरेदी दिनांक</p>
                        <p className="text-xs font-black text-brand-teal">{format(new Date(order.date), "dd MMM yyyy")}</p>
                      </div>
                    </div>
                    <div className="rounded-lg border border-green-100 bg-green-50 px-2.5 py-1 text-[11px] font-black text-green-700">
                      ₹{order.amount} Paid
                    </div>
                  </div>

                  {/* Items */}
                  <div className="p-3 space-y-2">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex flex-col gap-3 rounded-xl border border-gray-100 bg-brand-cream/40 p-3 transition-colors hover:bg-brand-cream sm:flex-row sm:items-center sm:justify-between">
                        <div className="min-w-0 flex-1">
                          <h3 className="text-sm font-black leading-tight text-brand-teal">{item.title}</h3>
                          <div className="mt-1.5 flex flex-wrap gap-1.5">
                            {item.pages ? (
                              <span className="rounded border border-brand-gold/20 bg-brand-gold/8 px-1.5 py-0.5 text-[10px] font-bold text-brand-gold">{item.pages} पाने</span>
                            ) : null}
                            {item.isCombo && (
                              <span className="rounded border border-amber-100 bg-amber-50 px-1.5 py-0.5 text-[10px] font-bold text-amber-600">सर्व पुस्तके एकाच PDF मध्ये</span>
                            )}
                            {justPurchasedOrder?.ebookId === item.ebookId && (
                              <span className="animate-pulse rounded border border-green-100 bg-green-50 px-1.5 py-0.5 text-[10px] font-bold text-green-600">नवीन खरेदी</span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2 sm:shrink-0">
                          <Button asChild size="sm" variant="outline" className="h-9 flex-1 rounded-xl border-green-200 bg-green-50 text-green-700 hover:bg-green-100 active:scale-95 sm:h-8 sm:flex-initial">
                            <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`नमस्कार,\nहे माझे पुस्तक आहे: ${item.title}\nलिंक: ${item.url}\nकृपया हे सेव्ह राहू द्या.`)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5 px-3">
                              <FaWhatsapp className="h-3.5 w-3.5" />
                              <span className="text-[10px] font-black whitespace-nowrap">लिंक सेव्ह</span>
                            </a>
                          </Button>
                          <Button asChild size="sm" className="h-9 flex-1 rounded-xl bg-brand-teal text-white shadow-sm transition-all hover:bg-brand-teal/90 active:scale-95 sm:h-8 sm:flex-initial">
                            <a href={item.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5 px-3" onClick={() => setShowInstructions(true)}>
                              <Download className="h-3.5 w-3.5" />
                              <span className="text-[10px] font-black whitespace-nowrap">डाऊनलोड</span>
                            </a>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 py-10 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-red-100 bg-red-50">
                <BookOpen className="h-8 w-8 text-red-300" />
              </div>
              <div>
                <p className="font-black text-red-500">पुस्तके सापडली नाहीत</p>
                <p className="mt-1 text-xs text-gray-400">नंबर बरोबर असल्याची खात्री करा किंवा मदत घ्या.</p>
              </div>
              <Button variant="outline" className="rounded-xl border-dashed border-gray-300 text-xs text-gray-500 hover:border-brand-teal hover:text-brand-teal" onClick={() => window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`नमस्कार, मी आताच पुस्तक विकत घेतले पण 'माझी पुस्तके' मध्ये दिसत नाही. नंबर: ${query || "N/A"}`)}`, '_blank')}>
                मी पैसे भरले, पण पुस्तक दिसत नाही?
              </Button>
            </div>
          )}
        </div>

        {/* Recommended combos */}
        {orders !== null && orders.length > 0 && (
          <div className="mt-8 mb-2">
            <div className="mb-3 flex items-center gap-2 px-1">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-gold" />
              <h2 className="text-xs font-black tracking-widest text-brand-teal/50 uppercase">तुमच्यासाठी खास कॉम्बोस</h2>
            </div>
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
