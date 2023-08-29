-- CreateTable
CREATE TABLE "characteristic_cart" (
    "characteristicId" INTEGER NOT NULL,
    "cartId" INTEGER NOT NULL,

    CONSTRAINT "characteristic_cart_pkey" PRIMARY KEY ("characteristicId","cartId")
);

-- AddForeignKey
ALTER TABLE "characteristic_cart" ADD CONSTRAINT "characteristic_cart_characteristicId_fkey" FOREIGN KEY ("characteristicId") REFERENCES "characteristics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "characteristic_cart" ADD CONSTRAINT "characteristic_cart_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;
