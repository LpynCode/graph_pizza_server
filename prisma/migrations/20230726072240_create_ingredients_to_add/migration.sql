-- DropForeignKey
ALTER TABLE "CartItemOnIngredientsToAddSchema" DROP CONSTRAINT "CartItemOnIngredientsToAddSchema_cartItemId_fkey";

-- DropForeignKey
ALTER TABLE "CartItemOnIngredientsToAddSchema" DROP CONSTRAINT "CartItemOnIngredientsToAddSchema_ingredientsToAddId_fkey";

-- AddForeignKey
ALTER TABLE "CartItemOnIngredientsToAddSchema" ADD CONSTRAINT "CartItemOnIngredientsToAddSchema_cartItemId_fkey" FOREIGN KEY ("cartItemId") REFERENCES "cart_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItemOnIngredientsToAddSchema" ADD CONSTRAINT "CartItemOnIngredientsToAddSchema_ingredientsToAddId_fkey" FOREIGN KEY ("ingredientsToAddId") REFERENCES "IngredientsToAddSchema"("id") ON DELETE CASCADE ON UPDATE CASCADE;
