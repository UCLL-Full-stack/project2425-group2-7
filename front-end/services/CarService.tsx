import {Car} from "@types";

const getAllCars = async () => {
    // const token = JSON.parse(sessionStorage.getItem("loggedInUser") || "{}")?.token;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL + "/car_acquisition";
    return fetch(apiUrl, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
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
    getAllCars,addCar,
}

export default CarService;