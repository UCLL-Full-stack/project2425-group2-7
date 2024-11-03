import {type} from "node:os";

type CarInput = {
    chassisNumber: number;
    price: number;
    brand: string;
    model: string;
    condition: string;
    status: 'IN_STOCK' | 'SOLD' | 'RESERVED';
}

export {
    CarInput,
}

