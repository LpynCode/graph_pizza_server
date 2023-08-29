-- CreateTable
CREATE TABLE "CartItemOnIngredientsToAddSchema" (
    "cartItemId" INTEGER NOT NULL,
    "ingredientsToAddId" INTEGER NOT NULL,

    CONSTRAINT "CartItemOnIngredientsToAddSchema_pkey" PRIMARY KEY ("cartItemId","ingredientsToAddId")
);

-- AddForeignKey
ALTER TABLE "CartItemOnIngredientsToAddSchema" ADD CONSTRAINT "CartItemOnIngredientsToAddSchema_cartItemId_fkey" FOREIGN KEY ("cartItemId") REFERENCES "cart_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItemOnIngredientsToAddSchema" ADD CONSTRAINT "CartItemOnIngredientsToAddSchema_ingredientsToAddId_fkey" FOREIGN KEY ("ingredientsToAddId") REFERENCES "IngredientsToAddSchema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
