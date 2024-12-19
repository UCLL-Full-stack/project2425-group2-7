import express from "express";
import adminService from "../service/admin.service";
import {AdminInput} from "../types";


const adminRouter = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         username:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         role:
 *           type: string
 *     Admin:
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         user:
 *           $ref: '#/components/schemas/User'
 *     AdminInput:
 *       properties:
 *         userId:
 *           type: number
 *           format: int64
 */

/**
 * @swagger
 * /admins:
 *   get:
 *     summary: get a list of admins
 *     responses:
 *       200:
 *         description: list of all admins
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 */
adminRouter.get('/', async (req, res) => {
    try {
        const admins = await adminService.getAllAdmins();
        res.status(200).json(admins);
    }catch(error) {
        console.log("Could not catch object in controller: " + error)
        throw error;
    }
})
/**
 * @swagger
 * /admins/add:
 *   post:
 *     summary: register an admin as admin class
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdminInput'
 *     responses:
 *       200:
 *         description: a returned admin
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 */
adminRouter.post('/add', async (req: express.Request, res: express.Response) => {
    try {
        const adminInput = req.body as AdminInput;
        const result = await adminService.addAdmin(adminInput.userId);
        res.status(200).json(result);
    } catch(error) {
        throw error;
    }
})
/**
 * @swagger
 * /admins/{id}:
 *   get:
 *     summary: get admin by USER ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: returned admin by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 */
adminRouter.get('/:id', async (req: express.Request, res: express.Response) => {
    try {
        const admin = await adminService.getAdminByUserId(Number(req.params.id));
        res.status(200).json(admin);
    } catch(error) {
        console.log("Could not catch object in controller: " + error)
        throw error;
    }
})



export default adminRouter;