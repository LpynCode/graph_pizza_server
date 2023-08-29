/*
  Warnings:

  - You are about to drop the column `price` on the `ingredient` table. All the data in the column will be lost.
  - Added the required column `price` to the `IngredientsToAddSchema` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "IngredientsToAddSchema" ADD COLUMN     "price" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ingredient" DROP COLUMN "price";
