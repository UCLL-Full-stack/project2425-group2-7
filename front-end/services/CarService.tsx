import {Car} from "@types";

/**
 * when calling this function from the frontend pages, you also pass in a parameter token. after the parameter, add the
 * Authorization: Bearer token
 * to give it to the backend in the header (see car.routes.ts next)
 * @param token
 */
// token: string
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