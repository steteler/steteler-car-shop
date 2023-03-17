import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleModel from '../Models/Motorcycle.model';
import ErrorHandler from '../Utils/Error.utils';

const MOTORCYCLE_NOT_FOUND = 'Motorcycle not found';

export default class MotorcycleService {
  private createMotorcycleDomain(motorcycle: IMotorcycle | null): Motorcycle | null {
    if (motorcycle) {
      return new Motorcycle(motorcycle);
    }

    return null;
  }

  public async createMotorcycle(motorcycle: IMotorcycle): Promise<Motorcycle | null> {
    const motorcycleModel = new MotorcycleModel();
    const newMotorcycle = await motorcycleModel.create(motorcycle);

    return this.createMotorcycleDomain(newMotorcycle);
  }

  public async getMotorcycle(): Promise<(Motorcycle | null)[]> {
    const motorcycleModel = new MotorcycleModel();
    const motorcycles = await motorcycleModel.find();

    return motorcycles.map((motorcycle) => this.createMotorcycleDomain(motorcycle));
  }

  public async getMotorcycleById(id: string): Promise<Motorcycle | null> {
    const motorcycleModel = new MotorcycleModel();
    const motorcycle = await motorcycleModel.findById(id);

    if (!motorcycle) {
      throw new ErrorHandler(404, MOTORCYCLE_NOT_FOUND);
    }

    return this.createMotorcycleDomain(motorcycle);
  }

  public async updateMotorcycle(
    id: string,
    motorcycle: Partial<IMotorcycle>,
  ): Promise<Motorcycle | null> {
    const motorcycleModel = new MotorcycleModel();
    const updatedmotorcycle = await motorcycleModel.update(id, motorcycle);

    if (!updatedmotorcycle) {
      throw new ErrorHandler(404, MOTORCYCLE_NOT_FOUND);
    }

    return this.createMotorcycleDomain(updatedmotorcycle);
  }

  public async deleteMotorcycle(id: string): Promise<void> {
    const motorcycleModel = new MotorcycleModel();
    const deletedMotorcycle = await motorcycleModel.remove(id);

    if (!deletedMotorcycle) {
      throw new ErrorHandler(404, MOTORCYCLE_NOT_FOUND);
    }
  }
}