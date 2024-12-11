import {User} from "../model/user";
import userDb from "../repository/user.db";

const getAllUsers = async (): Promise<User[]> => {
    return await userDb.getAllUsers();
}

export default {
    getAllUsers,
}