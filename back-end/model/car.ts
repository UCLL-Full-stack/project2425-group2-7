import {Status, Tier} from '../types'
import {
    Car as CarPrisma, Customer as CustomerPrisma,
} from '@prisma/client';
import {Customer} from "./customer";
export class Car{
    readonly id?: number;
    private chassisNumber: number;
    private price: number;
    private brand: string;
    private model: string;
    private condition: string;
    private status: Status;

    static from ({id, chassisNumber, price, brand, model, condition, status}: CarPrisma) {
        return new Car({id, chassisNumber, price, brand, model, condition, status: status as Status});
    }
    constructor(car: {id?: number, chassisNumber: number, price: number, brand: string, model: string, condition: string, status: Status}){
        this.id = car.id;
        this.brand = car.brand;
        this.chassisNumber = car.chassisNumber;
        this.model = car.model;
        this.price = car.price;
        this.condition = car.condition;
        this.status = car.status
    }

    validate(car: {
        chassisNumber: number,
        price: number,
        brand: string,
        model: string,
        condition: string,
        status: Status}){
        if (car.price < 0) {
            throw new Error("Car price cannot be negative")
        }
    }

    getId(): number | undefined{
        return this.id;
    }
    getChassisNumber(): number{
        return this.chassisNumber;
    }
    getPrice(): number{
        return this.price
    }

    getBrand(): string{
        return this.brand
    }
    getModel(): string{
        return this.model
    }
    getCondition(): string{
        return this.condition
    }
    getStatus(): 'IN_STOCK' | 'SOLD' | 'RESERVED'{
        return this.status
    }
}

