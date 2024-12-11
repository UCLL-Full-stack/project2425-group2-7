import {User} from "../model/user";
import userDb from "../repository/user.db";
import {UserInputRegister} from "../types";

const getAllUsers = async (): Promise<User[]> => {
    return await userDb.getAllUsers();
}

const registerUser = async ({username, firstName, lastName, email, password, role}: UserInputRegister): Promise<User> => {
    try {
        const user = new User({username, firstName, lastName, email, password, role});
        await userDb.registerUser(user)
        return await userDb.getUserByUsername(username)
    } catch (error) {
        throw new Error("Error in the registerUser service function")
    }

}

export default {
    getAllUsers,
    registerUser,
}