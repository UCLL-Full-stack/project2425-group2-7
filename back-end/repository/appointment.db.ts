import {Appointment} from "../model/appointment";
import database from "./database";
import {AppointmentInput, DeleteAppointmentInput, PutAdminToAppointmentInput} from "../types";
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
                customers: {
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
                customers: {
                    connect: {id: customer.id}
                },
                admins: {
                    connect: admins.map((admin) => ({ id: admin.getId() })),
                }
            },
            include: {
                customers: {
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

// delete appointment
const deleteAppointment = async(deleteAppointmentInput: DeleteAppointmentInput): Promise<Appointment> => {
    try {
        console.log(deleteAppointmentInput.id);
        const appointmentPrisma = await database.appointment.delete({
            where: {
                id: deleteAppointmentInput.id
            },
            include: {
                customers: {
                    include: {
                        loyaltyCard: true,
                        cars: true,
                        user: true,
                    }
                },
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
        console.log(deleteAppointmentInput.id);
        throw error;
    }
}
// edit appointment
const putAdminToAppointment = async(input: PutAdminToAppointmentInput): Promise<Appointment|null> => {
    try {
        const adminIds = [];
        adminIds.push(input.adminId);
        const appointmentPrisma = await database.appointment.update({
            where: {
                id: input.appointmentId,
            },
            data: {
                admins: {
                    connect: adminIds.map(adminId => ({ id: adminId })) //

                }
            },
            include: {
                customers: {
                    include: {
                        loyaltyCard: true,
                        cars: true,
                        user: true,
                    }
                },
                admins: {
                    include: {
                        user: true,
                    }
                }
            }
        })
        if (!appointmentPrisma) {
            return null;
        }
        return Appointment.from(appointmentPrisma)
    }catch (error) {
        console.log(error)
        throw error;
    }
}

const findAppointmentById = async(id: number): Promise<Appointment|null> => {
    try {
        const appointmentPrisma = await database.appointment.findUnique({
            where: {
                id: id
            },
            include: {
                customers: {
                    include: {
                        loyaltyCard: true,
                        cars: true,
                        user: true,
                    }
                },
                admins: {
                    include: {
                        user: true,
                    }
                }
            }
        })

        if (!appointmentPrisma) {
            return null
        } else {
            return Appointment.from(appointmentPrisma)
        }
    } catch (error) {
        console.log(error);
        throw error
    }
}

export default {
    getAllAppointments,
    addAppointment,
    deleteAppointment,
    putAdminToAppointment,
    findAppointmentById
}