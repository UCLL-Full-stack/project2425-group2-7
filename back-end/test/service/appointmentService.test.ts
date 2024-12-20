import appointmentService from '../../service/appointment.service';
import appointmentDb from '../../repository/appointment.db';
import adminDb from '../../repository/admin.db';
import customersDb from '../../repository/customers.db';
import { Admin } from '../../model/admin';
import { Customer } from '../../model/customer';
import { Appointment } from '../../model/appointment';
import { AppointmentInput, DeleteAppointmentInput, PutAdminToAppointmentInput } from '../../types';

// Mock all dependencies
jest.mock('../../repository/appointment.db');
jest.mock('../../repository/admin.db');
jest.mock('../../repository/customers.db');

describe('AppointmentService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllAppointments', () => {
        test('should return all appointments', async () => {
            const mockAppointments = [
                new Appointment({
                    id: 1,
                    date: new Date('2025-01-01'),
                    customers: [{} as Customer],
                    admins: [] as Admin[]
                })
            ];

            (appointmentDb.getAllAppointments as jest.Mock).mockResolvedValue(mockAppointments);

            const result = await appointmentService.getAllAppointments();

            expect(result).toEqual(mockAppointments);
            expect(appointmentDb.getAllAppointments).toHaveBeenCalledTimes(1);
        });

        test('should handle errors when getting appointments', async () => {
            const error = new Error('Database error');
            (appointmentDb.getAllAppointments as jest.Mock).mockRejectedValue(error);

            await expect(appointmentService.getAllAppointments()).rejects.toThrow(error);
        });
    });

    describe('addAppointment', () => {
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 7);

        const mockInput: AppointmentInput = {
            date: futureDate,
            adminId: 1,
            customerId: 1
        };

        const mockAdmin = new Admin({ id: 1, user: {} as any });
        const mockCustomer = new Customer({ id: 1, user: {} as any });

        test('should successfully add appointment', async () => {
            (adminDb.findAdminByUserId as jest.Mock).mockResolvedValue(mockAdmin);
            (customersDb.findCustomerByUserId as jest.Mock).mockResolvedValue(mockCustomer);
            (appointmentDb.getAllAppointments as jest.Mock).mockResolvedValue([]);
            (appointmentDb.addAppointment as jest.Mock).mockResolvedValue(new Appointment({
                date: futureDate,
                customers: [mockCustomer],
                admins: [mockAdmin]
            }));

            const result = await appointmentService.addAppointment(mockInput);

            expect(result).toBeDefined();
            expect(appointmentDb.addAppointment).toHaveBeenCalledWith(
                mockInput.date,
                mockCustomer,
                [mockAdmin]
            );
        });

        test('should throw error when admin not found', async () => {
            (adminDb.findAdminByUserId as jest.Mock).mockResolvedValue(null);

            await expect(appointmentService.addAppointment(mockInput))
                .rejects
                .toThrow('Admin not found');
        });

        test('should throw error when customer not found', async () => {
            (adminDb.findAdminByUserId as jest.Mock).mockResolvedValue(mockAdmin);
            (customersDb.findCustomerByUserId as jest.Mock).mockResolvedValue(null);

            await expect(appointmentService.addAppointment(mockInput))
                .rejects
                .toThrow('Customer not found');
        });

        test('should throw error when appointment already exists for that day', async () => {
            (adminDb.findAdminByUserId as jest.Mock).mockResolvedValue(mockAdmin);
            (customersDb.findCustomerByUserId as jest.Mock).mockResolvedValue(mockCustomer);
            (appointmentDb.getAllAppointments as jest.Mock).mockResolvedValue([
                new Appointment({
                    date: futureDate,
                    customers: [mockCustomer],
                    admins: [mockAdmin]
                })
            ]);

            await expect(appointmentService.addAppointment(mockInput))
                .rejects
                .toThrow('Appointment already exists for that day');
        });

        test('should throw error when date is in the past', async () => {
            const pastDate = new Date();
            pastDate.setDate(pastDate.getDate() - 1);

            const pastInput: AppointmentInput = {
                ...mockInput,
                date: pastDate
            };

            await expect(appointmentService.addAppointment(pastInput))
                .rejects
                .toThrow('The appointment date must be in the future.');
        });
    });

    describe('deleteAppointment', () => {
        const mockDeleteInput: DeleteAppointmentInput = {
            id: 1
        };

        test('should successfully delete appointment', async () => {
            const mockAppointment = new Appointment({
                id: 1,
                date: new Date(),
                customers: [{} as Customer],
                admins: [] as Admin[]
            });

            (appointmentDb.deleteAppointment as jest.Mock).mockResolvedValue(mockAppointment);

            const result = await appointmentService.deleteAppointment(mockDeleteInput);

            expect(result).toEqual(mockAppointment);
        });

        test('should throw error when appointment not found', async () => {
            (appointmentDb.deleteAppointment as jest.Mock).mockResolvedValue(null);

            await expect(appointmentService.deleteAppointment(mockDeleteInput))
                .rejects
                .toThrow('Appointment not found');
        });
    });

    describe('putAdminToAppointment', () => {
        const mockInput: PutAdminToAppointmentInput = {
            appointmentId: 1,
            adminId: 1
        };

        test('should successfully add admin to appointment', async () => {
            const mockAdmin = new Admin({ id: 1, user: {} as any });
            const mockAppointment = new Appointment({
                id: 1,
                date: new Date(),
                customers: [{} as Customer],
                admins: [mockAdmin]
            });

            (adminDb.findAdminByUserId as jest.Mock).mockResolvedValue(mockAdmin);
            (appointmentDb.putAdminToAppointment as jest.Mock).mockResolvedValue(mockAppointment);

            const result = await appointmentService.putAdminToAppointment(mockInput);

            expect(result).toEqual(mockAppointment);
        });

        test('should throw error when admin not found', async () => {
            (adminDb.findAdminByUserId as jest.Mock).mockResolvedValue(null);

            await expect(appointmentService.putAdminToAppointment(mockInput))
                .rejects
                .toThrow('Admin not found');
        });

        test('should throw error when appointment not found', async () => {
            const mockAdmin = new Admin({ id: 1, user: {} as any });
            (adminDb.findAdminByUserId as jest.Mock).mockResolvedValue(mockAdmin);
            (appointmentDb.putAdminToAppointment as jest.Mock).mockResolvedValue(null);

            await expect(appointmentService.putAdminToAppointment(mockInput))
                .rejects
                .toThrow('Appointment or admin not found');
        });
    });
});