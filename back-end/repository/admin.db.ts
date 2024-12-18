import {Admin} from "../model/admin";
import database from "./database";

const getAllAdmins = async (): Promise<Admin[]> =>{
    try {
        const admins = await database.admin.findMany({
            include: {
                user: true
            }
        })

        return admins.map((admin) => Admin.from(admin))
    } catch (error) {
        console.log(error)
        throw error;
    }
}

const findAdminByUserId = async (id: number | undefined)=> {
    try {
        const admin = await database.admin.findUnique({
            where: {
                userId: id
            },
            include: {
                user: true
            }
        })
        if (!admin) {
            return null
        }
        return Admin.from(admin);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default {
    getAllAdmins,
    findAdminByUserId,
}

