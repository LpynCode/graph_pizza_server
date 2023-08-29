-- AlterTable
ALTER TABLE "product" ADD COLUMN     "pictureId" INTEGER;

-- CreateTable
CREATE TABLE "pictures" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "pictures_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_pictureId_fkey" FOREIGN KEY ("pictureId") REFERENCES "pictures"("id") ON DELETE SET NULL ON UPDATE CASCADE;
