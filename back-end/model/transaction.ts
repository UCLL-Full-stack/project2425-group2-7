import {
    Car as CarPrisma,
    Customer as CustomerPrisma,
    Transaction as TransactionPrisma,
    LoyaltyCard as LoyaltyCardPrisma,
    User as UserPrisma,
} from '@prisma/client';
import {Car} from "./car";
import {Type} from "../types";
import {Customer} from "./customer";
export class Transaction{
    private id?: number;
    private type: Type;
    private date: Date;
    private cars: Car[];
    private customer: Customer;


    static from ({id, type, date, cars=[], customer}: TransactionPrisma & {cars: CarPrisma[], customer: CustomerPrisma & {loyaltyCard: LoyaltyCardPrisma | null, cars: CarPrisma[], user: UserPrisma}}) {
        return new Transaction({id,
            type: type as Type,
            date,
            cars: cars.map((car) => Car.from(car)),
            customer: Customer.from(customer)}
        );
    }
    constructor(transaction:{id?: number, type: Type,date:Date, cars: Car[], customer: Customer}){
        this.validate();
        this.id = transaction.id;
        this.type = transaction.type;
        this.date = transaction.date;
        this.cars = transaction.cars;
        this.customer = transaction.customer;
    }
    getId(): number | undefined{
        return this.id
    }
    getType(): 'P'| 'S' | 'T'{
        return this.type
    }
    getDate(): Date{
        return this.date
    }

    getCars(): Array<Car>{
        return this.cars;
    }

    getCustomer(): Customer{
        return this.customer;
    }

    validate() {

        switch(this.type) {
            case 'P':
                if (this.cars.length > 1) {
                    throw new Error("You can only buy 1 car");
                }
                return null
            case "T":
                if (this.cars.length != 2) {
                    throw new Error("You must submit your trade in vehicle and the vehicle you want to purchase");
                }
                return null
            case "S":
                if (this.cars.length != 1) {
                    throw new Error("There can only be 1 car to sell");
                }
                return null
            default:
                throw new Error("Transaction must be either T, S or P")

        }

    }

}