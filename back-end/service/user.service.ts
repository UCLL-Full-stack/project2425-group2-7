import {User} from "../model/user";
import userDb from "../repository/user.db";
import {UserInputLogin, UserInputRegister} from "../types";

const getAllUsers = async (): Promise<User[]> => {
    return await userDb.getAllUsers();
}

const registerUser = async ({username, firstName, lastName, email, password, role}: UserInputRegister): Promise<User> => {
    try {
        const user = new User({username, firstName, lastName, email, password, role});

        const users = await userDb.getAllUsers();
        users.forEach((userDb) => {
            if (userDb.equals(user)) {
                throw new Error("This email or username has already been taken")
            }
        })
        return await userDb.registerUserDb(user)
    } catch (error) {
        console.log(error)
        throw new Error("service error");
    }

}

const loginUser = async ({username, password}: UserInputLogin): Promise<null> => {
    return null
}

export default {
    getAllUsers,
    registerUser,
}