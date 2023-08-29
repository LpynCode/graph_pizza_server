/*
  Warnings:

  - A unique constraint covering the columns `[value]` on the table `units` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "units_value_key" ON "units"("value");
