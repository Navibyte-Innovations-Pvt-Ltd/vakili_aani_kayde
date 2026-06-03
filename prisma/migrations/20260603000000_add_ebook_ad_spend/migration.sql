-- CreateTable
CREATE TABLE "ebook_ad_spend" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "ebookId" TEXT NOT NULL,
    "metaSpend" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "enteredOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "ebook_ad_spend_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ebook_ad_spend_date_idx" ON "ebook_ad_spend"("date");

-- CreateIndex
CREATE INDEX "ebook_ad_spend_ebookId_idx" ON "ebook_ad_spend"("ebookId");

-- CreateIndex
CREATE UNIQUE INDEX "ebook_ad_spend_date_ebookId_key" ON "ebook_ad_spend"("date", "ebookId");
