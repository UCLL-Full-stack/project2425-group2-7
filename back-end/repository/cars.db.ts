import { Car } from "../model/car";

const cars: Car[] = [];

const addCar = (car: Car) =>{
    cars.push(car);
}

const getAllCars = () => {
    return cars;
}

export default {
    addCar,
    getAllCars
}