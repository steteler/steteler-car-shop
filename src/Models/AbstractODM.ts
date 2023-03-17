import { 
  model, 
  Model, 
  models, 
  Schema, 
  UpdateQuery,
} from 'mongoose';

export default abstract class AbstractODM<T> {
  protected model: Model<T>;

  constructor(
    protected schema: Schema,
    protected modelName: string,
  ) {
    this.model = models[this.modelName] || model(this.modelName, this.schema);
  }

  public async create(obj: T): Promise<T> {
    return this.model.create({ ...obj });
  }

  public async update(_id: string, obj: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(
      { _id },
      { ...obj } as UpdateQuery<T>,
      { new: true },
    );
  }

  public async find(): Promise<T[]> {
    const vehicles = await this.model.find();
    return vehicles;
  }

  public async findById(_id: string): Promise<T | null> {
    const vehicleFound = await this.model.findOne({ _id });
    return vehicleFound;
  }

  public async remove(_id: string): Promise<T | null> {
    const removedVehicle = await this.model.findByIdAndRemove({ _id });
    return removedVehicle;
  }
}