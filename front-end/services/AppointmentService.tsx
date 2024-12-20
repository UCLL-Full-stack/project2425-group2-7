import {AppointmentInput} from "@types";

const getAdmins = async () => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + "/admins", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
}

const addAppointment = async (input: AppointmentInput) => {
    console.log("Customer id in FRONTEND", input.customerId);
    return await fetch(process.env.NEXT_PUBLIC_API_URL + "/appointment/add_appointment", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
    })
}

const getAppointments = async () => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + "/appointment", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
}

const deleteAppointmentById = async (id: number) => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + "/appointment/delete_appointment", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(id),
    })
}

const appointmentService = {
    getAdmins,
    addAppointment,
    getAppointments,
    deleteAppointmentById,
}

export default appointmentService;