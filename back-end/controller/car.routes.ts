import express, { NextFunction, Request, Response } from 'express';
import carService from '../service/car.service';
import {CarInput} from "../types";

const carRouter = express.Router();

carRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cars = carService.getAllCars();
        res.status(200).json(cars);
    } catch (error) {
        next(error);
    }
});

carRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const car = <CarInput>req.body;
        const result = await carService.addCar(req.body);
        res.status(200).json(result)
    } catch (error){
        next(error)
    }
})

export { carRouter};