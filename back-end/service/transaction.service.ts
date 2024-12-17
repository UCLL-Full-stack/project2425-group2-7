import transactionsDb from "../repository/transactions.db";
import {Transaction, TransactionInput} from "../types";

const getAllTransactions = () => {
    return transactionsDb.getAllTransactions();
}

const addTransaction = (transaction: TransactionInput) => {
    try {
        return transactionsDb.addTransaction(transaction);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default {getAllTransactions, addTransaction};