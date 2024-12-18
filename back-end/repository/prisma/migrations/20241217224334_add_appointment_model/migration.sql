-- CreateTable
CREATE TABLE "Appointment" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AdminAppointments" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AdminAppointments_AB_unique" ON "_AdminAppointments"("A", "B");

-- CreateIndex
CREATE INDEX "_AdminAppointments_B_index" ON "_AdminAppointments"("B");

-- AddForeignKey
ALTER TABLE "_AdminAppointments" ADD CONSTRAINT "_AdminAppointments_A_fkey" FOREIGN KEY ("A") REFERENCES "Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdminAppointments" ADD CONSTRAINT "_AdminAppointments_B_fkey" FOREIGN KEY ("B") REFERENCES "Appointment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
