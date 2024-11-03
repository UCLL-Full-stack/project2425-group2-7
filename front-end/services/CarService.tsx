import {Car} from "@types";

const getAllCars = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL + "/car_acquisition";
    console.log(apiUrl);

    return fetch(apiUrl, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
}

const addCar = async (car: Car) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/car_acquisition", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(car),
    });
}

const CarService = {
    getAllCars,
}

export default CarService;