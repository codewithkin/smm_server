-- CreateTable
CREATE TABLE "Checkout" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "itemCount" INTEGER NOT NULL,
    "items" JSONB NOT NULL,

    CONSTRAINT "Checkout_pkey" PRIMARY KEY ("id")
);
