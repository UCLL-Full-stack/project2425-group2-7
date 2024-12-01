import express, { Request, Response, NextFunction } from 'express';
import carService from '../service/car.service';
import {CarInput} from "../types";

/**
 *@swagger
 *  components:
 *    schemas:
 *      Car:
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
 *      CarInput:
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
 *
 *
 *
 *
 */

const carRouter = express.Router();
/**
 * @swagger
 * /car_acquisition:
 *   get:
 *     summary: Get a list of all cars
 *     responses:
 *       200:
 *         description: List of all cars
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Car'
 */
carRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cars = await carService.getAllCars();
        res.status(200).json(cars);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /car_acquisition:
 *   post:
 *      summary: Add a new car to the database
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CarInput'
 *      responses:
 *         200:
 *            description: The added car.
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Car'
 */

carRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const car = <CarInput>req.body;
        const result = carService.addCar(car);
        res.status(200).json(result)
    } catch (error){
        next(error)
    }
})

export { carRouter};