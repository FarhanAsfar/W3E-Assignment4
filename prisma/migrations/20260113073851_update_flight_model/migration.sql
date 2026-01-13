-- AlterTable
ALTER TABLE "Flight" ADD COLUMN     "arrivalLocationId" INTEGER,
ADD COLUMN     "departureLocationId" INTEGER;

-- AddForeignKey
ALTER TABLE "Flight" ADD CONSTRAINT "Flight_departureLocationId_fkey" FOREIGN KEY ("departureLocationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flight" ADD CONSTRAINT "Flight_arrivalLocationId_fkey" FOREIGN KEY ("arrivalLocationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;
