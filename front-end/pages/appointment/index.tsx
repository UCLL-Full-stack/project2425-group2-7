import Head from "next/head";
import Header from "@components/header";
import React, {useEffect, useState} from "react";
import AppointmentMaker from "@components/appointment/AppointmentMaker";
import {Admin, Appointment} from "@types";
import AppointmentService from "@services/AppointmentService";

const Appointment: React.FC = () => {
    const [admins, setAdmins] = useState<Array<Admin>>([]);
    const [error, setError] = useState<string>();
    const [appointments, setAppointments] = useState<Array<Appointment>>([]);

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
                    View all your appointments
                </p>
                <AppointmentMaker admins={admins} appointments={appointments} />
            </main>
        </>
    )
}

export default Appointment;