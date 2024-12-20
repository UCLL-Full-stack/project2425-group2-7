import {Customer} from "../../model/customer";

describe('CustomerHappy', () => {
    test("Given valid details when creating new user then user is added", () => {
        const customer = new Customer({
            name: "Habibi",
            email: "habibi@example.com",
        });
        return new Customer({
                        id,
                        user: User.from(user),
                        loyaltyCard: undefined,
                        cars: cars.map((car) => Car.from(car))
                    });

        expect(customer.getCars()).toBe(undefined);
        expect(customer.getPurchaseHistory()).toEqual([]);
        expect(customer.getLoyaltyCard()).toEqual(undefined);
    })
})

describe("CarUnhappy", () => {

})