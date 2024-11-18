import { Car } from './car';
import { LoyaltyCard } from './loyaltyCard';
import { Transaction } from './transaction';
import {
    LoyaltyCard as LoyaltyCardPrisma,
    Car as CarPrisma,
    Customer as CustomerPrisma,
} from '@prisma/client';
export class Customer{
    private id?: number;
    private name: string;
    private email: string;
    private loyaltyCard?: LoyaltyCard;
    private purchaseHistory: Transaction[];
    private cars?: Car[] ;

    static from ({id, name, email, loyaltyCard,  cars}: CustomerPrisma & { loyaltyCard: LoyaltyCardPrisma | null,  cars: CarPrisma[]}) {
        // if loyaltycardprisma is null create customer without loyaltycard else with
        if (!loyaltyCard)
        {
            return new Customer({
                id,
                name,
                email,
                loyaltyCard: undefined,
                cars: cars.map((car) => Car.from(car))
            });
        } else {
            return new Customer({
                id,
                name,
                email,
                loyaltyCard: LoyaltyCard.from(loyaltyCard),
                cars: cars.map((car) => Car.from(car)),
            })
        }
    }

    constructor(customer: {id?: number, name: string, email: string, loyaltyCard?: LoyaltyCard,  cars?: Car[]}) {
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