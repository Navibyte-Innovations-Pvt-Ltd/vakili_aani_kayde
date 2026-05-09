"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { DialogContentWrapper, Ebook } from "@/components/global-search";
import { cn } from "@/lib/utils";

const POPULAR_TAGS = ["वारसा हक्क", "शेतकरी कायदा", "घर खरेदी", "ग्राहक हक्क"];

export function HeroSearch() {
    const [open, setOpen] = React.useState(false);
    const [ebooks, setEbooks] = React.useState<Ebook[]>([]);
    const [search, setSearch] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const router = useRouter();

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((v) => !v);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const fetchEbooks = React.useCallback(async (query: string) => {
        setIsLoading(true);
        try {
            const url = query ? `/api/search?q=${encodeURIComponent(query)}` : "/api/search";
            const res = await fetch(url);
            const data = await res.json();
            setEbooks(data);
        } catch {
            // silent
        } finally {
            setIsLoading(false);
        }
    }, []);

    React.useEffect(() => {
        if (!open) return;
        const t = setTimeout(() => fetchEbooks(search), 300);
        return () => clearTimeout(t);
    }, [search, open, fetchEbooks]);

    const runCommand = React.useCallback((command: () => void) => {
        setOpen(false);
        setSearch("");
        command();
    }, []);

    function openWithTag(tag: string) {
        setSearch(tag);
        setOpen(true);
    }

    return (
        <div className="mx-auto mb-8 max-w-lg">
            {/* Trigger */}
            <div className="group relative">
                <div className="absolute -inset-0.5 rounded-xl bg-linear-to-r from-brand-gold/20 to-brand-teal/10 opacity-0 blur transition duration-300 group-hover:opacity-100" />
                <button
                    onClick={() => setOpen(true)}
                    className={cn(
                        "relative flex h-13 w-full items-center gap-3 rounded-xl border-2 border-gray-200 bg-white px-4 text-sm text-muted-foreground shadow-sm transition-all duration-200 hover:border-brand-gold/50",
                    )}
                >
                    <Search className="h-4 w-4 shrink-0 text-gray-400" />
                    <span className="flex-1 text-left">
                        <span className="hidden lg:inline">पुस्तके शोधा (Search books)...</span>
                        <span className="inline lg:hidden">शोधा (Search)...</span>
                    </span>
                    <kbd className="pointer-events-none hidden h-5 items-center gap-1 rounded border bg-gray-50 px-1.5 font-mono text-[10px] font-medium opacity-60 select-none md:flex">
                        <span className="text-xs">⌘</span>K
                    </kbd>
                </button>
            </div>

            {/* Popular tags */}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                <span className="text-[10px] font-bold tracking-wider text-brand-gold uppercase">लोकप्रिय:</span>
                {POPULAR_TAGS.map((tag) => (
                    <button
                        key={tag}
                        onClick={() => openWithTag(tag)}
                        className="rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1 text-[10px] font-semibold text-slate-600 transition-colors hover:border-brand-gold/40 hover:bg-brand-gold-light hover:text-brand-teal md:text-xs"
                    >
                        {tag}
                    </button>
                ))}
            </div>

            <DialogContentWrapper
                open={open}
                setOpen={(v) => { setOpen(v); if (!v) setSearch(""); }}
                search={search}
                setSearch={setSearch}
                isLoading={isLoading}
                filteredEbooks={ebooks}
                runCommand={runCommand}
                router={router}
            />
        </div>
    );
}
