import {User} from "../model/user";
import database from "./database";

const getAllUsers = async (): Promise<User[]> => {
    try {
        const users = await database.user.findMany()
        return users.map((user) => User.from(user))
    } catch (error) {
        throw new Error("Problem with fetching in user repository")
    }
}

const getUserByUsername = async (username: string): Promise<User> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: { username },
        });

        if (!userPrisma) {
            throw new Error("User not found");
        }
        return User.from(userPrisma);
    } catch (error) {
        console.error('Error fetching user by username:', error);
        throw error;
    }
}

const registerUser = async ({username, firstName, lastName, email, password, role}: User): Promise<void> => {
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
    } catch (error) {
        throw new Error("Problem with creating in user repository")
    }
}

export default {
    getAllUsers,
    registerUser,
    getUserByUsername
}