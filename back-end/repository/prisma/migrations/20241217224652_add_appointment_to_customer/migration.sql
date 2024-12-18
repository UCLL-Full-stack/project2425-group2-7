/*
  Warnings:

  - You are about to drop the column `title` on the `Appointment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[customerId]` on the table `Appointment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `customerId` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "title",
ADD COLUMN     "customerId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Appointment_customerId_key" ON "Appointment"("customerId");

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
