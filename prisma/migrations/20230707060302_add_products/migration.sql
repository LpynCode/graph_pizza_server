/*
  Warnings:

  - You are about to drop the `pizza` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pizza_ingredients` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `ingredient` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "pizza_ingredients" DROP CONSTRAINT "pizza_ingredients_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "pizza_ingredients" DROP CONSTRAINT "pizza_ingredients_pizzaId_fkey";

-- DropTable
DROP TABLE "pizza";

-- DropTable
DROP TABLE "pizza_ingredients";

-- CreateTable
CREATE TABLE "product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "product_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_ingredients" (
    "productId" INTEGER NOT NULL,
    "ingredientId" INTEGER NOT NULL,

    CONSTRAINT "product_ingredients_pkey" PRIMARY KEY ("productId","ingredientId")
);

-- CreateIndex
CREATE UNIQUE INDEX "product_name_key" ON "product"("name");

-- CreateIndex
CREATE UNIQUE INDEX "product_category_name_key" ON "product_category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ingredient_name_key" ON "ingredient"("name");

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "product_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_ingredients" ADD CONSTRAINT "product_ingredients_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_ingredients" ADD CONSTRAINT "product_ingredients_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
