import {Customer} from "../model/customer";
import database from "./database";

const getAllCustomers = async (): Promise<Customer[]> => {
    try {
        const customers = await database.customer.findMany({
            include: {loyaltyCard: true, cars: true, user: true}
        })
        return customers.map((customer) => Customer.from(customer));
    } catch(error) {
        throw new Error("Problem with fetching in customer repository")
    }
}

export default {
    getAllCustomers,
}