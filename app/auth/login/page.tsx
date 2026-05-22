"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Scale, ArrowRight, BookOpen } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form } from "@/components/ui/form";
import InputField from "@/components/AppInputFields/InputField";
import toast from "react-hot-toast";

const isDev = process.env.NODE_ENV === "development";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface DevUser {
  id: string;
  email: string;
  name: string | null;
  role: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [devUsers, setDevUsers] = useState<DevUser[]>([]);

  const methods = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "dev",
      rememberMe: true,
    },
  });

  const selectedEmail = useWatch({ control: methods.control, name: "email" });

  useEffect(() => {
    if (!isDev) return;
    fetch("/api/dev/users")
      .then((r) => r.json())
      .then((users: DevUser[]) => {
        setDevUsers(users);
        if (users.length > 0) {
          methods.setValue("email", users[0].email);
        }
      })
      .catch(() => {});
  }, [methods]);

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        if (result.error.includes("verify")) {
          toast.error("Please verify your email before logging in");
          router.push(`/auth/verify-otp?email=${encodeURIComponent(data.email)}`);
        } else {
          toast.error("Invalid email or password");
        }
      } else if (result?.ok) {
        toast.success("Successfully logged in!");
        router.refresh();
        setTimeout(() => router.push("/dashboard"), 800);
        return;
      }
    } catch {
      toast.error("An error occurred. Please try again.");
    }
    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen bg-brand-cream">
      {/* Left panel — desktop only */}
      <div className="relative hidden overflow-hidden bg-brand-teal px-12 py-10 lg:flex lg:w-1/2 lg:flex-col lg:justify-between">
        {/* Decorative gradient orbs */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-brand-gold/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-brand-gold/5 blur-3xl" />
        {/* Subtle grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-4"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Logo */}
        <div className="relative flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gold shadow-lg shadow-brand-gold/20">
            <Scale className="h-5 w-5 text-brand-teal" />
          </div>
          <div>
            <p className="text-xs font-bold tracking-widest text-brand-gold/70 uppercase">वकिली आणि कायदे</p>
            <p className="text-sm font-black text-white">Vakili Aani Kayde</p>
          </div>
        </div>

        {/* Hero text */}
        <div className="relative space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-gold/20 bg-brand-gold/10 px-3 py-1.5 backdrop-blur-sm">
            <BookOpen className="h-3.5 w-3.5 text-brand-gold" />
            <span className="text-xs font-bold text-brand-gold">Legal Knowledge in Marathi</span>
          </div>
          <h1 className="text-4xl leading-tight font-black text-white xl:text-5xl">
            कायद्याचे ज्ञान<br />
            <span className="text-brand-gold">सोप्या भाषेत</span>
          </h1>
          <p className="max-w-md text-base leading-relaxed text-white/60">
            Property law, consumer rights, cyber fraud — simplified legal guides for every Marathi-speaking citizen.
          </p>

          {/* Stats */}
          <div className="flex gap-8 pt-4">
            {[
              { label: "ई-बुक्स", value: "20+" },
              { label: "वाचक", value: "5K+" },
              { label: "विषय", value: "10+" },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-2xl border border-white/5 bg-white/3 px-4 py-3 backdrop-blur-sm">
                <p className="text-2xl font-black text-brand-gold">{value}</p>
                <p className="text-xs text-white/50">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <p className="relative text-xs text-white/30">
          © {new Date().getFullYear()} Vakili Aani Kayde
        </p>
      </div>

      {/* Right panel — form */}
      <div className="relative flex flex-1 flex-col items-center justify-center px-6 py-12">
        {/* Soft background accents */}
        <div className="pointer-events-none absolute -top-20 right-0 h-72 w-72 rounded-full bg-brand-teal/4 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-brand-gold/6 blur-3xl" />

        {/* Mobile logo */}
        <div className="relative mb-8 flex items-center gap-2 lg:hidden">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-teal">
            <Scale className="h-4.5 w-4.5 text-brand-gold" />
          </div>
          <div>
            <p className="text-[10px] font-bold tracking-widest text-brand-teal/50 uppercase">वकिली आणि कायदे</p>
            <p className="text-sm font-black text-brand-teal">Vakili Aani Kayde</p>
          </div>
        </div>

        <div className="relative w-full max-w-sm rounded-3xl border border-gray-100 bg-white/80 p-8 shadow-xl shadow-brand-teal/5 backdrop-blur-sm sm:p-9">
          {/* Header */}
          <div className="mb-7">
            <h2 className="text-2xl font-black text-brand-teal">Welcome back</h2>
            <p className="mt-2 text-sm text-gray-400">
              {isDev ? (
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700">
                  ⚠ Dev mode — password bypass active
                </span>
              ) : (
                "Sign in to access your ebooks and orders."
              )}
            </p>
          </div>

          <Form {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
              {isDev ? (
                <div className="space-y-1.5">
                  <label className="text-xs font-bold tracking-wide text-gray-500 uppercase">
                    Select User <span className="text-red-500">*</span>
                  </label>
                  <Select
                    value={selectedEmail}
                    onValueChange={(val) => methods.setValue("email", val)}
                  >
                    <SelectTrigger className="h-11 w-full rounded-xl border-2 border-gray-200 bg-white shadow-sm transition-colors hover:border-brand-teal/40 focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/15">
                      <SelectValue placeholder="Pick a user..." />
                    </SelectTrigger>
                    <SelectContent>
                      {devUsers.map((u) => (
                        <SelectItem key={u.id} value={u.email}>
                          <span className="font-medium">{u.name ?? u.email}</span>
                          <span className="ml-2 text-xs text-muted-foreground">
                            {u.email} · {u.role}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ) : (
                <InputField
                  name="email"
                  label="Email Address"
                  placeholder="name@example.com"
                  type="email"
                  required
                />
              )}

              <InputField
                name="password"
                label="Password"
                placeholder={isDev ? "Any value works" : "Enter your password"}
                type="password"
                required
              />

              {!isDev && (
                <InputField
                  name="rememberMe"
                  type="checkbox"
                  label="Remember me"
                  className="flex-row items-center gap-2 space-y-0"
                />
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="group mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-teal text-sm font-black text-white shadow-lg shadow-brand-teal/20 transition-all hover:bg-brand-teal/90 hover:shadow-brand-teal/30 active:scale-[0.98] disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </form>
          </Form>

          {/* Browse without login */}
          <div className="mt-7 border-t border-gray-100 pt-5 text-center">
            <Link
              href="/ebooks"
              className="text-xs font-medium text-gray-400 transition-colors hover:text-brand-teal"
            >
              Browse ebooks without signing in →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
