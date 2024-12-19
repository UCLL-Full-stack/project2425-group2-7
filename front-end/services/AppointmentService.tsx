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
    console.log("Payload sent to backend:-----------------------------------------------------------------------", input);
    return await fetch(process.env.NEXT_PUBLIC_API_URL + "/appointment/add_appointment", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
    })
}

const appointmentService = {
    getAdmins,
    addAppointment,
}

export default appointmentService;