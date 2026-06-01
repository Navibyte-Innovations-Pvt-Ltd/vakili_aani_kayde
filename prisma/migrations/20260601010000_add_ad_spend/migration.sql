-- CreateEnum
CREATE TYPE "AdPlatform" AS ENUM ('META', 'GOOGLE', 'OTHER');

-- CreateTable
CREATE TABLE "AdSpend" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "platform" "AdPlatform" NOT NULL DEFAULT 'META',
    "amount" DOUBLE PRECISION NOT NULL,
    "campaign" TEXT,
    "clicks" INTEGER,
    "impressions" INTEGER,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "AdSpend_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AdSpend_date_idx" ON "AdSpend"("date");

-- CreateIndex
CREATE UNIQUE INDEX "AdSpend_date_platform_key" ON "AdSpend"("date", "platform");
