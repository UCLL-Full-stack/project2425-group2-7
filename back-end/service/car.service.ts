import carsDb from "../repository/cars.db";
import {Car} from "../model/car";
import {CarInput} from "../types";
import {UnauthorizedError} from "express-jwt";

/**
 * the parameter role takes in the role thats present in the JWT token when you're logged in. it uses an if statement to see if its true, else
 * return an error. this should be an UnauthorizedError but i couldn't figure out how to do it properly so Error will have to do
 *the repository doesnt need anything
 * @param role
 */
const getAllCars = async ( role: string): Promise<Car[]> => {
    try {
        if (role == "ADMIN"|| role == "CUSTOMER") {
            return await carsDb.getAllCars()
        } else{
            throw new Error("You are not authorized")
        }
    } catch (error) {
        throw new Error("You are not authorized")
    }
}

const addCar = async ({chassisNumber, price, brand, model, condition, status}: CarInput): Promise<Car> => {
    const car = new Car({chassisNumber, price, brand, model, condition, status});
    return carsDb.addCar(car);
}

export default {
    getAllCars,
    addCar,
}