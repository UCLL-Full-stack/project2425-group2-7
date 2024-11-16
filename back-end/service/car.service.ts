import carsDb from "../repository/cars.db";
import {Car} from "../model/car";
import {CarInput} from "../types";

const getAllCars = async (): Promise<Car[]> => {
    return await carsDb.getAllCars();
}

const addCar = ({chassisNumber, price, brand, model, condition, status}: CarInput): Car => {
    const car = new Car({chassisNumber, price, brand, model, condition, status});
    return <Car>carsDb.addCar(car);
}

export default {
    getAllCars,
    addCar,
}