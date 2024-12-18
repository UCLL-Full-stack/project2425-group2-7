import express from "express";
import adminService from "../service/admin.service";
import {AdminInput} from "../types";


const adminRouter = express.Router();

adminRouter.get('/', async (req, res) => {
    try {
        const admins = await adminService.getAllAdmins();
        res.status(200).json(admins);
    }catch(error) {
        console.log("Could not catch object in controller: " + error)
        throw error;
    }
})

adminRouter.get('/add', async (req: express.Request, res: express.Response) => {
    try {
        const adminInput = req.body as AdminInput;

    } catch(error) {
        throw error;
    }
})

export default adminRouter;