
import {
    Appointment as AppointmentPrisma,
    Admin as AdminPrisma,
    Customer as CustomerPrisma,
    User as UserPrisma,
    LoyaltyCard as LoyaltyCardPrisma,
    Car as CarPrisma
} from '@prisma/client';
import {Customer} from "./customer";
import {Admin} from "./admin";

/**
 * please for the love of god do not touch this code or its relations as this is running on hopes and dreams
 * the desperation hit the man and thus many things were adjusted with an educated guess of whether it would work
 * thanks,
 * naphat
 */
export class Appointment {
    readonly id?: number;
    readonly date: Date;
    readonly customers: Customer[];
    readonly admins: Admin[];

    static from({id, date, customers, admins}: AppointmentPrisma & {
        customers: (CustomerPrisma & {
            user: UserPrisma,
            loyaltyCard: LoyaltyCardPrisma|null,
            cars: CarPrisma[]
        })[],
        admins: (AdminPrisma & {
            user: UserPrisma
        })[],
    }) {
        return new Appointment({id,
            date: date,
            customers: customers.map((customer) => Customer.from(customer)),
            admins: admins.map((admin) => Admin.from(admin)),
        });
    }

    constructor(appointment: {
        id?: number,
        customers: Customer[],
        admins: Admin[],
        date: Date}) {
        this.id = appointment.id;
        this.date = appointment.date;
        this.customers = appointment.customers;
        this.admins = appointment.admins;
    }

    getDate(): Date {
        return this.date;
    }

}