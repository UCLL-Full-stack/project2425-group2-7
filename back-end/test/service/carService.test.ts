import carService from '../../service/car.service';
import carsDb from '../../repository/cars.db';
import { Car } from '../../model/car';
import { CarInput } from '../../types';

// Mock dependencies
jest.mock('../../repository/cars.db');

describe('CarService', () => {
    // Reset all mocks before each test
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllCars', () => {
        test('should return all cars from database', async () => {
            const mockCars = [
                new Car({
                    chassisNumber: 1232,
                    price: 50000,
                    brand: "BMW",
                    model: "m4",
                    condition: "USED",
                    status: "IN_STOCK"
                }),
                new Car({
                    chassisNumber: 2345,
                    price: 60000,
                    brand: "Audi",
                    model: "R8",
                    condition: "NEW",
                    status: "IN_STOCK"
                }),
                new Car({
                    chassisNumber: 3456,
                    price: 80000,
                    brand: "Land Rover",
                    model: "Range Rover",
                    condition: "NEW",
                    status: "SOLD"
                }),
                new Car({
                    chassisNumber: 4647,
                    price: 10000,
                    brand: "Toyota",
                    model: "Yaris",
                    condition: "NEW",
                    status: "IN_STOCK"
                })
            ];

            (carsDb.getAllCars as jest.Mock).mockResolvedValue(mockCars);

            const result = await carService.getAllCars();

            expect(result).toEqual(mockCars);
            expect(carsDb.getAllCars).toHaveBeenCalledTimes(1);
        });
    });

    describe('addCar', () => {
        test('should successfully add new car', async () => {
            const mockCarInput: CarInput = {
                chassisNumber: 5555,
                price: 55000,
                brand: "BMW",
                model: "M3",
                condition: "NEW",
                status: "IN_STOCK"
            };

            const expectedCar = new Car(mockCarInput);

            (carsDb.addCar as jest.Mock).mockResolvedValue(expectedCar);

            const result = await carService.addCar(mockCarInput);

            expect(result).toEqual(expectedCar);
            expect(carsDb.addCar).toHaveBeenCalledWith(expect.any(Car));
            expect(carsDb.addCar).toHaveBeenCalledTimes(1);
        });

        test('should throw error when car has negative price', async () => {
            const invalidCarInput: CarInput = {
                chassisNumber: 6666,
                price: -50000,  // Negative price
                brand: "BMW",
                model: "M5",
                condition: "NEW",
                status: "IN_STOCK"
            };

            await expect(carService.addCar(invalidCarInput))
                .rejects
                .toThrow("Car price cannot be negative");

            expect(carsDb.addCar).not.toHaveBeenCalled();
        });
    });
});