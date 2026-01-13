/*
  Warnings:

  - You are about to drop the column `arrivalLocationId` on the `Flight` table. All the data in the column will be lost.
  - You are about to drop the column `departureLocationId` on the `Flight` table. All the data in the column will be lost.
  - Made the column `flightNumber` on table `Flight` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Flight" DROP CONSTRAINT "Flight_arrivalLocationId_fkey";

-- DropForeignKey
ALTER TABLE "Flight" DROP CONSTRAINT "Flight_departureLocationId_fkey";

-- AlterTable
ALTER TABLE "Flight" DROP COLUMN "arrivalLocationId",
DROP COLUMN "departureLocationId",
ALTER COLUMN "flightNumber" SET NOT NULL;
