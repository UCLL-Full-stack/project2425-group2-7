import {Car} from "../../model/car";

describe("CarHappy", () => {
    test("given correct details when making new car then new car is made", () => {
        const car = new Car({
            brand: "Mazda",
            chassisNumber: 4,
            model: "MX5",
            price: 35000,
            condition: "NEW",
            status: "IN_STOCK"
        });

        expect(car.getCondition()).toEqual("NEW");
        expect(car.getBrand()).toEqual("Mazda");
        expect(car.getModel()).toEqual("MX5");
        expect(car.getPrice()).toEqual(35000);
        expect(car.getStatus()).toEqual("IN_STOCK");
        expect(car.getChassisNumber()).toEqual(4);
    })
})

describe("CarUnhappy", () => {
    test("given negative price when making new car then throw error", () => {
        expect(() => {
            new Car({
                brand: "Mazda",
                chassisNumber: 4,
                model: "MX5",
                price: -1000,
                condition: "NEW",
                status: "IN_STOCK"
            })
        }).toThrow("Car price cannot be negative");
    });
})