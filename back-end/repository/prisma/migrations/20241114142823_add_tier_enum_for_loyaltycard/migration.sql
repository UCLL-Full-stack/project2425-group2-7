/*
  Warnings:

  - Changed the type of `tier` on the `LoyaltyCard` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Tier" AS ENUM ('BRONZE', 'SILVER', 'GOLD', 'PLATINUM');

-- AlterTable
ALTER TABLE "LoyaltyCard" DROP COLUMN "tier",
ADD COLUMN     "tier" "Tier" NOT NULL;
