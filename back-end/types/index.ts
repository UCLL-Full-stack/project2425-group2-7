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

type Role = 'Admin' | 'Customer';
type Type = 'Purchase'| 'Sale' | 'Trade';
type Tier = 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
export {
    CarInput,
    Status,
    Type,
    Tier,
    Role,
}


