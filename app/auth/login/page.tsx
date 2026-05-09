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
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-brand-teal px-12 py-10">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gold">
            <Scale className="h-5 w-5 text-brand-teal" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand-gold/70">वकिली आणि कायदे</p>
            <p className="text-sm font-black text-white">Vakili Aani Kayde</p>
          </div>
        </div>

        {/* Hero text */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-gold/20 bg-brand-gold/10 px-3 py-1.5">
            <BookOpen className="h-3.5 w-3.5 text-brand-gold" />
            <span className="text-xs font-bold text-brand-gold">Legal Knowledge in Marathi</span>
          </div>
          <h1 className="text-4xl font-black leading-tight text-white">
            कायद्याचे ज्ञान<br />
            <span className="text-brand-gold">सोप्या भाषेत</span>
          </h1>
          <p className="text-base leading-relaxed text-white/60">
            Property law, consumer rights, cyber fraud — simplified legal guides for every Marathi-speaking citizen.
          </p>

          {/* Stats */}
          <div className="flex gap-8 pt-4">
            {[
              { label: "ई-बुक्स", value: "20+" },
              { label: "वाचक", value: "5K+" },
              { label: "विषय", value: "10+" },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-2xl font-black text-brand-gold">{value}</p>
                <p className="text-xs text-white/50">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <p className="text-xs text-white/30">
          © 2025 Vakili Aani Kayde · Pune, Maharashtra
        </p>
      </div>

      {/* Right panel — form */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
        {/* Mobile logo */}
        <div className="mb-8 flex items-center gap-2 lg:hidden">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-teal">
            <Scale className="h-4.5 w-4.5 text-brand-gold" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-brand-teal/50">वकिली आणि कायदे</p>
            <p className="text-sm font-black text-brand-teal">Vakili Aani Kayde</p>
          </div>
        </div>

        <div className="w-full max-w-sm">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-black text-brand-teal">Welcome back</h2>
            <p className="mt-1 text-sm text-gray-400">
              {isDev ? (
                <span className="inline-flex items-center gap-1 rounded-md bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-700">
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
                  <label className="text-xs font-bold uppercase tracking-wide text-gray-500">
                    Select User <span className="text-red-500">*</span>
                  </label>
                  <Select
                    value={selectedEmail}
                    onValueChange={(val) => methods.setValue("email", val)}
                  >
                    <SelectTrigger className="h-11 w-full rounded-xl border-gray-200 bg-white">
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
                <div className="flex items-center justify-between">
                  <InputField
                    name="rememberMe"
                    type="checkbox"
                    label="Remember me"
                    className="flex-row items-center gap-2 space-y-0"
                  />
                  <Link
                    href="/auth/forgot-password"
                    className="text-xs font-bold text-brand-teal hover:text-brand-gold transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-teal text-sm font-black text-white transition-all active:scale-[0.98] disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </Form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-100" />
            <span className="text-xs text-gray-300">OR</span>
            <div className="h-px flex-1 bg-gray-100" />
          </div>

          {/* Sign up */}
          <p className="text-center text-sm text-gray-400">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/signup"
              className="font-bold text-brand-teal hover:text-brand-gold transition-colors"
            >
              Create account
            </Link>
          </p>

          {/* Browse without login */}
          <div className="mt-4 text-center">
            <Link
              href="/ebooks"
              className="text-xs text-gray-300 hover:text-brand-teal transition-colors"
            >
              Browse ebooks without signing in →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
