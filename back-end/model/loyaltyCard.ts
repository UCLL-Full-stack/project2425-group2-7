import {
    LoyaltyCard as LoyaltyCardPrisma,
} from '@prisma/client';
import {Tier} from "../types";
import {Customer} from "./customer";
import {
    Customer as CustomerPrisma,
} from '@prisma/client';

export class LoyaltyCard{
    private id?: number;
    private points: number;
    private tier: Tier;
    private discountPercentage: number;
    private validity: Date;
    private totalSpent: number;

    static from ({id, points, tier, discountPercentage, validity, totalSpent}: LoyaltyCardPrisma) {
        return new LoyaltyCard({id, points, tier: tier as Tier, discountPercentage, validity, totalSpent});
    }

    constructor(loyaltyCard: { id?: number, points: number, discountPercentage: number, validity: Date, totalSpent: number,tier: Tier}){
        this.id = loyaltyCard.id;
        this.points = loyaltyCard.points;
        this.tier = loyaltyCard.tier;
        this.discountPercentage = loyaltyCard.discountPercentage;
        this.validity = loyaltyCard.validity;
        this.totalSpent = loyaltyCard.totalSpent;
    }
    getId(){
        return this.id
    }
    getPoints(){
        return this.points
    }
    getTier(){
        return this.tier
    }
    getDiscountpercentage(){
        return this.discountPercentage
    }
    getValidity(){
        return this.validity
    }
    getTotalSpent(){
        return this.totalSpent
    }
}