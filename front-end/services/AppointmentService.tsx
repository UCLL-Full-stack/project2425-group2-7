import {AppointmentInput, DeleteAppointmentInput, PutAdminToAppointmentInput} from "@types";

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

const deleteAppointmentById = async ({id}: DeleteAppointmentInput) => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + `/appointment/delete_appointment/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
}

const putAdminToAppointment = async (input: PutAdminToAppointmentInput) => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + "/appointment/update_appointment", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        }
        , body: JSON.stringify(input),
    })
}

const appointmentService = {
    getAdmins,
    addAppointment,
    getAppointments,
    deleteAppointmentById,
    putAdminToAppointment,
}

export default appointmentService;