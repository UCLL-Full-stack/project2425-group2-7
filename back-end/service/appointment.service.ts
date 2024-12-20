import appointmentDb from "../repository/appointment.db";
import {AppointmentInput, DeleteAppointmentInput, PutAdminToAppointmentInput} from "../types";
import userDb from "../repository/user.db";
import customersDb from "../repository/customers.db";
import adminDb from "../repository/admin.db";
import {Admin} from "../model/admin";
import {Appointment} from "../model/appointment";

const getAllAppointments = async() => {
    try {
        return appointmentDb.getAllAppointments();
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const addAppointment = async(appointmentInput: AppointmentInput): Promise<Appointment> => {
    // first look to see if the customer and admin exist
    // then see if date is in the future
    // then see if there is already an appointment for that day
    try{
        let adminsToPush: Admin[] = [];
        const admin = await adminDb.findAdminByUserId(appointmentInput.adminId);
        console.log("Customer id in service: ", appointmentInput.customerId)
        const customer = await customersDb.findCustomerById(appointmentInput.customerId);

        if (!admin) {
            throw new Error("Admin not found")
        }

        if (!customer) {
            throw new Error("Customer not found")
        }
        adminsToPush.push(admin)

        // date validation
        const inputDate = new Date(appointmentInput.date);
        const appointments = await appointmentDb.getAllAppointments();
        for (const appointment of appointments) {
            if (
                appointment.date.getFullYear() === inputDate.getFullYear() &&
                appointment.date.getMonth() === inputDate.getMonth() &&
                appointment.date.getDate() === inputDate.getDate()
            ) {
                throw new Error("Appointment already exists for that day")
            }
        }

        // date future validation needs fixing
        if (appointmentInput.date <= new Date()) {
            throw new Error('The appointment date must be in the future.');
        }

        return await appointmentDb.addAppointment(appointmentInput.date, customer, adminsToPush)
    } catch (error) {
        console.log(error);
        throw error;

    }


}

const deleteAppointment = async(deleteAppointmentInput: DeleteAppointmentInput) => {
    try {
        const appointment = await appointmentDb.deleteAppointment(deleteAppointmentInput);
        if (!appointment) {
            throw new Error("Appointment not found")
        }
        return appointment;
    } catch(error) {
        console.log(error);
        throw error;
    }
}

const putAdminToAppointment = async(input: PutAdminToAppointmentInput): Promise<Appointment> => {
    try {
        const admin = await adminDb.findAdminByUserId(input.adminId);
        if (!admin) {
            throw new Error("Admin not found")
        }
        const appointment = await appointmentDb.putAdminToAppointment(input);
        if (!appointment) {
            throw new Error("Appointment or admin not found")
        }
        return appointment;
    } catch(error) {
        console.log(error);
        throw error;
    }
}

export default { getAllAppointments, addAppointment, deleteAppointment, putAdminToAppointment };