import customersDb from "../repository/customers.db";

const getAllCustomers = async () => {
    return await customersDb.getAllCustomers();
}

const getCustomerByUserId = async (id: number) => {
    try {
        return customersDb.findCustomerByUserId(id)
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default {getAllCustomers, getCustomerByUserId}