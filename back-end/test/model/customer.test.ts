import {Customer} from "../../model/customer";

describe('CustomerHappy', () => {
    test("Given valid details when creating new user then user is added", () => {
        const customer = new Customer({
            name: "Habibi",
            email: "habibi@example.com",
        });

        expect(customer.getEmail()).toEqual("habibi@example.com");
        expect(customer.getName()).toEqual("Habibi");
        expect(customer.getCars()).toBe(undefined);
        expect(customer.getPurchaseHistory()).toEqual([]);
        expect(customer.getLoyaltyCard()).toEqual(undefined);
    })
})

describe("CarUnhappy", () => {

})