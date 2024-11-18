import database from './database';
import {Transaction} from "../model/transaction";

const getAllTransactions = async () => {
    try {
        const transactions = await database.transaction.findMany({include: {cars: true, customer: {include: {
                        loyaltyCard: true,
                        cars: true
                    }}}})
        return transactions.map((transaction) => Transaction.from(transaction));
    } catch(error) {
        throw new Error("Problem with fetching in repository transactions")
    }
};

export default {getAllTransactions};