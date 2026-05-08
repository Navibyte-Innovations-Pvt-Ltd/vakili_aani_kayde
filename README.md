# Vakili Aani Kayde — वकिली आणि कायदे

> Live: [vakilianikayde.in](https://www.vakilianikayde.in)

Marathi-first legal ebook marketplace. Customers buy, pay via Razorpay, and instantly receive watermarked PDFs on WhatsApp + email. Admin dashboard for ebook management, order tracking, and analytics.

---

## Features

- **Storefront** — Ebook catalog with language filters (Marathi / Hindi / English), combo bundles, sale pricing
- **Checkout** — Razorpay payment (modal on desktop, redirect on mobile), 2-step form (name + phone)
- **Instant Fulfillment** — Per-customer PDF watermark → S3 presigned URL → email + WhatsApp delivery
- **My Books** — JWT-gated download page for purchased ebooks
- **Admin Dashboard** — Ebook CRUD, order management, user management, analytics (Recharts), bulk push notifications
- **Auth** — NextAuth v5 with email/password + OTP verification, password reset, role-based access (ADMIN/USER)
- **AI Editor** — Gemini AI-assisted Notion-style rich text editor for ebook descriptions

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Database | PostgreSQL (Neon) + Prisma ORM |
| Auth | NextAuth v5 (Auth.js) |
| Payments | Razorpay |
| Storage | AWS S3 (ap-south-1) |
| Email | Nodemailer (SMTP) |
| WhatsApp | Twilio |
| Push | Web Push (VAPID) |
| AI | Google Gemini |
| Components | shadcn/ui (Radix UI) |
| Package mgr | Bun |

---

## Project Structure

```
app/
  (auth)/          # Login, signup, OTP, forgot/reset password
  (marketing)/     # Home, ebooks catalog, combos, about, contact, policies
  dashboard/       # Admin-only dashboard
  api/             # Payment webhook, download, auth, notifications
components/
  ui/              # shadcn/ui (do not modify directly)
  marketing/       # Ebook cards, catalog, sections
  AppInputFields/  # Unified form input system
lib/               # auth, prisma, s3, email, whatsapp, pdf-watermark, rate-limit
prisma/            # Schema + migrations
```

---

## Getting Started

### Prerequisites

- Bun (package manager)
- PostgreSQL database (Neon recommended)
- Razorpay account
- AWS S3 bucket
- Twilio account (WhatsApp)
- Google Gemini API key
- SMTP credentials

### Install & Run

```bash
bun install

# Set up environment variables
cp .env.example .env.local
# Fill in all values

# Apply DB migrations
bun run prisma:migrate

# Start dev server (port 2222)
bun run dev
```

### Commands

```bash
bun run dev            # Dev server with Turbopack on :2222
bun run build          # Production build + generate sitemap
bun run validate       # ESLint + TypeScript check (run before committing)
bun run lint           # ESLint only

bun run prisma:migrate   # Create and apply new migration
bun run prisma:deploy    # Apply migrations in production
bun run prisma:studio    # Prisma Studio GUI
bun run prisma:reset     # Reset database (destructive)
```

---

## Environment Variables

```env
# Database (Neon PostgreSQL)
NEXT_POSTGRES_URL="postgresql://user:pass@host/db?sslmode=require"

# NextAuth
AUTH_SECRET="..."
NEXTAUTH_URL="http://localhost:2222"

# Admin auto-provisioning
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="..."

# Razorpay
RAZORPAY_KEY_ID="rzp_..."
RAZORPAY_KEY_SECRET="..."
NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_..."

# AWS S3
AWS_REGION="ap-south-1"
AWS_ACCESS_KEY_ID="..."
AWS_SECRET_ACCESS_KEY="..."
S3_BUCKET_NAME="nirmantestbucket"

# Email (SMTP)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="465"
SMTP_USER="..."
SMTP_PASSWORD="..."

# Twilio WhatsApp
TWILIO_ACCOUNT_SID="..."
TWILIO_AUTH_TOKEN="..."
TWILIO_WHATSAPP_FROM="whatsapp:+14155238886"

# Web Push (VAPID)
NEXT_PUBLIC_VAPID_PUBLIC_KEY="..."
VAPID_PRIVATE_KEY="..."

# Google Gemini AI
NEXT_GEMINI_API_KEY="..."

# App URL
NEXT_PUBLIC_APP_URL="https://www.vakilianikayde.in"
```

---

## Deployment

Deployed on **Vercel** with **Neon** PostgreSQL.

```bash
# Apply migrations to production
NEXT_POSTGRES_URL="<neon-url>" bunx prisma migrate deploy
```

Set all env vars in Vercel project settings. `NEXT_POSTGRES_URL` is used (not `DATABASE_URL`) — configured in `prisma.config.ts`.

---

Built for Pune, Maharashtra · Digital ebooks for educational purposes — not legal advice.
