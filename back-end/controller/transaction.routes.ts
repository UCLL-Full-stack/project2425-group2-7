import express from "express";
import transactionService from '../service/transaction.service';

const transactionRouter = express.Router();
transactionRouter.get('/', async (req: express.Request, res: express.Response) => {
    try {
        const transactions = await transactionService.getAllTransactions();
        res.status(200).json(transactions);
    } catch(error) {
        throw new Error("Could not catch object in controller")
    }
})

export default transactionRouter;