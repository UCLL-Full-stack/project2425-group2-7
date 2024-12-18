import {Admin} from "./admin";
import {Customer} from "./customer";

import {
    Appointment as AppointmentPrisma,
    Customer as CustomerPrisma,
    Admin as AdminPrisma,
} from '@prisma/client';
import {Car as CarPrisma, LoyaltyCard as LoyaltyCardPrisma, User as UserPrisma} from "@prisma/client";

export class Appointment {
    readonly id?: number;
    private customer: Customer;
    private admins: Admin[];
    private date: Date;

    static from({id, customer, admins, date}: AppointmentPrisma & {
        customer: CustomerPrisma & {
            loyaltyCard: LoyaltyCardPrisma | null,
            cars: CarPrisma[],
            user: UserPrisma
        },
        admins: (AdminPrisma & {
            user: UserPrisma,
        })[]}) {
        return new Appointment({id,
            customer: Customer.from(customer),
            admins: admins.map((admin) => Admin.from(admin)),
            date: date
        });
    }

    constructor(appointment: {
        id?: number,
        customer: Customer,
        admins: Admin[],
        date: Date}) {
        this.id = appointment.id;
        this.customer = appointment.customer;
        this.admins = appointment.admins;
        this.date = appointment.date;
    }

    getDate(): Date {
        return this.date;
    }

    getAdmins(): Admin[] {
        return this.admins;
    }

    getCustomer(): Customer {
        return this.customer;
    }
}