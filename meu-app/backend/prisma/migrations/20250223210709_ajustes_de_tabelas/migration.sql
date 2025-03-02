/*
  Warnings:

  - You are about to drop the column `tipoDosagemId` on the `User_insulina` table. All the data in the column will be lost.
  - You are about to drop the column `medicamentoId` on the `User_medicacao` table. All the data in the column will be lost.
  - You are about to drop the column `tipoDosagemId` on the `User_medicacao` table. All the data in the column will be lost.
  - You are about to drop the `Medicamento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tipo_dosagem` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `tipoDosagem` to the `User_insulina` table without a default value. This is not possible if the table is not empty.
  - Added the required column `medicamento` to the `User_medicacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoDosagem` to the `User_medicacao` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User_insulina" DROP CONSTRAINT "User_insulina_tipoDosagemId_fkey";

-- DropForeignKey
ALTER TABLE "User_medicacao" DROP CONSTRAINT "User_medicacao_medicamentoId_fkey";

-- DropForeignKey
ALTER TABLE "User_medicacao" DROP CONSTRAINT "User_medicacao_tipoDosagemId_fkey";

-- AlterTable
ALTER TABLE "User_insulina" DROP COLUMN "tipoDosagemId",
ADD COLUMN     "tipoDosagem" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User_medicacao" DROP COLUMN "medicamentoId",
DROP COLUMN "tipoDosagemId",
ADD COLUMN     "medicamento" TEXT NOT NULL,
ADD COLUMN     "tipoDosagem" TEXT NOT NULL;

-- DropTable
DROP TABLE "Medicamento";

-- DropTable
DROP TABLE "Tipo_dosagem";
