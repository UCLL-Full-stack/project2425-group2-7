import {Customer} from "@prisma/client";
import database from "./database";

const getAllCustomers = async (): Promise<Customer[]> => {
    try {
        return await database.customer.findMany({
            include: {loyaltyCard: true}
        })
    } catch(error) {
        throw new Error("Problem with fetching in repository")
    }
}

export default {
    getAllCustomers,
}