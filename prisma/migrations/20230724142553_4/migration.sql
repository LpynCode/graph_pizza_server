/*
  Warnings:

  - You are about to drop the `ingredient_ingredientToAddId` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[ingredientId]` on the table `IngredientsToAddSchema` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ingredientId` to the `IngredientsToAddSchema` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ingredientsToAddSchemaId` to the `ingredient` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ingredient_ingredientToAddId" DROP CONSTRAINT "ingredient_ingredientToAddId_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "ingredient_ingredientToAddId" DROP CONSTRAINT "ingredient_ingredientToAddId_ingredientToAddId_fkey";

-- AlterTable
ALTER TABLE "IngredientsToAddSchema" ADD COLUMN     "ingredientId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ingredient" ADD COLUMN     "ingredientsToAddSchemaId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "ingredient_ingredientToAddId";

-- CreateIndex
CREATE UNIQUE INDEX "IngredientsToAddSchema_ingredientId_key" ON "IngredientsToAddSchema"("ingredientId");

-- AddForeignKey
ALTER TABLE "IngredientsToAddSchema" ADD CONSTRAINT "IngredientsToAddSchema_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
