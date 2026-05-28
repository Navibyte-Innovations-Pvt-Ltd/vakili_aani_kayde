"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Send, FileText, MessageSquare, CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Template {
    id: string;
    label: string;
    description: string;
    hasMedia: boolean;
    params: string[];
}

const TEMPLATES: Template[] = [
    {
        id: "payment_sccess_pdf_v2",
        label: "Payment Success + PDF",
        description: "Sent after purchase — delivers PDF as document",
        hasMedia: true,
        params: [],
    },
    {
        id: "pending_folloup_mr_v1",
        label: "Pending Payment Follow-up",
        description: "Reminder for unpaid orders",
        hasMedia: false,
        params: ["Customer name", "Book title", "Payment link"],
    },
];

const SAMPLE_PDF = "https://www.w3.org/WAI/WCAG21/Techniques/pdf/PDF1.pdf";

export default function WhatsAppTestPage() {
    const [phone, setPhone] = useState("");
    const [sending, setSending] = useState<string | null>(null);
    const [sent, setSent] = useState<Set<string>>(new Set());
    const [paramValues, setParamValues] = useState<Record<string, string[]>>({});

    const handleSend = async (template: Template) => {
        if (!phone.trim()) {
            toast.error("Enter phone number first");
            return;
        }

        setSending(template.id);
        const params = paramValues[template.id] ?? template.params.map(() => "");

        try {
            const res = await fetch("/api/admin/whatsapp-test", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    templateId: template.id,
                    phone: phone.trim(),
                    params,
                    mediaUrl: template.hasMedia ? SAMPLE_PDF : undefined,
                    mediaFilename: template.hasMedia ? "SampleBook.pdf" : undefined,
                }),
            });

            if (!res.ok) throw new Error(await res.text());
            toast.success(`Sent "${template.label}" to ${phone}`);
            setSent((prev) => new Set([...prev, template.id]));
        } catch (err) {
            toast.error(`Failed: ${err instanceof Error ? err.message : "Unknown error"}`);
        } finally {
            setSending(null);
        }
    };

    const updateParam = (templateId: string, index: number, value: string) => {
        setParamValues((prev) => {
            const arr = [...(prev[templateId] ?? [])];
            arr[index] = value;
            return { ...prev, [templateId]: arr };
        });
    };

    return (
        <div className="mx-auto max-w-3xl space-y-6">
            <div className="border-b border-gray-100 pb-4">
                <h1 className="text-2xl font-bold text-[#0A2342]">WhatsApp Templates</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Test AiSensy templates. Messages go to the phone number you enter below.
                </p>
            </div>

            {/* Phone Input */}
            <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-50">
                    <MessageSquare className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                    <p className="mb-1 text-xs font-bold text-gray-500 uppercase tracking-wider">Test phone number</p>
                    <Input
                        placeholder="919876543210 (with country code)"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="h-9 border-gray-200 font-mono text-sm"
                    />
                </div>
            </div>

            {/* Templates */}
            <div className="space-y-3">
                {TEMPLATES.map((template) => {
                    const isSending = sending === template.id;
                    const wasSent = sent.has(template.id);

                    return (
                        <div
                            key={template.id}
                            className={cn(
                                "rounded-2xl border bg-white p-4 transition-all",
                                wasSent ? "border-green-200 bg-green-50/30" : "border-gray-100"
                            )}
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-start gap-3">
                                    <div className={cn(
                                        "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl",
                                        template.hasMedia ? "bg-blue-50" : "bg-orange-50"
                                    )}>
                                        {template.hasMedia
                                            ? <FileText className="h-4 w-4 text-blue-600" />
                                            : <MessageSquare className="h-4 w-4 text-orange-600" />
                                        }
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm font-bold text-gray-900">{template.label}</p>
                                            <Badge variant="outline" className="border-0 bg-gray-100 px-1.5 py-0 text-[10px] font-mono text-gray-500">
                                                {template.id}
                                            </Badge>
                                            {wasSent && (
                                                <Badge variant="outline" className="border-0 bg-green-100 px-1.5 py-0 text-[10px] font-bold text-green-700">
                                                    <CheckCircle2 className="mr-1 h-2.5 w-2.5" />
                                                    Sent
                                                </Badge>
                                            )}
                                        </div>
                                        <p className="mt-0.5 text-xs text-muted-foreground">{template.description}</p>
                                        {template.hasMedia && (
                                            <p className="mt-0.5 text-[10px] text-blue-500">
                                                Uses sample PDF for testing
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <Button
                                    size="sm"
                                    onClick={() => handleSend(template)}
                                    disabled={isSending || !phone.trim()}
                                    className="shrink-0 gap-1.5 rounded-xl bg-[#0A2342] px-4 text-xs hover:bg-[#0A2342]/90"
                                >
                                    {isSending
                                        ? <><Loader2 className="h-3 w-3 animate-spin" />Sending...</>
                                        : <><Send className="h-3 w-3" />Send Test</>
                                    }
                                </Button>
                            </div>

                            {/* Param inputs */}
                            {template.params.length > 0 && (
                                <div className="mt-3 grid grid-cols-1 gap-2 border-t border-gray-100 pt-3 sm:grid-cols-3">
                                    {template.params.map((label, i) => (
                                        <div key={i}>
                                            <p className="mb-1 text-[10px] font-bold text-gray-400 uppercase">
                                                {`{{${i + 1}}}`} {label}
                                            </p>
                                            <Input
                                                placeholder={label}
                                                value={(paramValues[template.id] ?? [])[i] ?? ""}
                                                onChange={(e) => updateParam(template.id, i, e.target.value)}
                                                className="h-8 text-xs"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <p className="text-center text-xs text-muted-foreground">
                All messages sent via AiSensy · Template <span className="font-mono">payment_sccess_pdf_v2</span>
            </p>
        </div>
    );
}
