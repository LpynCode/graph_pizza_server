/*
  Warnings:

  - You are about to drop the column `characteristicSchemaId` on the `cart` table. All the data in the column will be lost.
  - You are about to drop the column `productSchemaId` on the `cart` table. All the data in the column will be lost.
  - Added the required column `characteristicId` to the `cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `cart` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "cart" DROP CONSTRAINT "cart_characteristicSchemaId_fkey";

-- DropForeignKey
ALTER TABLE "cart" DROP CONSTRAINT "cart_productSchemaId_fkey";

-- AlterTable
ALTER TABLE "cart" DROP COLUMN "characteristicSchemaId",
DROP COLUMN "productSchemaId",
ADD COLUMN     "characteristicId" INTEGER NOT NULL,
ADD COLUMN     "productId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_characteristicId_fkey" FOREIGN KEY ("characteristicId") REFERENCES "characteristics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
