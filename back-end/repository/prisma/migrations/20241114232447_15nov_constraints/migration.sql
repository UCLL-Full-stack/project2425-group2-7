/*
  Warnings:

  - You are about to drop the column `loyaltyCardId` on the `Customer` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Car` will be added. If there are existing duplicate values, this will fail.
  - Made the column `customerId` on table `Transaction` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_loyaltyCardId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_customerId_fkey";

-- AlterTable
ALTER TABLE "Car" ADD COLUMN     "transactionId" INTEGER;

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "loyaltyCardId";

-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "customerId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Car_id_key" ON "Car"("id");

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoyaltyCard" ADD CONSTRAINT "LoyaltyCard_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
