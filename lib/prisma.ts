import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";

// Force reload comment
const globalForPrisma = globalThis as unknown as {
  prismaDb: PrismaClient | undefined;
};

const createPrismaClient = () => {
  const connectionString = process.env.DATABASE_URL || process.env.NEXT_POSTGRES_URL || process.env.POSTGRES_URL;

  if (!connectionString) {
    if (process.env.NODE_ENV === "production" && !process.env.NEXT_PHASE) {
      console.warn("⚠️ Missing DATABASE_URL environment variable. Prisma might fail if queried.");
    }
    // Return standard client without pg adapter if during build or no DB string
    // @ts-expect-error - Fallback PrismaClient instantiation without adapter
    return new PrismaClient({ adapter: null });
  }

  const pool = new Pool({
    connectionString,
    // Enforce SSL for Neon (Strict), Disable for Localhost, Lenient for others in Prod
    ssl: connectionString.includes("neon.tech")
      ? { rejectUnauthorized: true }
      : (connectionString.includes("localhost") || connectionString.includes("127.0.0.1"))
        ? undefined
        : (process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : undefined),
    // Vercel serverless: 1 connection per Lambda instance. Neon PgBouncer handles multiplexing.
    // Multiple connections per instance double-pools against PgBouncer and causes connection explosion.
    max: 1,
    min: 0,
    idleTimeoutMillis: 10000, // Release back to pooler quickly
    connectionTimeoutMillis: 8000,
    allowExitOnIdle: true,
    maxUses: 7500,
    statement_timeout: 30000,
  });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
};

export const prisma_db = globalForPrisma.prismaDb ?? createPrismaClient();

// Cache in globalThis for all environments — prevents extra pool creation on Next.js
// hot reloads (dev) and across module re-evaluations in long-running serverless instances.
globalForPrisma.prismaDb = prisma_db;
