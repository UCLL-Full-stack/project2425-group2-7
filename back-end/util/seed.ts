import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { set } from 'date-fns';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.car.deleteMany();
    await prisma.customer.deleteMany();
    await prisma.loyaltyCard.deleteMany({});
    await prisma.transaction.deleteMany();
    // await prisma.role.deleteMany();
}