-- CreateTable
CREATE TABLE "User_diabetes" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "diabetesId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_diabetes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tipo_diabetes" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Tipo_diabetes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_tratamento" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "tipoTratamentoId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_tratamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tipo_tratamento" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Tipo_tratamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_medicacao" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "medicamentoId" INTEGER NOT NULL,
    "tipoDosagemId" INTEGER NOT NULL,
    "dosagemQtd" DOUBLE PRECISION NOT NULL,
    "dosesRestantes" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_medicacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Medicamento" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Medicamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tipo_dosagem" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Tipo_dosagem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Meta_Glicemia" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "periodoId" INTEGER NOT NULL,
    "metaMin" INTEGER NOT NULL,
    "metaIdeal" INTEGER NOT NULL,
    "metaMax" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isAtual" BOOLEAN NOT NULL,

    CONSTRAINT "Meta_Glicemia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Periodo_glicemico" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Periodo_glicemico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_Lembretes" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "lembreteId" INTEGER NOT NULL,
    "dataInicio" TIMESTAMP(3) NOT NULL,
    "dataFim" TIMESTAMP(3) NOT NULL,
    "horarios" JSONB NOT NULL,
    "isAtivo" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_Lembretes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lembrete" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Lembrete_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_administracao_insulina" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "adminInsulinaId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_administracao_insulina_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Administracao_insulina" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Administracao_insulina_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_insulina" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "insulinaId" INTEGER NOT NULL,
    "tipoDosagemId" INTEGER NOT NULL,
    "dosagemQtd" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_insulina_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User_diabetes" ADD CONSTRAINT "User_diabetes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_diabetes" ADD CONSTRAINT "User_diabetes_diabetesId_fkey" FOREIGN KEY ("diabetesId") REFERENCES "Tipo_diabetes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_tratamento" ADD CONSTRAINT "User_tratamento_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_tratamento" ADD CONSTRAINT "User_tratamento_tipoTratamentoId_fkey" FOREIGN KEY ("tipoTratamentoId") REFERENCES "Tipo_tratamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_medicacao" ADD CONSTRAINT "User_medicacao_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_medicacao" ADD CONSTRAINT "User_medicacao_medicamentoId_fkey" FOREIGN KEY ("medicamentoId") REFERENCES "Medicamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_medicacao" ADD CONSTRAINT "User_medicacao_tipoDosagemId_fkey" FOREIGN KEY ("tipoDosagemId") REFERENCES "Tipo_dosagem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meta_Glicemia" ADD CONSTRAINT "Meta_Glicemia_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meta_Glicemia" ADD CONSTRAINT "Meta_Glicemia_periodoId_fkey" FOREIGN KEY ("periodoId") REFERENCES "Periodo_glicemico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Lembretes" ADD CONSTRAINT "User_Lembretes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Lembretes" ADD CONSTRAINT "User_Lembretes_lembreteId_fkey" FOREIGN KEY ("lembreteId") REFERENCES "Lembrete"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_administracao_insulina" ADD CONSTRAINT "User_administracao_insulina_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_administracao_insulina" ADD CONSTRAINT "User_administracao_insulina_adminInsulinaId_fkey" FOREIGN KEY ("adminInsulinaId") REFERENCES "Administracao_insulina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_insulina" ADD CONSTRAINT "User_insulina_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_insulina" ADD CONSTRAINT "User_insulina_insulinaId_fkey" FOREIGN KEY ("insulinaId") REFERENCES "Administracao_insulina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_insulina" ADD CONSTRAINT "User_insulina_tipoDosagemId_fkey" FOREIGN KEY ("tipoDosagemId") REFERENCES "Tipo_dosagem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
