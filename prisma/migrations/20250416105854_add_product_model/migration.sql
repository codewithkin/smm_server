-- CreateEnum
CREATE TYPE "Condition" AS ENUM ('New', 'Refurbished');

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "discountPrice" DOUBLE PRECISION,
    "inStock" INTEGER NOT NULL,
    "images" TEXT[],
    "storage" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "network" TEXT NOT NULL,
    "simType" TEXT NOT NULL,
    "condition" "Condition" NOT NULL,
    "isFeatured" BOOLEAN DEFAULT false,
    "isNewArrival" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");
