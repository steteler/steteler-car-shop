import express from 'express';
import carsRoutes from './Routes/Car.routes';
import motorcyclesRoutes from './Routes/Motorcycle.routes';
import ErrorMiddleware from './Middlewares/Error.middleware';

const app = express();

app.use(express.json());
app.use('/cars', carsRoutes);
app.use('/motorcycles', motorcyclesRoutes);
app.use(ErrorMiddleware.handle);

export default app;