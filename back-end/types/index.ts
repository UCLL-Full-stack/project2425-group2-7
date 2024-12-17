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

type User = { // to be used for fetching
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: Role;
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

type LoyaltyCard = {
    id: number;
    points: number;
    tier: Tier;
    discountPercentage: number;
    validity: Date;
    totalSpent: number;
}

type Car = { // when needing raw Car object
    id: number;
    chassisNumber: number;
    price: number;
    brand: string;
    model: string;
    condition: string;
    status: Status;
}

type Customer = { // when needing raw customer object
    id: number;
    loyaltyCard: LoyaltyCard;
    user: User;
    purchaseHistory: Transaction[];
    cars: Car[]
}

type AuthenticationResponse = {
    token: string;
    username: string;
    fullName: string;
    role: Role;
}

type JWTPayload = { // role decides whats shown
    username: string;
    role?: Role
}

type TransactionInput = {
    typeTransaction: TypeTransaction;
    date: Date;
    carsId: number[];
    customerId: number;
}

type Transaction = { // when needing raw transaction object
    id: number;
    date: Date;
    type: TypeTransaction;
    cars: Car[];
    customer: Customer
}

type Role = 'ADMIN' | 'CUSTOMER';
type TypeTransaction = 'P'| 'S' | 'T';
type Tier = 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
export {
    UserInputRegister,
    UserInputLogin,
    CarInput,
    Status,
    TypeTransaction,
    Tier,
    Role,
    AuthenticationResponse,
    JWTPayload,
    Transaction,
    TransactionInput,
    Customer,
    Car,
    LoyaltyCard,
    User
}


