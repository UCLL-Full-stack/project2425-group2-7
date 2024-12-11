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

export default {
    getAllUsers,
}