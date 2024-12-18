import {User} from "../model/user";
import database from "./database";
import {UserInputRegister} from "../types";
import {Admin} from "../model/admin";
import {Customer} from "../model/customer";

const getAllUsers = async (): Promise<User[]> => {
    try {
        const users = await database.user.findMany()
        return users.map((user) => User.from(user))
    } catch (error) {
        throw new Error("Problem with fetching in user repository")
    }
}

const getUserByUsername = async (username: string): Promise<User|null> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: { username },
        });

        if (!userPrisma) {
            return null;
        }
        return User.from(userPrisma);
    } catch (error) {
        console.error('Error fetching user by username:', error);
        throw error;
    }
}

const registerUserDb = async ({username, firstName, lastName, email, password, role}: UserInputRegister): Promise<User> => {
    try {
        const userPrisma = await database.user.create({
            data: {
                username,
                firstName,
                lastName,
                email,
                password,
                role
            }
        })
        return User.from(userPrisma)
    } catch (error) {
        throw new Error("Problem with creating in user repository")
    }
}

const findCustomerByUsername = async (username: string): Promise<User|null> => {
    try{
        const user = await database.user.findUnique({
            where: {
                username: username,
                role: "CUSTOMER"
            },

        })
        if (!user) {
            return null
        } else {
            return User.from(user);
        }
    }catch(error) {
        console.log(error);
        throw error;
    }
}
const findAdminByUsername = async (username: string): Promise<User|null> => {
    try{
        const user = await database.user.findUnique({
            where: {
                username: username,
                role: "ADMIN"
            },
        })
        if (!user) {
            return null
        } else {
            return User.from(user);
        }
    }catch(error) {
        console.log(error);
        throw error;
    }
}

const findAdminById = async (userId: number): Promise<User|null> => {
    try{
        const user = await database.user.findUnique({
            where: {
                id: userId,
                role: "ADMIN"
            }
        })
        if (!user) {
            return null
        }
        return User.from(user)
    }catch(error) {
        throw error;
    }
}


export default {
    getAllUsers,
    registerUserDb,
    getUserByUsername,
    findAdminByUsername,
    findCustomerByUsername,
    findAdminById,
}