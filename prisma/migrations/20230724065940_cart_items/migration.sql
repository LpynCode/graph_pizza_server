/*
  Warnings:

  - You are about to drop the `cart` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "cart" DROP CONSTRAINT "cart_characteristicId_fkey";

-- DropForeignKey
ALTER TABLE "cart" DROP CONSTRAINT "cart_productId_fkey";

-- DropForeignKey
ALTER TABLE "cart" DROP CONSTRAINT "cart_userId_fkey";

-- DropTable
DROP TABLE "cart";

-- CreateTable
CREATE TABLE "cart_items" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "characteristicId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "cart_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cart_items_userId_key" ON "cart_items"("userId");

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_characteristicId_fkey" FOREIGN KEY ("characteristicId") REFERENCES "characteristics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
