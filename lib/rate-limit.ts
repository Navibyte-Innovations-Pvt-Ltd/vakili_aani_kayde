import { prisma_db } from "./prisma";

export type RateLimitAction = "resend-otp" | "forgot-password" | "signup" | "create-order" | "lead-submit" | "order-lookup" | "send-payment-link";

interface RateLimitConfig {
  maxAttempts: number;
  windowMinutes: number;
}

const rateLimitConfigs: Record<RateLimitAction, RateLimitConfig> = {
  "resend-otp": {
    maxAttempts: 1,
    windowMinutes: 1,
  },
  "forgot-password": {
    maxAttempts: 3,
    windowMinutes: 60,
  },
  "signup": {
    maxAttempts: 5,
    windowMinutes: 60,
  },
  "create-order": {
    maxAttempts: 20,
    windowMinutes: 60,
  },
  "lead-submit": {
    maxAttempts: 3,
    windowMinutes: 60,
  },
  "order-lookup": {
    maxAttempts: 50,
    windowMinutes: 60,
  },
  "send-payment-link": {
    maxAttempts: 5,
    windowMinutes: 1440,
  },
};

type RateLimitRow = {
  id: string;
  count: number;
  resetAt: Date;
};

/**
 * Atomic upsert via ON CONFLICT DO UPDATE — eliminates the read-then-write race
 * that caused deadlocks under concurrent load with the old findUnique → create/update pattern.
 */
async function upsertRateLimit(
  identifier: string,
  action: string,
  resetAt: Date,
): Promise<RateLimitRow[]> {
  return prisma_db.$queryRaw<RateLimitRow[]>`
    INSERT INTO "RateLimit" (id, identifier, action, count, "resetAt", "updatedAt")
    VALUES (gen_random_uuid(), ${identifier}, ${action}, 1, ${resetAt}, NOW())
    ON CONFLICT (identifier, action) DO UPDATE
    SET
      count   = CASE WHEN "RateLimit"."resetAt" <= NOW() THEN 1 ELSE "RateLimit".count + 1 END,
      "resetAt" = CASE WHEN "RateLimit"."resetAt" <= NOW() THEN ${resetAt} ELSE "RateLimit"."resetAt" END,
      "updatedAt" = NOW()
    RETURNING id, count, "resetAt"
  `;
}

export async function checkRateLimit(
  identifier: string,
  action: RateLimitAction
): Promise<{ isAllowed: boolean; retryAfter?: Date }> {
  const config = rateLimitConfigs[action];
  const resetAt = new Date(Date.now() + config.windowMinutes * 60 * 1000);

  try {
    const rows = await upsertRateLimit(identifier, action, resetAt);
    const row = rows[0];

    if (!row) return { isAllowed: true };

    if (row.count > config.maxAttempts) {
      return { isAllowed: false, retryAfter: row.resetAt };
    }

    return { isAllowed: true };
  } catch (error) {
    console.error("Error checking rate limit:", error);
    return { isAllowed: true };
  }
}
