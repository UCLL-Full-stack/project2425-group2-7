const getAllCars = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL + "/car_acquisition";

    return fetch(apiUrl, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
}

const CarService = {
    getAllCars,
}

export default CarService;