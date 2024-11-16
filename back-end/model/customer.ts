import { Car } from './car';
import { LoyaltyCard } from './loyaltyCard';
import { Transaction } from './transaction';
import {
    LoyaltyCard as LoyaltyCardPrisma,
    Car as CarPrisma,
    Customer as CustomerPrisma,
    Transaction as TransactionPrisma,
} from '@prisma/client';
export class Customer{
    private id?: number;
    private name: string;
    private email: string;
    private loyaltyCard?: LoyaltyCard;
    private purchaseHistory: Transaction[];
    private cars?: Car[] ;

    static from ({id, name, email, loyaltyCard, purchaseHistory, cars}: CustomerPrisma & { loyaltyCard: LoyaltyCardPrisma, purchaseHistory: TransactionPrisma[], cars: CarPrisma[]}) {
        return new Customer({
            id,
            name,
            email,
            loyaltyCard: LoyaltyCard.from(loyaltyCard),
            purchaseHistory: purchaseHistory.map((transaction: TransactionPrisma) => Transaction.from(transaction)),
            cars: cars.map((car) => Car.from(car))
        });
    }

    constructor(customer: {id?: number, name: string, email: string, loyaltyCard?: LoyaltyCard, purchaseHistory?: Transaction[], cars?: Car[]}) {
        this.id = customer.id;
        this.name = customer.name;
        this.email = customer.email;
        this.loyaltyCard = customer.loyaltyCard;
        this.purchaseHistory = new Array<Transaction>
        this.cars = customer.cars
    }


    getId(): number| undefined{
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