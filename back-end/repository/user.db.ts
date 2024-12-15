import {User} from "../model/user";
import database from "./database";
import {UserInputRegister} from "../types";

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

const loginUser = async ({username, password}: User): Promise<User | null> => {
    return null
}

export default {
    getAllUsers,
    registerUserDb,
    getUserByUsername,
    loginUser,
}