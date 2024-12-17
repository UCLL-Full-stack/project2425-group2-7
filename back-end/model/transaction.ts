import {
    Car as CarPrisma,
    Customer as CustomerPrisma,
    Transaction as TransactionPrisma,
    LoyaltyCard as LoyaltyCardPrisma,
    User as UserPrisma,
} from '@prisma/client';
import {Car} from "./car";
import {TypeTransaction} from "../types";
import {Customer} from "./customer";
export class Transaction{
    readonly id?: number;
    readonly typeTransaction: TypeTransaction;
    readonly date: Date;
    readonly cars: Car[];
    readonly customer: Customer;


    static from ({id, typeTransaction: typeTransaction, date, cars=[], customer}: TransactionPrisma & {cars: CarPrisma[], customer: CustomerPrisma & {loyaltyCard: LoyaltyCardPrisma | null, cars: CarPrisma[], user: UserPrisma}}) {
        return new Transaction({id,
            type: typeTransaction as TypeTransaction,
            date,
            cars: cars.map((car) => Car.from(car)),
            customer: Customer.from(customer)}
        );
    }
    constructor(transaction:{id?: number, type: TypeTransaction,date:Date, cars: Car[], customer: Customer}){
        this.id = transaction.id;
        this.typeTransaction = transaction.type;
        this.date = transaction.date;
        this.cars = transaction.cars;
        this.customer = transaction.customer;
        this.validate();
    }
    getId(): number | undefined{
        return this.id
    }
    getType(): 'P'| 'S' | 'T'{
        return this.typeTransaction
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

        if (this.typeTransaction == "T" && this.cars.length != 2) {
            throw new Error("Specify 2 cars")
        }
        if ((this.typeTransaction == "S" || this.typeTransaction == "P") && this.cars.length != 1) {
            throw new Error("Specify 1 car")
        }


    }

}