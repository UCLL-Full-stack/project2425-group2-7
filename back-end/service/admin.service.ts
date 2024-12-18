import adminDb from "../repository/admin.db";
import userDb from "../repository/user.db";

const getAllAdmins = async () => {
    return await adminDb.getAllAdmins();
}

const addAdmin = async (userId: number) => {
    try{
        const user = await userDb.findAdminById(userId);
        if (!user) {
            return null;
        }
        return await adminDb.addAdmin(userId);
    }catch(error) {
        console.log(error);
        throw error;
    }
}

export default {
    getAllAdmins,
    addAdmin
}