import {Customer} from "../../model/customer";
import {Car} from "../../model/car";
import {Transaction} from "../../model/transaction";

describe('TransactionHappy', () => {
    test("Given valid transaction details, customer, cars when creating new transaction then new transaction is added", () => {
        const customer = new Customer({
            name: "Habibi",
            email: "habibi@example.com",
        });

        const car = new Car({
            brand: "Mazda",
            chassisNumber: 4,
            model: "MX5",
            price: 35000,
            condition: "ait",
            status: "RESERVED"
        });

        const cars = new Array<Car>();
        cars.push(car);

        const transaction = new Transaction({
            type: "Purchase",
            date: new Date(2009,9,9),
            cars: cars,
            customer: customer,
        });

        expect(transaction.getCars()).toEqual(cars);
        expect(transaction.getDate()).toEqual(new Date(2009,9,9));
        expect(transaction.getCustomer()).toEqual(customer);
        expect(transaction.getType()).toEqual("Purchase");





    })
})