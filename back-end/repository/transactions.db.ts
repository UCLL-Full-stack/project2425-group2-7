import database from './database';
import {Transaction} from "../model/transaction";
import { TransactionInput } from '../types';

const getAllTransactions = async () => {
    try {
        const transactions = await database.transaction.findMany({include: {cars: true, customer: {include: {
                        loyaltyCard: true,
                        cars: true,
                        user: true,
                    }}}})
        return transactions.map((transaction) => Transaction.from(transaction));
    } catch(error) {
        throw error
    }
};

const addTransaction = async (transactionInput: TransactionInput): Promise<Transaction> =>  {
    try {
        const transactionPrisma = await database.transaction.create({
            data: {
                typeTransaction: transactionInput.typeTransaction,
                cars: {
                    connect: transactionInput.carsId.map(id => ({id}))
                },
                customer: {
                    connect: {id: transactionInput.customerId}
                },
                date: transactionInput.date,

                // include related entities including the nested ones inside customer

            }, include: {
                cars: true,
                customer: {include: {
                    loyaltyCard: true,
                        cars: true,
                        user: true,
                    }},
            }
        })
        return Transaction.from(transactionPrisma);
    } catch(error) {
        console.log("Error in repository: " + error);
        throw error;
    }
}

export default {getAllTransactions, addTransaction};