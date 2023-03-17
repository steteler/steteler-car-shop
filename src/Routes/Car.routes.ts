import { Request, Router, Response, NextFunction } from 'express';
import CarController from '../Controllers/Car.controller';
import validateId from '../Middlewares/validateId.middleware';

const carsRoutes = Router();

carsRoutes.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => (
    new CarController(req, res, next).createCar()
  ),
);

carsRoutes.get(
  '/',
  (req: Request, res: Response, next: NextFunction) => (
    new CarController(req, res, next).getCars()
  ),
);

carsRoutes.get(
  '/:id',
  validateId,
  (req: Request, res: Response, next: NextFunction) => (
    new CarController(req, res, next).getCarById()
  ),
);

carsRoutes.put(
  '/:id',
  validateId,
  (req: Request, res: Response, next: NextFunction) => (
    new CarController(req, res, next).updateCar()
  ),
);

carsRoutes.delete(
  '/:id',
  validateId,
  (req: Request, res: Response, next: NextFunction) => (
    new CarController(req, res, next).deleteCar()
  ),
);

export default carsRoutes;