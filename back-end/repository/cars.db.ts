import { Car } from "../model/car";

const cars: Car[] =[
    new Car({
        chasisNumber: 12345,
        price: 20000,
        brand: "Toyota",
        model: "Corolla",
        condition: "New",
        status: "IN_STOCK"
    }), 
    new Car({
        chasisNumber: 12,
        price: 30000,
        brand: "Toyota",
        model: "Camry",
        condition: "New",
        status: "IN_STOCK"
    })

];

const addCar = (car: Car) =>{
    cars.push(car);
}
const getAllCars = (): Car[] => {
    return cars;
}

export default {
    addCar,
    getAllCars
}