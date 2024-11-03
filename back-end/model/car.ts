import {Status} from '../types'
export class Car{
    private chassisNumber: number;
    private price: number;
    private brand: string;
    private model: string;
    private condition: string;
    private status: Status;

    constructor(car: {chassisNumber: number, price: number, brand: string, model: string, condition: string, status: Status}){
        this.brand = car.brand;
        this.chassisNumber = car.chassisNumber;
        this.model = car.model;
        this.price = car.price;
        this.condition = car.condition;
        this.status = car.status
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

