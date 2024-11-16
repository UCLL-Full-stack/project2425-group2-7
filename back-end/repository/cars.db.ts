import { Car } from "../model/car";
import {CarInput} from "../types";
import database from "./database";

const cars: Car[] =[];

const addCar = (car: Car) =>{
    cars.push(car);
    return car;
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