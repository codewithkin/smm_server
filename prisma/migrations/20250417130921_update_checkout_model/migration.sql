/*
  Warnings:

  - You are about to drop the column `itemCount` on the `Checkout` table. All the data in the column will be lost.
  - You are about to drop the column `items` on the `Checkout` table. All the data in the column will be lost.
  - You are about to drop the column `totalAmount` on the `Checkout` table. All the data in the column will be lost.
  - Added the required column `total` to the `Checkout` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Checkout" DROP COLUMN "itemCount",
DROP COLUMN "items",
DROP COLUMN "totalAmount",
ADD COLUMN     "total" DOUBLE PRECISION NOT NULL;

-- CreateTable
CREATE TABLE "CheckoutItem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "productId" TEXT NOT NULL,
    "checkoutId" TEXT NOT NULL,

    CONSTRAINT "CheckoutItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CheckoutItem" ADD CONSTRAINT "CheckoutItem_checkoutId_fkey" FOREIGN KEY ("checkoutId") REFERENCES "Checkout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
