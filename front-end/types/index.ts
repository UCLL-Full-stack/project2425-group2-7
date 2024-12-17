
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



export type Car = {
    chassisNumber: number;
    price: number;
    brand: string;
    model: string;
    condition: string;
    status: string;
};
export type User = { // to be used for fetching
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: Role;
}

export type Customer = { // when needing raw customer object
    id: number;
    loyaltyCard: LoyaltyCard;
    user: User;
    purchaseHistory: Transaction[];
    cars: Car[]
}

export type Role = 'ADMIN' | 'CUSTOMER';
export type TypeTransaction = 'P'| 'S' | 'T';



