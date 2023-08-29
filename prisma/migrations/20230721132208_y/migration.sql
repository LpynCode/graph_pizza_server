/*
  Warnings:

  - You are about to drop the `characteristic_cart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_cart` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "characteristic_cart" DROP CONSTRAINT "characteristic_cart_cartId_fkey";

-- DropForeignKey
ALTER TABLE "characteristic_cart" DROP CONSTRAINT "characteristic_cart_characteristicId_fkey";

-- DropForeignKey
ALTER TABLE "product_cart" DROP CONSTRAINT "product_cart_cartId_fkey";

-- DropForeignKey
ALTER TABLE "product_cart" DROP CONSTRAINT "product_cart_productId_fkey";

-- AlterTable
ALTER TABLE "characteristics" ADD COLUMN     "cartItemsId" INTEGER;

-- AlterTable
ALTER TABLE "product" ADD COLUMN     "cartItemsId" INTEGER;

-- DropTable
DROP TABLE "characteristic_cart";

-- DropTable
DROP TABLE "product_cart";

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_cartItemsId_fkey" FOREIGN KEY ("cartItemsId") REFERENCES "cart"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "characteristics" ADD CONSTRAINT "characteristics_cartItemsId_fkey" FOREIGN KEY ("cartItemsId") REFERENCES "cart"("id") ON DELETE SET NULL ON UPDATE CASCADE;
