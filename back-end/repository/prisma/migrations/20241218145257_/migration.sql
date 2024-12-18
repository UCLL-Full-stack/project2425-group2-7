/*
  Warnings:

  - You are about to drop the column `customerId` on the `Appointment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_customerId_fkey";

-- DropIndex
DROP INDEX "Appointment_customerId_key";

-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "customerId";

-- CreateTable
CREATE TABLE "_CustomerAppointments" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CustomerAppointments_AB_unique" ON "_CustomerAppointments"("A", "B");

-- CreateIndex
CREATE INDEX "_CustomerAppointments_B_index" ON "_CustomerAppointments"("B");

-- AddForeignKey
ALTER TABLE "_CustomerAppointments" ADD CONSTRAINT "_CustomerAppointments_A_fkey" FOREIGN KEY ("A") REFERENCES "Appointment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CustomerAppointments" ADD CONSTRAINT "_CustomerAppointments_B_fkey" FOREIGN KEY ("B") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
