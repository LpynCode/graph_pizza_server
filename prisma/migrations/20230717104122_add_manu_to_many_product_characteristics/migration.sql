/*
  Warnings:

  - You are about to drop the column `productId` on the `product_characteristics` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "product_characteristics" DROP CONSTRAINT "product_characteristics_productId_fkey";

-- AlterTable
ALTER TABLE "product_characteristics" DROP COLUMN "productId";

-- CreateTable
CREATE TABLE "characteristics" (
    "productId" INTEGER NOT NULL,
    "characteristicId" INTEGER NOT NULL,

    CONSTRAINT "characteristics_pkey" PRIMARY KEY ("productId","characteristicId")
);

-- AddForeignKey
ALTER TABLE "characteristics" ADD CONSTRAINT "characteristics_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "characteristics" ADD CONSTRAINT "characteristics_characteristicId_fkey" FOREIGN KEY ("characteristicId") REFERENCES "product_characteristics"("id") ON DELETE CASCADE ON UPDATE CASCADE;
