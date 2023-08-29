/*
  Warnings:

  - The primary key for the `cart_item_ingredients_to_add` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ingredientsToAddId` on the `cart_item_ingredients_to_add` table. All the data in the column will be lost.
  - Added the required column `ingredientId` to the `cart_item_ingredients_to_add` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "cart_item_ingredients_to_add" DROP CONSTRAINT "cart_item_ingredients_to_add_ingredientsToAddId_fkey";

-- AlterTable
ALTER TABLE "cart_item_ingredients_to_add" DROP CONSTRAINT "cart_item_ingredients_to_add_pkey",
DROP COLUMN "ingredientsToAddId",
ADD COLUMN     "ingredientId" INTEGER NOT NULL,
ADD CONSTRAINT "cart_item_ingredients_to_add_pkey" PRIMARY KEY ("cartItemId", "ingredientId");

-- AddForeignKey
ALTER TABLE "cart_item_ingredients_to_add" ADD CONSTRAINT "cart_item_ingredients_to_add_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "ingredients_to_add"("id") ON DELETE CASCADE ON UPDATE CASCADE;
