-- AlterTable
ALTER TABLE "Inquilino" ADD COLUMN     "ciudad" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "departamento" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Propietario" ADD COLUMN     "ciudad" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "departamento" TEXT NOT NULL DEFAULT '';
