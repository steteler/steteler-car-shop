import { NextFunction, Request, Response } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/Motorcycle.service';

export default class MotorcycleController {
  private service: MotorcycleService;

  constructor(
    private req: Request, 
    private res: Response, 
    private next: NextFunction,
  ) {
    this.service = new MotorcycleService();
  }

  public async createMotorcycle() {    
    const { model, year, color, status, buyValue, category, engineCapacity } = this.req.body;
  
    const motorcycle: IMotorcycle = {
      model,
      year,
      color,
      status: status || false,
      buyValue,
      category,
      engineCapacity,
    };

    try {
      const newMotorcycle = await this.service.createMotorcycle(motorcycle);

      return this.res.status(201).json(newMotorcycle);
    } catch (error) {
      this.next(error);
    }
  }

  public async getMotorcycle() {
    const foundMotorcycles = await this.service.getMotorcycle();

    return this.res.status(200).json(foundMotorcycles);
  }

  public async getMotorcycleById() {
    try {
      const { id } = this.req.params;

      const foundMotorcycle = await this.service.getMotorcycleById(id);

      return this.res.status(200).json(foundMotorcycle);
    } catch (err) {
      this.next(err);
    }
  }

  public async updateMotorcycle() {
    try {
      const { id } = this.req.params;
      const motorcycleInfo = this.req.body;

      const updatedMotorcycle = await this.service.updateMotorcycle(id, motorcycleInfo);

      return this.res.status(200).json(updatedMotorcycle);
    } catch (err) {
      this.next(err);
    }
  }

  public async deleteMotorcycle() {
    try {
      const { id } = this.req.params;

      await this.service.deleteMotorcycle(id);

      return this.res.status(204);
    } catch (err) {
      this.next(err);
    }
  }
}