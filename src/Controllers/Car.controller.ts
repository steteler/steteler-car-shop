import { NextFunction, Request, Response } from 'express';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/Car.service';

export default class CarController {
  private service: CarService;

  constructor(
    private req: Request,
    private res: Response,
    private next: NextFunction,
  ) {
    this.service = new CarService();
  }

  public async createCar() {   
    const { model, year, color, status, buyValue, doorsQty, seatsQty } = this.req.body;

    const car: ICar = {
      model,
      year,
      color,
      status: status || false,
      buyValue,
      doorsQty,
      seatsQty,
    };

    try {
      const newCar = await this.service.createCar(car);

      return this.res.status(201).json(newCar);
    } catch (err) {
      this.next(err);
    }
  }

  public async getCars() {
    const foundCars = await this.service.getCars();

    return this.res.status(200).json(foundCars);
  }

  public async getCarById() {
    try {
      const { id } = this.req.params;

      const foundCar = await this.service.getCarById(id);

      return this.res.status(200).json(foundCar);
    } catch (err) {
      this.next(err);
    }
  }

  public async updateCar() {
    try {
      const { id } = this.req.params;
      const car = this.req.body;

      const updatedCar = await this.service.updateCar(id, car);

      return this.res.status(200).json(updatedCar);
    } catch (err) {
      this.next(err);
    }
  }

  public async deleteCar() {
    try {
      const { id } = this.req.params;

      await this.service.deleteCar(id);

      return this.res.status(204);
    } catch (err) {
      this.next(err);
    }
  }
}