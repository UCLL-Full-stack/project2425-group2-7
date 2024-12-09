import {LoyaltyCard} from "../../model/loyaltyCard";

describe('loyaltyCardHappy', () => {
    test("given valid details when creating loyalty card then loyalty card is created", () => {
        const loyaltyCard = new LoyaltyCard({
            points: 727,
            discountPercentage: 0.3,
            validity: new Date(2009, 9, 9),
            totalSpent: 9000,
            tier: "Platinum"
        });

        expect(loyaltyCard.getDiscountpercentage()).toEqual(0.3);
        expect(loyaltyCard.getValidity()).toEqual(new Date(2009, 9, 9));
        expect(loyaltyCard.getTotalSpent()).toEqual(9000);
        expect(loyaltyCard.getTier()).toEqual("Platinum");
    })
})