/*
  Warnings:

  - A unique constraint covering the columns `[alias]` on the table `product_category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `alias` to the `product_category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "product_category" ADD COLUMN     "alias" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "product_category_alias_key" ON "product_category"("alias");
