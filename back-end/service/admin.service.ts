import adminDb from "../repository/admin.db";
import userDb from "../repository/user.db";

const getAllAdmins = async () => {
    return await adminDb.getAllAdmins();
}

const addAdmin = async (userId?: number, username?: string) => {
    if (await userDb.findAdminByUsername())
    return await adminDb.addAdmin(userId)
}

export default {
    getAllAdmins,
}