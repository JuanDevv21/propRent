-- CreateTable
CREATE TABLE "Propietario" (
    "id" SERIAL NOT NULL,
    "nombrePropietario" TEXT NOT NULL,
    "documentoPropietario" INTEGER NOT NULL,
    "emailPropietario" TEXT NOT NULL,
    "passwordPropietario" TEXT NOT NULL,
    "cretedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Propietario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inquilino" (
    "id" SERIAL NOT NULL,
    "nombreInquilino" TEXT NOT NULL,
    "documentoInquilino" INTEGER NOT NULL,
    "emailInquilino" TEXT NOT NULL,
    "passwordInquilino" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Inquilino_pkey" PRIMARY KEY ("id")
);
