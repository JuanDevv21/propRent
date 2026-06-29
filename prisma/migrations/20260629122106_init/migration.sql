/*
  Warnings:

  - You are about to drop the column `balcon` on the `Propiedad` table. All the data in the column will be lost.
  - You are about to drop the column `departamento` on the `Propiedad` table. All the data in the column will be lost.
  - You are about to drop the column `piso` on the `Propiedad` table. All the data in the column will be lost.
  - Added the required column `codigoPostal` to the `Propiedad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `depositoGarantia` to the `Propiedad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `diaVencimiento` to the `Propiedad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pais` to the `Propiedad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoPropiedad` to the `Propiedad` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Propiedad" DROP COLUMN "balcon",
DROP COLUMN "departamento",
DROP COLUMN "piso",
ADD COLUMN     "codigoPostal" TEXT NOT NULL,
ADD COLUMN     "depositoGarantia" INTEGER NOT NULL,
ADD COLUMN     "diaVencimiento" INTEGER NOT NULL,
ADD COLUMN     "pais" TEXT NOT NULL,
ADD COLUMN     "tipoPropiedad" TEXT NOT NULL;
