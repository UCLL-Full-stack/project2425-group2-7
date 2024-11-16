import {
    Car as CarPrisma, Customer as CustomerPrisma,
    Transaction as TransactionPrisma,
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


    static from ({id, type, date, cars=[], customer}: TransactionPrisma & {cars: CarPrisma[], customer: CustomerPrisma}) {
        return new Transaction({id,
            type: type as Type,
            date,
            cars: cars.map((car) => Car.from(car))},
            customer: Customer.from(customer);
        )
    }
    constructor(transaction:{id?: number, type: Type,date:Date, cars: Car[], customer: Customer}){
        this.id = transaction.id;
        this.type = transaction.type;
        this.date = transaction.date;
        this.cars = transaction.cars;
        this.customer = transaction.customer;
    }
    getId(): number | undefined{
        return this.id
    }
    getType(): 'Purchase'| 'Sale' | 'Trade'{
        return this.type
    }
    getDate(): Date{
        return this.date
    }

    getCar(): Array<Car>{
        return this.cars;
    }

}