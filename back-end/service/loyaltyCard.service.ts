import loyaltyCardDb from "../repository/loyaltyCard.db";

const getAllLoyaltyCards = async () => {
    return await loyaltyCardDb.getAllLoyaltyCards();
}

export default {getAllLoyaltyCards};