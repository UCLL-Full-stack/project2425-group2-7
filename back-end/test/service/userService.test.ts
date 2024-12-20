import userService from '../../service/user.service';
import userDb from '../../repository/user.db';
import bcrypt from 'bcrypt';
import jwt from '../../util/jwt';
import { User } from '../../model/user';
import { UserInputRegister, UserInputLogin } from '../../types';

jest.mock('../../repository/user.db');
jest.mock('bcrypt');
jest.mock('../../util/jwt');

describe('UserService', () => {
    // Reset all mocks before each test
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllUsers', () => {
        test('should return all users from database', async () => {
            const mockUsers = [
                new User({
                    username: 'admin',
                                password: await bcrypt.hash('admin123', 12),
                                firstName: 'admin',
                                lastName: 'admin',
                                email: 'administration@ucll.be',
                                role: 'ADMIN',
                }),
                new User({
                    username: 'Dodo',
                                password: await bcrypt.hash('love123', 12),
                                firstName: 'sarah',
                                lastName: 'Doe',
                                email: 'dodo@ucll.be',
                                role: 'CUSTOMER',
                })
            ];

            (userDb.getAllUsers as jest.Mock).mockResolvedValue(mockUsers);

            const result = await userService.getAllUsers();

            expect(result).toEqual(mockUsers);
            expect(userDb.getAllUsers).toHaveBeenCalledTimes(1);
        });
    });

    describe('registerUser', () => {
        const mockUserInput: UserInputRegister = {
            username: 'newuser',
            firstName: 'New',
            lastName: 'User',
            email: 'new@example.com',
            password: 'password123',
            role: 'CUSTOMER'
        };

        test('should successfully register new user', async () => {
            const hashedPassword = 'hashedpassword123';
            const expectedUser = new User({...mockUserInput, password: hashedPassword});

            (userDb.getUserByUsername as jest.Mock).mockResolvedValue(null);
            (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
            (userDb.registerUserDb as jest.Mock).mockResolvedValue(expectedUser);

            const result = await userService.registerUser(mockUserInput);

            expect(result).toEqual(expectedUser);
            expect(userDb.getUserByUsername).toHaveBeenCalledWith(mockUserInput.username);
            expect(bcrypt.hash).toHaveBeenCalledWith(mockUserInput.password, 8);
            expect(userDb.registerUserDb).toHaveBeenCalledWith({
                ...mockUserInput,
                password: hashedPassword
            });
        });

        test('should throw error if username already exists', async () => {
            const existingUser = new User({...mockUserInput, password: 'existing'});
            
            (userDb.getUserByUsername as jest.Mock).mockResolvedValue(existingUser);

            await expect(userService.registerUser(mockUserInput))
                .rejects
                .toThrow('Username already exists');
            
            expect(bcrypt.hash).not.toHaveBeenCalled();
            expect(userDb.registerUserDb).not.toHaveBeenCalled();
        });
    });

    describe('login', () => {
        const mockLoginInput: UserInputLogin = {
            username: 'testuser',
            password: 'password123'
        };

        const mockUser = new User({
            username: 'testuser',
            firstName: 'Test',
            lastName: 'User',
            email: 'test@example.com',
            password: 'hashedpassword',
            role: 'CUSTOMER'
        });

        test('should successfully login user', async () => {
            const mockToken = 'jwt.token.here';

            (userDb.getUserByUsername as jest.Mock).mockResolvedValue(mockUser);
            (bcrypt.compare as jest.Mock).mockResolvedValue(true);
            (jwt.generateJwtToken as jest.Mock).mockReturnValue(mockToken);

            const result = await userService.login(mockLoginInput);

            expect(result).toEqual({
                token: mockToken,
                username: mockUser.getUsername(),
                fullName: `${mockUser.getFirstName()} ${mockUser.getLastName()}`,
                role: mockUser.getRole()
            });

            expect(userDb.getUserByUsername).toHaveBeenCalledWith(mockLoginInput.username);
            expect(bcrypt.compare).toHaveBeenCalledWith(
                mockLoginInput.password,
                mockUser.getPassword()
            );
            expect(jwt.generateJwtToken).toHaveBeenCalledWith({
                username: mockUser.getUsername(),
                role: mockUser.getRole()
            });
        });

        test('should throw error if user does not exist', async () => {
            (userDb.getUserByUsername as jest.Mock).mockResolvedValue(null);

            await expect(userService.login(mockLoginInput))
                .rejects
                .toThrow('User does not exist');
            
            expect(bcrypt.compare).not.toHaveBeenCalled();
            expect(jwt.generateJwtToken).not.toHaveBeenCalled();
        });

        test('should throw error if password is incorrect', async () => {
            (userDb.getUserByUsername as jest.Mock).mockResolvedValue(mockUser);
            (bcrypt.compare as jest.Mock).mockResolvedValue(false);

            await expect(userService.login(mockLoginInput))
                .rejects
                .toThrow('Username and password combination does not match');
            
            expect(jwt.generateJwtToken).not.toHaveBeenCalled();
        });
    });
});