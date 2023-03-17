import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarModel from '../Models/Car.model';
import ErrorHandler from '../Utils/Error.utils';

const CAR_NOT_FOUND = 'Car not found';

export default class CarService {
  private createCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(car);
    }

    return null;
  }

  public async createCar(car: ICar): Promise<Car | null> {
    const carModel = new CarModel();
    const newCar = await carModel.create(car);

    return this.createCarDomain(newCar);
  }

  public async getCars(): Promise<(Car | null)[]> {
    const carModel = new CarModel();
    const cars = await carModel.find();

    return cars.map((car) => this.createCarDomain(car));
  }

  public async getCarById(id: string): Promise<Car | null> {
    const carModel = new CarModel();
    const car = await carModel.findById(id);

    if (!car) {
      throw new ErrorHandler(404, CAR_NOT_FOUND);
    }

    return this.createCarDomain(car);
  }

  public async updateCar(id: string, car: Partial<ICar>): Promise<Car | null> {
    const carModel = new CarModel();
    const updatedCar = await carModel.update(id, car);

    if (!updatedCar) {
      throw new ErrorHandler(404, CAR_NOT_FOUND);
    }

    return this.createCarDomain(updatedCar);
  }

  public async deleteCar(id: string): Promise<void> {
    const carModel = new CarModel();
    const deletedCar = await carModel.remove(id);

    if (!deletedCar) {
      throw new ErrorHandler(404, CAR_NOT_FOUND);
    }
  }
}