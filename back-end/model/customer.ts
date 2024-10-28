import { Car } from './car';
import { LoyaltyCard } from './loyaltyCard';
import { Transaction } from './transaction';
export class customer{
    private id: number;
    private name: string;
    private email: string;
    private loyaltyCard?: LoyaltyCard;
    private purchaseHistory?: Transaction[];
    private cars?: Car[];

    constructor(customer: {id: number, name: string, email: string, loyaltyCard?: LoyaltyCard, purchaseHistory?:Transaction[], cars?: Car[] }){
        this.cars = customer.cars;
        this.id = customer.id;
        this.name = customer.name;
        this.email = customer.email;
        this.loyaltyCard = customer.loyaltyCard;
        this.purchaseHistory = customer.purchaseHistory;
    }

    getId(): number{
        return this.id;
    }
    getName(): string{
        return this.name
    }
    getEmail(): string{
        return this.email
    }
    getLoyaltyCard(): LoyaltyCard | undefined{
        return this.loyaltyCard
    }
    getPurchaseHistory(): Transaction[] | undefined{
        return this.purchaseHistory
    }
    getCars(): Car[]| undefined{
        return this.cars
    }

}