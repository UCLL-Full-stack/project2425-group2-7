import Head from "next/head";
import Header from "@components/header";
import React, {useEffect, useState} from "react";
import AppointmentMaker from "@components/appointment/AppointmentMaker";
import {Admin, Appointment, DeleteAppointmentInput, PutAdminToAppointmentInput} from "@types";
import AppointmentService from "@services/AppointmentService";
import appointmentService from "@services/AppointmentService";
import AppointmentUpdatePopup from "@components/appointment/AppointmentUpdatePopup";

const Appointment: React.FC = () => {
    const [admins, setAdmins] = useState<Array<Admin>>([]);
    const [error, setError] = useState<string>();
    const [appointments, setAppointments] = useState<Array<Appointment>>([]);
    const [adminUpdatePopup, setAdminUpdatePopup] = useState<boolean>(false);

    const getAllAdmins = async () => {
        setError("")
        const response = await AppointmentService.getAdmins();

        if (!response.ok) {
            setError(response.statusText);
        } else {
            const admins = await response.json()
            setAdmins(admins);
        }
    }

    const handleDelete = async ( id: DeleteAppointmentInput) => {
        const response = await appointmentService.deleteAppointmentById(id);
        if (!response.ok) {
            setError(response.statusText);
        }
        await getAllAppointments();
    }
    /**
     * this handler will show a popup with a list of admins you can select from
     * @param appointmentId
     */
    const handleUpdate = async (appointmentId: PutAdminToAppointmentInput) => {
        setAdminUpdatePopup(true);
    }


    const getAllAppointments = async () => {
        setError("")
        const response = await AppointmentService.getAppointments();

        if (!response.ok) {
            setError(response.statusText);
        } else {
            const appointments = await response.json();
            setAppointments(appointments);
        }
    }

    useEffect(() => {
        getAllAdmins();
        getAllAppointments();

    }, []);

    return (
        <>
            <Head>
                <title>Appointment</title>
            </Head>
            <Header/>
            <main className="container mx-auto px-4 py-8">
                <p className="text-lg mb-4">
                    View, edit and delete any existing appointment
                </p>
                <AppointmentMaker admins={admins} appointments={appointments} onDelete={handleDelete} onUpdate={handleUpdate}/>
            </main>
        </>
    )
}

export default Appointment;