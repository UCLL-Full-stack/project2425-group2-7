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

const findCustomerByUserId = async (id: number): Promise<Customer | null> => {
    try {
        const customer = await database.customer.findUnique({
            where: {
                userId: id,
            },
            include: {loyaltyCard: true, cars: true, user: true}
        })
        if (!customer) {
            return null
        }
        return Customer.from(customer);
    }catch (error) {
        console.log(error);
        throw new Error("Problem with fetching in customer repository: "+error)
    }
}

const addCustomerByUserId = async (userId: number) => {
    try {
        const customerPrisma = await database.customer.create({
            data: {
                user: {
                    connect: {id: userId}
                },
                cars: {
                    createMany: {
                        data: [],
                    },
                },
            },
            include: {
                user: true,
                cars: true,
                loyaltyCard: true
            }
        })
        return Customer.from(customerPrisma);
    } catch(error) {
        throw new Error("Problem with fetching in customer repository: "+error)
    }
}

export default {
    getAllCustomers,
    findCustomerByUserId,
    addCustomerByUserId,
}