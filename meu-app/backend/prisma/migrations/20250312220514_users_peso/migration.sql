-- CreateTable
CREATE TABLE "User_Pressao_Arterial" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "sistolica" INTEGER NOT NULL,
    "diastolica" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
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

-- AddForeignKey
ALTER TABLE "User_Pressao_Arterial" ADD CONSTRAINT "User_Pressao_Arterial_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_peso" ADD CONSTRAINT "User_peso_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
