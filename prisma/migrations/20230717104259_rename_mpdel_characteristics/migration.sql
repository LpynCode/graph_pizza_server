/*
  Warnings:

  - The primary key for the `characteristics` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `characteristicId` on the `characteristics` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `characteristics` table. All the data in the column will be lost.
  - The primary key for the `product_characteristics` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `product_characteristics` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `product_characteristics` table. All the data in the column will be lost.
  - You are about to drop the column `sizeId` on the `product_characteristics` table. All the data in the column will be lost.
  - Added the required column `price` to the `characteristics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `characteristicId` to the `product_characteristics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `product_characteristics` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "characteristics" DROP CONSTRAINT "characteristics_characteristicId_fkey";

-- DropForeignKey
ALTER TABLE "characteristics" DROP CONSTRAINT "characteristics_productId_fkey";

-- DropForeignKey
ALTER TABLE "product_characteristics" DROP CONSTRAINT "product_characteristics_sizeId_fkey";

-- AlterTable
ALTER TABLE "characteristics" DROP CONSTRAINT "characteristics_pkey",
DROP COLUMN "characteristicId",
DROP COLUMN "productId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "price" INTEGER NOT NULL,
ADD COLUMN     "sizeId" INTEGER,
ADD CONSTRAINT "characteristics_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "product_characteristics" DROP CONSTRAINT "product_characteristics_pkey",
DROP COLUMN "id",
DROP COLUMN "price",
DROP COLUMN "sizeId",
ADD COLUMN     "characteristicId" INTEGER NOT NULL,
ADD COLUMN     "productId" INTEGER NOT NULL,
ADD CONSTRAINT "product_characteristics_pkey" PRIMARY KEY ("productId", "characteristicId");

-- AddForeignKey
ALTER TABLE "product_characteristics" ADD CONSTRAINT "product_characteristics_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_characteristics" ADD CONSTRAINT "product_characteristics_characteristicId_fkey" FOREIGN KEY ("characteristicId") REFERENCES "characteristics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "characteristics" ADD CONSTRAINT "characteristics_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "product_sizes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
