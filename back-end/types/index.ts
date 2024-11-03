import {type} from "node:os";

type Status = 'IN_STOCK' | 'SOLD' | 'RESERVED';
type CarInput = {
    chassisNumber: number;
    price: number;
    brand: string;
    model: string;
    condition: string;
    status: Status;
}

export {
    CarInput,
    Status,
}

