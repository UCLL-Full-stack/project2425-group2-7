import { Car } from "../model/car";

const car1: Car = new Car({
    chasisNumber: 12345,
    price: 20000,
    brand: "Toyota",
    model: "Corolla",
    condition: "New",
    status: "IN_STOCK"
});
const cars: Car[] = [car1];

const addCar = (car: Car) =>{
    cars.push(car);
}

addCar(car1);

const getAllCars = () => {
    return cars;
}

export default {
    addCar,
    getAllCars
}