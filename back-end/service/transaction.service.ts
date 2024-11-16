import transactionsDb from "../repository/transactions.db";

const getAllTransactions = () => {
    return transactionsDb.getAllTransactions();
}

export default {getAllTransactions};