-- DropForeignKey
ALTER TABLE "product_characteristics" DROP CONSTRAINT "product_characteristics_sizeId_fkey";

-- AlterTable
ALTER TABLE "product_characteristics" ALTER COLUMN "sizeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "product_characteristics" ADD CONSTRAINT "product_characteristics_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "product_sizes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
