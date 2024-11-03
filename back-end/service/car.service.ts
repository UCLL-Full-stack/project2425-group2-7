import carsDb from "../repository/cars.db";
import {Car} from "../model/car";

const getAllCars = (): Car[] => {
    return carsDb.getAllCars();
}

const addCar = (car: Car) => {
    carsDb.addCar(car);
}

export default {
    getAllCars,
    addCar,
}