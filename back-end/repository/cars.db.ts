import { Car } from "../model/car";
import {CarInput} from "../types";

const cars: Car[] =[
    new Car({
        chassisNumber: 12345,
        price: 20000,
        brand: "Toyota",
        model: "Corolla",
        condition: "New",
        status: "IN_STOCK"
    }), 
    new Car({
        chassisNumber: 12,
        price: 30000,
        brand: "Toyota",
        model: "Camry",
        condition: "New",
        status: "IN_STOCK"
    })

];

const addCar = (car: Car) =>{
    cars.push(car);
    return car;
}
const getAllCars = (): Car[] => {
    return cars;
}

export default {
    addCar,
    getAllCars
}