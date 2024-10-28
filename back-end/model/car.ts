export class Car{
    private chasisNumber: number;
    private price: number;
    private brand: string;
    private model: string;
    private condition: string;
    private status: 'IN_STOCK' | 'SOLD' | 'RESERVED';

    constructor(car: {chasisNumber: number, price: number, brand: string, model: string, condition: string, status: 'IN_STOCK' | 'SOLD' | 'RESERVED'}){
        this.brand = car.brand;
        this.chasisNumber = car.chasisNumber;
        this.model = car.model;
        this.price = car.price;
        this.condition = car.condition;
        this.status = car.status
    }

    getChasisNumber(): number{
        return this.chasisNumber;
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

