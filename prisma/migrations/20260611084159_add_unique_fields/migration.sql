/*
  Warnings:

  - You are about to drop the column `cretedAt` on the `Propietario` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[documentoInquilino]` on the table `Inquilino` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[emailInquilino]` on the table `Inquilino` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[documentoPropietario]` on the table `Propietario` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[emailPropietario]` on the table `Propietario` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Propietario" DROP COLUMN "cretedAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "Inquilino_documentoInquilino_key" ON "Inquilino"("documentoInquilino");

-- CreateIndex
CREATE UNIQUE INDEX "Inquilino_emailInquilino_key" ON "Inquilino"("emailInquilino");

-- CreateIndex
CREATE UNIQUE INDEX "Propietario_documentoPropietario_key" ON "Propietario"("documentoPropietario");

-- CreateIndex
CREATE UNIQUE INDEX "Propietario_emailPropietario_key" ON "Propietario"("emailPropietario");
