/*
  Warnings:

  - You are about to drop the column `dosagemQtd` on the `User_medicacao` table. All the data in the column will be lost.
  - You are about to drop the `User_tratamento` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `dosagemPorAdministracao` to the `User_medicacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoTratamentoId` to the `User_medicacao` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User_tratamento" DROP CONSTRAINT "User_tratamento_tipoTratamentoId_fkey";

-- DropForeignKey
ALTER TABLE "User_tratamento" DROP CONSTRAINT "User_tratamento_userId_fkey";

-- AlterTable
ALTER TABLE "User_medicacao" DROP COLUMN "dosagemQtd",
ADD COLUMN     "dosagemPorAdministracao" TEXT NOT NULL,
ADD COLUMN     "tipoTratamentoId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "User_tratamento";

-- AddForeignKey
ALTER TABLE "User_medicacao" ADD CONSTRAINT "User_medicacao_tipoTratamentoId_fkey" FOREIGN KEY ("tipoTratamentoId") REFERENCES "Tipo_tratamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
