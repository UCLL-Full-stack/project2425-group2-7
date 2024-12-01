import { Car } from "../model/car";
import {CarInput} from "../types";
import database from "./database";
import {Car as CarPrisma} from '@prisma/client';

const cars: Car[] =[];

const addCar = async (car: Car): Promise<Car> => {
    try {
        const carPrisma = await database.car.create({
            data: {
                chassisNumber: car.getChassisNumber(),
                price: car.getPrice(),
                brand: car.getBrand(),
                model: car.getModel(),
                condition: car.getCondition(),
                status: car.getStatus(),
            }
        })
        return Car.from(carPrisma);
    } catch(error) {
        console.error(error);
        throw new Error('Database error. See server log for details')
    }
}
const getAllCars = async (): Promise<Car[]> => {
    try {
        const carsPrisma = await database.car.findMany()
        return carsPrisma.map((car) => Car.from(car));
    } catch(error) {
        throw new Error("Problem with fetching in repository")
    }
}

export default {
    addCar,
    getAllCars
}