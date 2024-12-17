
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
    type: string;
    date: Date;
};

export type Car = {
    chassisNumber: number;
    price: number;
    brand: string;
    model: string;
    condition: string;
    status: string;
};

export type Customer = {
    id: number;
    name: string;
    email: string;
    loyaltyCard: LoyaltyCard;
    purchaseHistory: Transaction[];
};

export type User = {
    username: string;
    firstName:string;
    lastName: string;
    email: string;
    password: string;
    role: string;
};

export type UserInputLogin = {
    username: string;
    password: string;
}


