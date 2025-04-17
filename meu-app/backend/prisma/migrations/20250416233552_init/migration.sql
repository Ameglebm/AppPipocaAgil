-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "sobrenome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PasswordResetToken" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY ("id")
);

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
CREATE TABLE "Tipo_tratamento" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Tipo_tratamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_medicacao" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "medicamento" TEXT NOT NULL,
    "tipoDosagem" TEXT NOT NULL,
    "dosagemPorAdministracao" TEXT NOT NULL,
    "tipoTratamentoId" INTEGER NOT NULL,
    "dosesRestantes" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_medicacao_pkey" PRIMARY KEY ("id")
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
    "insulina" TEXT NOT NULL,
    "dosagemQtd" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_insulina_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "User_Pressao_Arterial" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "sistolica" INTEGER NOT NULL,
    "diastolica" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_Pressao_Arterial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_peso" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "peso" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_peso_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_cpf_key" ON "Users"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_token_key" ON "PasswordResetToken"("token");

-- AddForeignKey
ALTER TABLE "PasswordResetToken" ADD CONSTRAINT "PasswordResetToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_diabetes" ADD CONSTRAINT "User_diabetes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_diabetes" ADD CONSTRAINT "User_diabetes_diabetesId_fkey" FOREIGN KEY ("diabetesId") REFERENCES "Tipo_diabetes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_medicacao" ADD CONSTRAINT "User_medicacao_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_medicacao" ADD CONSTRAINT "User_medicacao_tipoTratamentoId_fkey" FOREIGN KEY ("tipoTratamentoId") REFERENCES "Tipo_tratamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE "User_Glicemia" ADD CONSTRAINT "User_Glicemia_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Glicemia" ADD CONSTRAINT "User_Glicemia_glicemiaId_fkey" FOREIGN KEY ("glicemiaId") REFERENCES "Tipo_Glicemia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Pressao_Arterial" ADD CONSTRAINT "User_Pressao_Arterial_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_peso" ADD CONSTRAINT "User_peso_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
