"use client";

import { BookOpen, Smartphone, ShieldCheck, Download, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function BuyingGuideSection() {
  const steps = [
    {
      icon: BookOpen,
      title: "१. ई-बुक निवडा",
      desc: "तुमच्या गरजेनुसार ई-बुक अथवा कॉम्बो पॅक निवडा. 'आता खरेदी करा' या बटणावर टॅप करा.",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: Smartphone,
      title: "२. संपर्क तपशील द्या",
      desc: "नाव व व्हॉट्सॲप क्रमांक योग्यरित्या नोंदवा — त्याच क्रमांकावर ई-बुक पाठवले जाईल.",
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      icon: ShieldCheck,
      title: "३. पेमेंट करा",
      desc: "UPI, Google Pay, PhonePe किंवा डेबिट/क्रेडिट कार्डने सुरक्षितपणे रक्कम भरा.",
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      icon: Download,
      title: "४. PDF मिळवा",
      desc: "पेमेंट यशस्वी होताच PDF तुमच्या व्हॉट्सॲपवर येईल — ताबडतोब वाचनास सुरुवात करा.",
      color: "text-brand-gold",
      bg: "bg-amber-50",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white py-16 lg:py-24">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 opacity-5">
        <div className="h-64 w-64 rounded-full bg-brand-teal blur-3xl" />
      </div>
      <div className="absolute right-0 bottom-0 translate-x-1/2 translate-y-1/2 opacity-5">
        <div className="h-64 w-64 rounded-full bg-brand-gold blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
          <span className="mb-2 inline-block rounded-full bg-brand-teal/10 px-4 py-1.5 text-sm font-bold text-brand-teal">
            खरेदीची पद्धत
          </span>
          <h2 className="mb-4 text-3xl font-black text-brand-teal lg:text-4xl">
            तुमचे ई-बुक कसे मिळवाल?
          </h2>
          <p className="text-lg font-medium text-gray-600">
            चार पायऱ्यांमध्ये कायदेशीर ज्ञान तुमच्यापर्यंत
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative flex flex-col items-center text-center"
            >
              {/* Connector Line (Desktop) */}
              {index < steps.length - 1 && (
                <div className="absolute top-8 left-1/2 -z-10 hidden w-full -translate-y-1/2 lg:block">
                  <div className="h-0.5 w-full bg-gray-100" />
                </div>
              )}

              {/* Icon */}
              <div
                className={cn(
                  "mb-6 flex h-16 w-16 items-center justify-center rounded-2xl shadow-sm transition-transform duration-300 group-hover:scale-110",
                  step.bg,
                  step.color
                )}
              >
                <step.icon className="h-8 w-8" />
              </div>

              {/* Content */}
              <h3 className="mb-2 text-xl font-bold text-gray-900">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">
                {step.desc}
              </p>

              {/* Step Number Badge */}
              <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-xs font-bold text-white opacity-0 transition-opacity group-hover:opacity-100 lg:top-0 lg:right-1/4">
                {index + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Help Note */}
        <div className="mx-auto mt-12 max-w-3xl rounded-2xl bg-brand-teal/5 p-6 text-center lg:mt-16">
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-teal/10 text-brand-teal">
              <HelpCircle className="h-6 w-6" />
            </div>
            <div className="text-left">
              <h4 className="text-lg font-bold text-brand-teal">मदत हवी आहे का?</h4>
              <p className="text-sm font-medium text-gray-600">
                पेमेंट झाले पण PDF आला नाही? आम्ही लगेच मदत करू — खाली दिलेल्या क्रमांकावर व्हॉट्सॲप करा.
                <br className="hidden sm:block" />
                व्हॉट्सॲप करा: <span className="font-bold text-gray-900">+91 8149319058</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
