/*
  Warnings:

  - You are about to drop the column `cartItemsId` on the `characteristics` table. All the data in the column will be lost.
  - You are about to drop the column `cartItemsId` on the `product` table. All the data in the column will be lost.
  - Added the required column `characteristicSchemaId` to the `cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productSchemaId` to the `cart` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "characteristics" DROP CONSTRAINT "characteristics_cartItemsId_fkey";

-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_cartItemsId_fkey";

-- AlterTable
ALTER TABLE "cart" ADD COLUMN     "characteristicSchemaId" INTEGER NOT NULL,
ADD COLUMN     "productSchemaId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "characteristics" DROP COLUMN "cartItemsId";

-- AlterTable
ALTER TABLE "product" DROP COLUMN "cartItemsId";

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_characteristicSchemaId_fkey" FOREIGN KEY ("characteristicSchemaId") REFERENCES "characteristics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_productSchemaId_fkey" FOREIGN KEY ("productSchemaId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
