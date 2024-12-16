import express from "express";
import transactionService from '../service/transaction.service';
import {TransactionInput} from "../types";

/**
 * @swagger
 * components:
 *   schemas:
 *     Car:
 *        type: object
 *        properties:
 *          chassisNumber:
 *            type: number
 *            format: int64
 *
 *          price:
 *            type: number
 *            format: int64
 *          brand:
 *            type: string
 *            description: brand of the vehicle
 *          model:
 *            type: string
 *            description: model of the vehicle
 *          condition:
 *            type: string
 *            description: state of the car
 *          status:
 *            type: string
 *            description: car status
 *
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         username:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         role:
 *           type: string
 *
 *     TransactionInput:
 *       type: object
 *       properties:
 *         typeTransaction:
 *           type: string
 *         date:
 *           type: string
 *           format: date-time
 *         carsId:
 *           type: array
 *           items:
 *             type: number
 *             format: int64
 *         customerId:
 *           type: number
 *           format: int64
 *
 *     Transaction:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         typeTransaction:
 *           type: string
 *         date:
 *           type: string
 *           format: date-time
 *         cars:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Car'
 *         customer:
 *           $ref: '#/components/schemas/Customer'
 *
 *
 *
 */
const transactionRouter = express.Router();
/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Get a list of transactions
 *     responses:
 *       200:
 *         description: Returned list of transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 */
transactionRouter.get('/', async (req: express.Request, res: express.Response) => {
    try {
        const transactions = await transactionService.getAllTransactions();
        res.status(200).json(transactions);
    } catch(error) {
        throw new Error("Could not catch object in controller: " + error)
    }
})


/**
 * @swagger
 * /transactions/add:
 *   post:
 *     summary: Add a transaction to the DB
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TransactionInput'
 *     responses:
 *       200:
 *         description: Returned transaction object from DB
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/Transaction'
 *
 */
transactionRouter.post('/add', async (req: express.Request, res: express.Response) => {
    try {
        const transaction = <TransactionInput>req.body;
        const result = await transactionService.addTransaction(transaction);
        res.status(200).json(result);
    } catch(error) {
        console.log(error);
        throw new Error("Could not catch object in controller: " + error)
    }
})

export default transactionRouter;