import express from "express";
import customerService from '../service/customer.service';

/**
 * @swagger
 *   components:
 *     schemas:
 *       Customer:
 *         type: object
 *         properties:
 *           id:
 *             type: number
 *             format: int64
 *           loyaltyCard:
 *               $ref: '#/components/schemas/LoyaltyCard'
 *           cars:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Car'
 *
 *       LoyaltyCard:
 *         type: object
 *         properties:
 *           id:
 *             type: number
 *             format: int64
 *           points:
 *             type: number
 *             format: int64
 *           tier:
 *             type: string
 *             description: Bronze, Silver, Gold, Platinum
 *           discountPercentage:
 *             type: number
 *             format: int64
 *           validity:
 *             type: string
 *             format: date-time
 *           totalSpent:
 *             type: number
 *             format: int64
 *
 *
 *       Transaction:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *         type:
 *           type: string
 *           description: "The type of transaction: purchase, sell, or trade"
 *         date:
 *           type: string
 *           format: date-time
 *         cars:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Car'
 *
 *     Car:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *         chassisNumber:
 *           type: integer
 *         price:
 *           type: integer
 *         brand:
 *           type: string
 *         model:
 *           type: string
 *         condition:
 *           type: string
 *         status:
 *           type: string
 */

const customerRouter = express.Router();

/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Get a list of customers
 *     responses:
 *       200:
 *         description: Successfully return a list of customers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Customer'
 */
customerRouter.get('/', async (req: express.Request, res: express.Response) => {
    try {
        const customers = await customerService.getAllCustomers();
        res.status(200).json(customers);
    } catch(error) {
        throw new Error("Could not catch object in controller")
    }
})

/**
 * @swagger
 * /customers/{id}:
 *   get:
 *     summary: get customer by USER ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: returned customer by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 */
customerRouter.get('/:id', async (req: express.Request, res: express.Response) => {
    try {
        const id = parseInt(req.params.id);
        const customer = await customerService.getCustomerByUserId(id);
        res.status(200).json(customer);
    }catch(error) {
        throw new Error("Could not catch object in controller: " + error)
    }
})

export default customerRouter;