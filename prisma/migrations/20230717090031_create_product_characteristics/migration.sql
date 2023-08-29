-- DropForeignKey
ALTER TABLE "product_ingredients" DROP CONSTRAINT "product_ingredients_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "product_ingredients" DROP CONSTRAINT "product_ingredients_productId_fkey";

-- CreateTable
CREATE TABLE "product_characteristics" (
    "id" SERIAL NOT NULL,
    "price" INTEGER NOT NULL,
    "sizeId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "product_characteristics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_sizes" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "unitId" INTEGER NOT NULL,

    CONSTRAINT "product_sizes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "units" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "units_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "product_characteristics" ADD CONSTRAINT "product_characteristics_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "product_sizes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_characteristics" ADD CONSTRAINT "product_characteristics_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_sizes" ADD CONSTRAINT "product_sizes_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "units"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_ingredients" ADD CONSTRAINT "product_ingredients_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_ingredients" ADD CONSTRAINT "product_ingredients_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;
