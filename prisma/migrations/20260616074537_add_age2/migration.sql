/*
  Warnings:

  - Added the required column `fechaNacimiento` to the `Inquilino` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Inquilino" ADD COLUMN     "fechaNacimiento" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Propietario" ALTER COLUMN "fechaNacimiento" DROP DEFAULT;
