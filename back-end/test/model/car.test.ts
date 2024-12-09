import {Car} from "../../model/car";

describe("CarHappy", () => {

    test("given correct details when making new car then new car is made", () => {
        const car = new Car({
            brand: "Mazda",
            chassisNumber: 4,
            model: "MX5",
            price: 35000,
            condition: "ait",
            status: "RESERVED"
        });

        expect(car.getCondition()).toEqual("ait");
        expect(car.getBrand()).toEqual("Mazda");
        expect(car.getModel()).toEqual("MX5");
        expect(car.getPrice()).toEqual(35000);
        expect(car.getStatus()).toEqual("RESERVED");
        expect(car.getChassisNumber()).toEqual(4);
    })


})

describe("CarUnhappy", () => {


})