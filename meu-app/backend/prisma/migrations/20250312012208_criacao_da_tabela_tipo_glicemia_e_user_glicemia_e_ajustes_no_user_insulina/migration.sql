/*
  Warnings:

  - You are about to drop the column `insulinaId` on the `User_insulina` table. All the data in the column will be lost.
  - You are about to drop the column `tipoDosagem` on the `User_insulina` table. All the data in the column will be lost.
  - Added the required column `insulina` to the `User_insulina` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User_insulina" DROP CONSTRAINT "User_insulina_insulinaId_fkey";

-- AlterTable
ALTER TABLE "User_insulina" DROP COLUMN "insulinaId",
DROP COLUMN "tipoDosagem",
ADD COLUMN     "insulina" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Tipo_Glicemia" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Tipo_Glicemia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_Glicemia" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "glicemiaId" INTEGER NOT NULL,
    "value" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_Glicemia_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User_Glicemia" ADD CONSTRAINT "User_Glicemia_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Glicemia" ADD CONSTRAINT "User_Glicemia_glicemiaId_fkey" FOREIGN KEY ("glicemiaId") REFERENCES "Tipo_Glicemia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
