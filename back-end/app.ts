import * as dotenv from 'dotenv';
import express, {NextFunction} from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import {carRouter} from "./controller/car.routes";
import customerRouter from "./controller/customer.routes";
import transactionRouter from "./controller/transaction.routes";
import {userRouter} from "./controller/user.routes";
import loyaltyCardRouter from "./controller/loyaltyCard.routes";
import adminRouter from "./controller/admin.routes";
import appointmentRouter from "./controller/appointment.routes";
import helmet from 'helmet';


const app = express();
app.use(helmet())

// below code is just for experimenting incase i see something similar during the exam (Im just a boy)
// app.use(helmet.contentSecurityPolicy(
//     {directives: {
//         connectSrc: ['sefl', 'https://api.ucll.be'],
//     },}
// ))

dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors({origin: 'http://localhost:8080'}));
app.use(bodyParser.json());

app.use('/car_acquisition', carRouter);
app.use('/customers', customerRouter);
app.use('/transactions', transactionRouter);
app.use('/users', userRouter);
app.use('/admins', adminRouter);
app.use('/appointment', appointmentRouter)
app.use('/loyaltyCards', loyaltyCardRouter);
app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});

const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Courses API',
            version: '1.0.0',
        },
    },
    apis: ['./controller/*.routes.ts'],
};

const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


