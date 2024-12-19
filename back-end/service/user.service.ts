import {User} from "../model/user";
import userDb from "../repository/user.db";
import {AuthenticationResponse, UserInputLogin, UserInputRegister} from "../types";
import jwt from '../util/jwt';

import bcrypt from "bcrypt";
import customersDb from "../repository/customers.db";
import adminDb from "../repository/admin.db";

const getAllUsers = async (): Promise<User[]> => {
    return await userDb.getAllUsers();
}

const registerUser = async (userInputRegister: UserInputRegister): Promise<User> => {
    try {
        const existingUser = await userDb.getUserByUsername(userInputRegister.username);
        if (existingUser) {
            throw new Error('Username already exists');
        }
        const hashedPassword = await bcrypt.hash(userInputRegister.password, 8);

        const newUser = {
            ...userInputRegister,
            password: hashedPassword
        };

        const registeredUser = await userDb.registerUserDb(newUser);
        if (registeredUser.role == "CUSTOMER"){
            await customersDb.addCustomerByUserId(registeredUser.id);
        } else {
            await adminDb.addAdmin(registeredUser.id);
        }
        return registeredUser

    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
}

const login = async({username, password}: UserInputLogin): Promise<AuthenticationResponse> => {
    const user = await userDb.getUserByUsername(username);
    if (!user) {
        throw new Error("User does not exist")
    }
    const result = await bcrypt.compare(password, user.getPassword());
    const token = jwt.generateJwtToken({username: username, role: user.getRole(), userId: user.id})

    console.log("User id: "+user.id)


    if (!result) {
        throw new Error("Username and password combination does not match")
    }

    return {
        token: token,
        username: username,
        fullName: `${user.firstName} ${user.lastName}`,
        role: user.role,
        id: user.getId()

    }
}


export default {
    getAllUsers,
    registerUser,
    login,
}