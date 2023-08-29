
-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_user_roles" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "role_value_key" ON "role"("value");

-- CreateIndex
CREATE UNIQUE INDEX "_user_roles_AB_unique" ON "_user_roles"("A", "B");

-- CreateIndex
CREATE INDEX "_user_roles_B_index" ON "_user_roles"("B");

-- AddForeignKey
ALTER TABLE "_user_roles" ADD CONSTRAINT "_user_roles_A_fkey" FOREIGN KEY ("A") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_user_roles" ADD CONSTRAINT "_user_roles_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
