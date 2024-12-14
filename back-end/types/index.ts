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

type UserInputRegister = {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: Role;
}

type UserInputLogin = {
    username: string;
    password: string;
}

type AuthenticationResponse = {
    token: string;
    username: string;
    fullName: string;
    role: Role;
}

type JWTPayload = {
    username: string;
    role?: Role
}

type Role = 'ADMIN' | 'CUSTOMER';
type Type = 'P'| 'S' | 'T';
type Tier = 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
export {
    UserInputRegister,
    UserInputLogin,
    CarInput,
    Status,
    Type,
    Tier,
    Role,
    AuthenticationResponse,
    JWTPayload,
}


