export class LoyaltyCard{
    id: number;
    customerId: number;
    points: number;
    tier: 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM';
    discountPercentage: number;
    validity: Date;
    totalSpent: number;

    constructor(loyaltyCard: { id: number, customerId: number, points: number, discountPercentage: number, validity: Date, totalSpent: number,tier: 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM'}){
        this.id = loyaltyCard.id;
        this.customerId = loyaltyCard.customerId;
        this.points = loyaltyCard.points;
        this.tier = loyaltyCard.tier;
        this.discountPercentage = loyaltyCard.discountPercentage;
        this.validity = loyaltyCard.validity;
        this.totalSpent = loyaltyCard.totalSpent
    }
    getId(){
        return this.id
    }
    getCustomerId(){
        return this.customerId
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