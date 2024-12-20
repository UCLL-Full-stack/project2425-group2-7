
export type LoyaltyCard = {
    id: number;
    customerId: number;
    points: number;
    tier: string;
    discountPercentage: number;
    validity: Date;
    totalSpent: number;
};

export type Transaction = {
    id: number;
    typeTransaction: TypeTransaction;
    date: Date;
    cars: Car[];
    customer: Customer;
};

export type Admin = {
    id: number;
    user: User;
}

export type Appointment = {
    id: number;
    date: Date;
    customers: Customer[];
    admins: Admin[];
}
export type AppointmentInput = {
    adminId: number;
    date: Date;
    customerId: number;
}

export type Car = {
    chassisNumber: number;
    price: number;
    brand: string;
    model: string;
    condition: string;
    status: string;
};

export type Customer = { // when needing raw customer object
    id: number;
    loyaltyCard: LoyaltyCard;
    user: User;
    purchaseHistory: Transaction[];
    cars: Car[]
}

export type User = { // to be used for fetching
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: Role;
}

export type DeleteAppointmentInput = {
    id: number;
}

export type PutAdminToAppointmentInput = {
    adminId?: number;
    appointmentId: number;
}
export type UserInput = { // to be used for input
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: Role;
}
export type UserInputLogin = {
    username: string;
    password: string;
}

export type Role = 'ADMIN' | 'CUSTOMER';
export type TypeTransaction = 'P'| 'S' | 'T';



