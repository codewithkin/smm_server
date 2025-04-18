-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "spent" INTEGER DEFAULT 0,
    "customerSince" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "lastPurchase" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "purchases" JSONB[],

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);
