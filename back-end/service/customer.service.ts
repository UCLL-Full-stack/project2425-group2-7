import customersDb from "../repository/customers.db";

const getAllCustomers = async () => {
    return await customersDb.getAllCustomers();
}

export default {getAllCustomers}