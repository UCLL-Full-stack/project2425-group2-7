import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { set } from 'date-fns';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.transaction.deleteMany({});
    await prisma.appointment.deleteMany({});
    await prisma.loyaltyCard.deleteMany();
    await prisma.customer.deleteMany({});
    await prisma.admin.deleteMany();
    await prisma.user.deleteMany({});
    await prisma.car.deleteMany({});

    const car1 = await prisma.car.create({
        data:{
        brand: "BMW",
        chassisNumber: 1232,
        model: "m4",
        price: 50000,
        condition: "USED",
        status: "IN_STOCK"
        }
    })

    const car2= await prisma.car.create({
        data:{
        brand: "Audi",
        chassisNumber: 2345,
        model: "R8",
        price: 60000,
        condition: "NEW",
        status: "IN_STOCK"
        }
    })
    const car3= await prisma.car.create({
        data:{
        brand: "Land Rover",
        chassisNumber: 3456,
        model: "Range Rover",
        price: 80000,
        condition: "NEW",
        status: "SOLD_OUT"
        }
    })
    const car4= await prisma.car.create({
        data:{
        brand: "Toyota",
        chassisNumber: 4647,
        model: "Yaris",
        price: 10000,
        condition: "NEW",
        status: "IN_STOCK"
        }
    })
    const user1 = await prisma.user.create({
        data: {
            username: 'admin',
            password: await bcrypt.hash('admin123', 12),
            firstName: 'admin',
            lastName: 'admin',
            email: 'administration@ucll.be',
            role: 'ADMIN',
        },
    });
    const user2 = await prisma.user.create({
        data: {
            username: 'Dodo',
            password: await bcrypt.hash('love123', 12),
            firstName: 'sarah',
            lastName: 'Doe',
            email: 'dodo@ucll.be',
            role: 'CUSTOMER',
        },
    });

    const customer1 = await prisma.customer.create({
         data: {
             userId: user2.id 
            } 
    }); 
    const admin1 = await prisma.admin.create({
        data: {
            userId: user1.id
        }
    });

    const transaction1 = await prisma.transaction.create({
        data: {
            typeTransaction: 'S',
            date: new Date(),
            cars: { connect: { id: car1.id } },
            customerId: customer1.id,
        },
    });
    
    const transaction2 = await prisma.transaction.create({
        data: {
            typeTransaction: 'P',
            date: new Date(),
            cars: { connect: { id: car2.id } },
            customerId: customer1.id,  // Changed from user2.id to customer1.id
        },
    });

    // const appointment1 = await prisma.appointment.create({
    //     data: { 
    //         date: new Date(new Date().setDate(new Date().getDate() + 14)), 
    //         customers: { connect: { id: customer1.id } }, 

    //     } 
    // });

}

(async () => {
    try {
        await main();
        await prisma.$disconnect();
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    }
})();
