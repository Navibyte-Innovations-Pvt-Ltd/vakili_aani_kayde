import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Legal Resources & Guides | कायदेविषयक माहिती",
    description: "Read free legal guides and business articles in Marathi and English. कायद्याचे ज्ञान सोप्या भाषेत.",
};

const resources = [
    {
        title: "How to Start a Business in India? (मराठी)",
        description: "भारतात स्वतःचा व्यवसाय कसा सुरू करावा? कायदेशीर पूर्तता आणि नोंदणी प्रक्रियेबद्दल संपूर्ण माहिती.",
        href: "/resources/start-business-india-marathi",
        date: "January 3, 2026",
        readTime: "5 min read",
        tag: "Business Guide"
    },
    {
        title: "Right to Information (RTI) Act Guide",
        description: "माहिती अधिकार कायदा कसा वापरावा? अर्ज करण्याची ऑफलाईन आणि ऑनलाईन पद्धत. (RTI Online Maharashtra)",
        href: "/resources/rti-act-marathi",
        date: "January 3, 2026",
        readTime: "4 min read",
        tag: "Legal Rights"
    },
    {
        title: "Consumer Protection Rights (ग्राहक हक्क)",
        description: "तुमची फसवणूक झाली आहे का? ग्राहक मंचाकडे तक्रार कशी करावी? जागो ग्राहक जागो मोहीम.",
        href: "/resources/consumer-protection-rights",
        date: "January 3, 2026",
        readTime: "5 min read",
        tag: "Consumer Help"
    },
    {
        title: "Legal Notice Format (वकिली नोटीस)",
        description: "लीगल नोटीस कशी पाठवावी? चेक बाऊन्स, प्रॉपर्टी वाद आणि पैसे वसुलीसाठी कायदेशीर नोटीसचे महत्व.",
        href: "/resources/legal-notice-format",
        date: "January 3, 2026",
        readTime: "6 min read",
        tag: "Legal Process"
    },
    // Add more resources here in the future
];

export default function ResourcesPage() {
    return (
        <div className="container mx-auto max-w-5xl px-4 py-12">
            <div className="mb-12 text-center">
                <h1 className="mb-4 text-3xl font-bold text-teal-900 md:text-4xl">
                    Legal Resources & Guides
                </h1>
                <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                    महत्वाचे कायदे आणि व्यवसाय मार्गदर्शक माहिती सोप्या मराठी आणि इंग्रजी भाषेत.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {resources.map((resource) => (
                    <Link key={resource.href} href={resource.href} className="group block">
                        <article className="h-full overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-md">
                            <div className="p-6">
                                <div className="mb-4 flex items-center justify-between">
                                    <span className="rounded-full bg-teal-100 px-2.5 py-1 text-xs font-medium text-teal-800">
                                        {resource.tag}
                                    </span>
                                    <span className="text-xs text-muted-foreground">{resource.readTime}</span>
                                </div>
                                <h2 className="mb-3 text-xl font-bold transition-colors group-hover:text-teal-700">
                                    {resource.title}
                                </h2>
                                <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
                                    {resource.description}
                                </p>
                                <div className="flex items-center text-sm font-medium text-teal-600">
                                    Read More
                                    <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </article>
                    </Link>
                ))}
            </div>
        </div>
    );
}
