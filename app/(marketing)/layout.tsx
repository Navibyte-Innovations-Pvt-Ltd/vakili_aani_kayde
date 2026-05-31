import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BottomNav } from "@/components/bottom-nav";
import { WhatsAppFAB } from "@/components/whatsapp-fab";
import { IABManager } from "@/components/iab-manager";
import { NavLanguageProvider } from "@/components/nav-language-context";
import { cookies } from "next/headers";
import { LANGUAGE_COOKIE, coerceLanguage } from "@/lib/languages";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialLanguage = coerceLanguage((await cookies()).get(LANGUAGE_COOKIE)?.value);
  return (
    <NavLanguageProvider initialLanguage={initialLanguage}>
      <div className="relative flex min-h-screen flex-col pb-20 md:pb-0">
        <IABManager />
        <Navbar />
        <main className="flex-1 pb-4">{children}</main>
        <Footer />
        <BottomNav />
        <WhatsAppFAB />
      </div>
    </NavLanguageProvider>
  );
}
