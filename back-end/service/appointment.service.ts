import appointmentDb from "../repository/appointment.db";
import {AppointmentInput} from "../types";
import userDb from "../repository/user.db";
import customersDb from "../repository/customers.db";
import adminDb from "../repository/admin.db";
import {Admin} from "../model/admin";

const getAllAppointments = async() => {
    try {
        return appointmentDb.getAllAppointments();
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const addAppointment = async(appointmentInput: AppointmentInput) => {
    // first look to see if the customer and admin exist
    // then see if date is in the future
    // then see if there is already an appointment for that day
    let admin;
    let admins: Admin[] = [];
    let customer;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const userC = await userDb.findCustomerByUsername(appointmentInput.customerUsername);
    const userA = await userDb.findAdminByUsername(appointmentInput.adminUsername);
    const appointments = await appointmentDb.getAllAppointments();

    if (!userC) {
        throw new Error("No customer with user ID found");
    } else {
        customer = await customersDb.findCustomerByUserId(userC.id);
    }
    if (!userA) {
        throw new Error("No admin with user ID found")
    } else {
        admin = await adminDb.findAdminByUserId(userA.id);
        if (admin) {
            admins.push(admin);
        }
    }


    if (appointmentInput.date.getDate().valueOf() <= today.valueOf()) {
        throw new Error("Appointment date has to be in the future")
    }
    for (const appointment of appointments) {
        if (appointment.getDate().valueOf() == today.valueOf()) {
            throw new Error('There is already an appointment scheduled for that date');
        }
    }
    if (customer && admin) {
        try {
            return await appointmentDb.addAppointment(appointmentInput.date, customer, admins);
        } catch (error) {
            throw error;
        }
    }




}

export default { getAllAppointments, addAppointment };