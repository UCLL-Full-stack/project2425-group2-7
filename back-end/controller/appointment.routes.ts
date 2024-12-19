import express from "express";
import AppointmentService from "../service/appointment.service";
import {AppointmentInput, DeleteAppointmentInput, PutAdminToAppointmentInput} from "../types";
import appointmentService from "../service/appointment.service";

const appointmentRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     DeleteAppointmentInput:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *     PutAdminToAppointmentInput:
 *       type: object
 *       properties:
 *         adminId:
 *           type: number
 *           format: int64
 *         appointmentId:
 *           type: number
 *           format: int64
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
 *         customerId:
 *           type: number
 *           format: int64
 *         adminId:
 *           type: number
 *           format: int64
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
        console.log("customer id in controller:", appointmentInput.customerId);
        res.status(200).json(result);
    } catch(error) {
        console.log("Could not catch object in controller: " + error)
        throw error;
    }
})

/**
 * @swagger
 * /appointment/delete_appointment:
 *   delete:
 *     summary: Delete an appointment by ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeleteAppointmentInput'
 *
 *     responses:
 *       200:
 *         description: The deleted appointment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 *       400:
 *         description: Invalid request or missing parameters
 *       404:
 *         description: Appointment not found
 */

appointmentRouter.delete('/delete_appointment', async (req: express.Request, res: express.Response) => {
    try {
        const appointmentInputDelete = req.body as DeleteAppointmentInput;
        const result = await appointmentService.deleteAppointment(appointmentInputDelete);
        res.status(200).json(result);
    } catch(error) {
        console.log("Could not catch object in controller: " + error)
        throw error;
    }
})

/**
 * @swagger
 * /appointment/update_appointment:
 *   put:
 *     summary: Edit the admin from an appointment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PutAdminToAppointmentInput'
 *
 *     responses:
 *       200:
 *         description: The updated appointment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 *       400:
 *         description: Invalid request or missing parameters
 *       404:
 *         description: Appointment not found
 */
appointmentRouter.put('/update_appointment', async (req: express.Request, res: express.Response) => {
    try {
        const input = req.body as PutAdminToAppointmentInput;
        const result = await appointmentService.putAdminToAppointment(input)
        res.status(200).json(result);
    } catch (error) {
        console.log("Could not catch object in controller: " + error)
        throw error;
    }
})
export default appointmentRouter;