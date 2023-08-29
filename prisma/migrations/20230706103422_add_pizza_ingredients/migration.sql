-- CreateTable
CREATE TABLE "pizza" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "pizza_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ingredient" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pizza_ingredients" (
    "pizzaId" INTEGER NOT NULL,
    "ingredientId" INTEGER NOT NULL,

    CONSTRAINT "pizza_ingredients_pkey" PRIMARY KEY ("pizzaId","ingredientId")
);

-- AddForeignKey
ALTER TABLE "pizza_ingredients" ADD CONSTRAINT "pizza_ingredients_pizzaId_fkey" FOREIGN KEY ("pizzaId") REFERENCES "pizza"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pizza_ingredients" ADD CONSTRAINT "pizza_ingredients_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
