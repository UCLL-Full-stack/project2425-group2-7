import express, { Request, Response, NextFunction } from 'express';
import userService from "../service/user.service";
import {UserInputRegister} from "../types";

/**
 * @swagger
 * components:
 *   schemas:
 *     UserInputRegister:
 *       type: object
 *       properties:
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
 */

const userRouter = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get a list of all users
 *     responses:
 *       200:
 *         description: A list of all users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users)
    } catch (error) {
        next(error);
    }
})

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInputRegister'
 *     responses:
 *       200:
 *         description: The created user that's been registered in the db
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *
 */

userRouter.post('/', async (req: Request, res: express.Response, next:NextFunction) => {
    try {
        const user = <UserInputRegister>req.body;
        const result = await userService.registerUser(user);
        res.status(200).json(result)
    } catch (error) {
        next(error);
    }
})

export {userRouter};