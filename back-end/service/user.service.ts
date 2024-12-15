import {User} from "../model/user";
import userDb from "../repository/user.db";
import {AuthenticationResponse, UserInputLogin, UserInputRegister} from "../types";
import jwt from '../util/jwt';

import bcrypt from "bcrypt";

const getAllUsers = async (): Promise<User[]> => {
    return await userDb.getAllUsers();
}

const registerUser = async (userInputRegister: UserInputRegister): Promise<User> => {
    try {
        const user = await userDb.getUserByUsername(userInputRegister.username);

        // hash password so its hashed in the db
        const hashedPassword = await bcrypt.hash(userInputRegister.password, 8);

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

const login = async({username, password}: UserInputLogin): Promise<AuthenticationResponse> => {
    const user = await userDb.getUserByUsername(username);
    if (!user) {
        throw new Error("User does not exist")
    }
    const result = await bcrypt.compare(password, user.getPassword());
    const token = jwt.generateJwtToken({username: username, role: user.getRole()})



    if (!result) {
        throw new Error("Username and password combination does not match")
    }

    return {
        token: token,
        username: username,
        fullName: `${user.firstName} ${user.lastName}`,
        role: user.role,
    }
}


export default {
    getAllUsers,
    registerUser,
    login,
}