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
}