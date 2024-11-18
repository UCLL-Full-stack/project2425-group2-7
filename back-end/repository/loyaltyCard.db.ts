import database from './database';
import {LoyaltyCard} from "../model/loyaltyCard";

const getAllLoyaltyCards = async (): Promise<LoyaltyCard[]> => {
    try {
        const loyaltyCards = await database.loyaltyCard.findMany({})
        return loyaltyCards.map((loyaltyCard) => LoyaltyCard.from(loyaltyCard));
    } catch (error) {
        throw new Error("Problem with fetching loyaltyCard in repository")
    }
}

export default {getAllLoyaltyCards};