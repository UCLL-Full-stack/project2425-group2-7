import { Car } from './car';
import { LoyaltyCard } from './loyaltyCard';
import { Transaction } from './transaction';
import {
    LoyaltyCard as LoyaltyCardPrisma,
    Car as CarPrisma,
    Customer as CustomerPrisma,
    User as UserPrisma,
} from '@prisma/client';
import {User} from "./user";
export class Customer{
    private id?: number; // put in user and here
    private loyaltyCard?: LoyaltyCard;
    private user: User;
    private purchaseHistory: Transaction[];
    private cars?: Car[];

    static from ({id, user ,loyaltyCard,  cars}: CustomerPrisma & { loyaltyCard: LoyaltyCardPrisma | null,  cars: CarPrisma[], user: UserPrisma}) {
        // if loyaltycardprisma is null create customer without loyaltycard else with
        if (!loyaltyCard)
        {
            return new Customer({
                id,
                user: User.from(user),
                loyaltyCard: undefined,
                cars: cars.map((car) => Car.from(car))
            });
        } else {
            return new Customer({
                id,
                user: User.from(user),
                loyaltyCard: LoyaltyCard.from(loyaltyCard),
                cars: cars.map((car) => Car.from(car)),
            })
        }
    }

    constructor(customer: {id?: number, user: User, loyaltyCard?: LoyaltyCard,  cars?: Car[]}) {
        this.id = customer.id;
        this.loyaltyCard = customer.loyaltyCard;
        this.purchaseHistory = new Array<Transaction>
        this.cars = customer.cars
        this.user = customer.user;
    }


    getId(): number| undefined{
        return this.id;
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