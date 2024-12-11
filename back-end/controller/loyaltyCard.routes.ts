import express, { Request, Response, NextFunction } from 'express';
import loyaltyCardService from "../service/loyaltyCard.service";

const loyaltyCardRouter = express.Router();

loyaltyCardRouter.get('/', async (req: Request, res: Response) => {
    try {
        const loyaltyCards = await loyaltyCardService.getAllLoyaltyCards();
        res.status(200).json(loyaltyCards);
    } catch(error) {
        throw new Error("Error catching loyaltyCards in router")
    }
})

export default loyaltyCardRouter;