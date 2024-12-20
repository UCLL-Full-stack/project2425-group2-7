import express, { Request, Response, NextFunction } from 'express';
import loyaltyCardService from "../service/loyaltyCard.service";

/**
 * @swagger
 * components:
 *   schemas:
 *     LoyaltyCard:
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
 */
const loyaltyCardRouter = express.Router();

/**
 * @swagger
 * /loyaltyCards:
 *   get:
 *     summary: Get a full list of all loyalty cards
 *     responses:
 *       200:
 *         description: successfully return a list of all loyalty cards
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LoyaltyCard'
 */
loyaltyCardRouter.get('/', async (req: Request, res: Response, next) => {
    try {
        const loyaltyCards = await loyaltyCardService.getAllLoyaltyCards();
        res.status(200).json(loyaltyCards);
    } catch(error) {
        next(error)
    }
})

export default loyaltyCardRouter;