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
                id: id
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
// should just make a new entity admin with the user id given
const addAdmin = async(userId: number) => {
    try {
        const adminPrisma = await database.admin.create({
            data: {
                user: {
                    connect: {id: userId}
                }
            },
            include: {
                user: true
            }
        });
        return Admin.from(adminPrisma)
    }catch(error) {
        throw error;
    }
}

export default {
    getAllAdmins,
    findAdminByUserId,
    addAdmin,
}

