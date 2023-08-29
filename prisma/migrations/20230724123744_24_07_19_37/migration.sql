-- CreateTable
CREATE TABLE "IngredientsToAddSchema" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "IngredientsToAddSchema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ingredient_ingredientToAddId" (
    "ingredientId" INTEGER NOT NULL,
    "ingredientToAddId" INTEGER NOT NULL,

    CONSTRAINT "ingredient_ingredientToAddId_pkey" PRIMARY KEY ("ingredientId","ingredientToAddId")
);

-- AddForeignKey
ALTER TABLE "ingredient_ingredientToAddId" ADD CONSTRAINT "ingredient_ingredientToAddId_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredient_ingredientToAddId" ADD CONSTRAINT "ingredient_ingredientToAddId_ingredientToAddId_fkey" FOREIGN KEY ("ingredientToAddId") REFERENCES "IngredientsToAddSchema"("id") ON DELETE CASCADE ON UPDATE CASCADE;
