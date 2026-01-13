/*
  Warnings:

  - You are about to drop the column `aiportName` on the `Airport` table. All the data in the column will be lost.
  - Added the required column `airportName` to the `Airport` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Airport" DROP COLUMN "aiportName",
ADD COLUMN     "airportName" TEXT NOT NULL;
