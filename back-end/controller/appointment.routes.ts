import express from "express";
import AppointmentService from "../service/appointment.service";
import {AppointmentInput} from "../types";
import appointmentService from "../service/appointment.service";

const appointmentRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Customer:
 *         type: object
 *         properties:
 *           id:
 *             type: number
 *             format: int64
 *           loyaltyCard:
 *               $ref: '#/components/schemas/LoyaltyCard'
 *           cars:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Car'
 *     AppointmentInput:
 *       type: object
 *       properties:
 *         date:
 *           type: string
 *           format: date-time
 *         customerUsername:
 *           type: string
 *         adminUsername:
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
 *     Appointment:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         date:
 *           type: string
 *           format: date-time
 *         customer:
 *           $ref: '#/components/schemas/User'
 *         admin:
 *           $ref: '#/components/schemas/User'
 *
 */

/**
 * @swagger
 * /appointment:
 *   get:
 *     summary: get all appointments
 *     responses:
 *       200:
 *         description: list of appointments
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 *
 */
appointmentRouter.get('/', async (req, res) => {
    try {
        const appointments = await AppointmentService.getAllAppointments();
        res.status(200).json(appointments);
    } catch (error) {
        console.log("Could not catch object in controller: " + error)
        throw error;
    }
})

/**
 * @swagger
 * /appointment/add_appointment:
 *   post:
 *     summary: add an appointment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AppointmentInput'
 *     responses:
 *       200:
 *         description: added an appointment, the returned object
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Appointment'
 */

appointmentRouter.post('/add_appointment', async (req: express.Request, res: express.Response) => {
    try {
        const appointmentInput = req.body as AppointmentInput;
        const result = await appointmentService.addAppointment(appointmentInput);
        res.status(200).json(result);
    } catch(error) {
        console.log("Could not catch object in controller: " + error)
        throw error;
    }
})
export default appointmentRouter;