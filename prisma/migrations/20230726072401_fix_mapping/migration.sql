/*
  Warnings:

  - You are about to drop the `CartItemOnIngredientsToAddSchema` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `IngredientsToAddSchema` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CartItemOnIngredientsToAddSchema" DROP CONSTRAINT "CartItemOnIngredientsToAddSchema_cartItemId_fkey";

-- DropForeignKey
ALTER TABLE "CartItemOnIngredientsToAddSchema" DROP CONSTRAINT "CartItemOnIngredientsToAddSchema_ingredientsToAddId_fkey";

-- DropForeignKey
ALTER TABLE "IngredientsToAddSchema" DROP CONSTRAINT "IngredientsToAddSchema_ingredientId_fkey";

-- DropTable
DROP TABLE "CartItemOnIngredientsToAddSchema";

-- DropTable
DROP TABLE "IngredientsToAddSchema";

-- CreateTable
CREATE TABLE "ingredients_to_add" (
    "id" SERIAL NOT NULL,
    "price" INTEGER NOT NULL,
    "ingredientId" INTEGER NOT NULL,

    CONSTRAINT "ingredients_to_add_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cart_item_ingredients_to_add" (
    "cartItemId" INTEGER NOT NULL,
    "ingredientsToAddId" INTEGER NOT NULL,

    CONSTRAINT "cart_item_ingredients_to_add_pkey" PRIMARY KEY ("cartItemId","ingredientsToAddId")
);

-- CreateIndex
CREATE UNIQUE INDEX "ingredients_to_add_ingredientId_key" ON "ingredients_to_add"("ingredientId");

-- AddForeignKey
ALTER TABLE "ingredients_to_add" ADD CONSTRAINT "ingredients_to_add_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_item_ingredients_to_add" ADD CONSTRAINT "cart_item_ingredients_to_add_cartItemId_fkey" FOREIGN KEY ("cartItemId") REFERENCES "cart_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_item_ingredients_to_add" ADD CONSTRAINT "cart_item_ingredients_to_add_ingredientsToAddId_fkey" FOREIGN KEY ("ingredientsToAddId") REFERENCES "ingredients_to_add"("id") ON DELETE CASCADE ON UPDATE CASCADE;
