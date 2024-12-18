import {Appointment} from "../model/appointment";
import database from "./database";
import {AppointmentInput} from "../types";
import {Customer} from "../model/customer";
import {Admin} from "../model/admin";

const getAllAppointments = async (): Promise<Appointment[]> => {
    try {
        const appointments = await database.appointment.findMany({
            include: {
                admins: {
                    include: {
                        user: true,
                    }
                },
                customer: {
                    include: {
                        user: true,
                        loyaltyCard: true,
                        cars: true,
                    }
                }
            }
        })
        return appointments.map((appointment) => Appointment.from(appointment))
    } catch(error) {
        console.log(error)
        throw error;
    }
}


// make appointment
const addAppointment = async (date: Date, customer: Customer, admins: Admin[]): Promise<Appointment> => {
    try {
        const appointmentPrisma = await database.appointment.create({
            data: {
                date: date,
                customer: {
                    connect: {id: customer.id}
                },
                admins: {
                    connect: admins.map((admin) => ({ id: admin.getId() })),
                }
            },
            include: {
                customer: {
                    include: {
                        loyaltyCard: true,
                        cars: true,
                        user: true,
                    }},
                admins: {
                    include: {
                        user: true,
                    }
                }
            }
        })
        return Appointment.from(appointmentPrisma);
    }catch(error) {
        console.log(error)
        throw error;
    }
}

export default {
    getAllAppointments,
    addAppointment,
}