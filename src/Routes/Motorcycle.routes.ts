import { Request, Router, Response, NextFunction } from 'express';
import MotorcycleController from '../Controllers/Motorcycle.controller';
import validateId from '../Middlewares/validateId.middleware';

const motorcyclesRoutes = Router();

motorcyclesRoutes.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => (
    new MotorcycleController(req, res, next).createMotorcycle()
  ),
);

motorcyclesRoutes.get(
  '/',
  (req: Request, res: Response, next: NextFunction) => (
    new MotorcycleController(req, res, next).getMotorcycle()
  ),
);

motorcyclesRoutes.get(
  '/:id',
  validateId,
  (req: Request, res: Response, next: NextFunction) => (
    new MotorcycleController(req, res, next).getMotorcycleById()
  ),
);

motorcyclesRoutes.put(
  '/:id',
  validateId,
  (req: Request, res: Response, next: NextFunction) => (
    new MotorcycleController(req, res, next).updateMotorcycle()
  ),
);

motorcyclesRoutes.delete(
  '/:id',
  validateId,
  (req: Request, res: Response, next: NextFunction) => (
    new MotorcycleController(req, res, next).deleteMotorcycle()
  ),
);

export default motorcyclesRoutes;