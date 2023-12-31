import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import { 
  carBody, 
  carOutput, 
  invalidId,
  mockedCars,
  validId,
} from '../Mocks/CarMock';
import CarsService from '../../../src/Services/Car.service';
import ErrorHandler from '../../../src/Utils/Error.utils';

const CAR_NOT_FOUND = 'Car not found';

describe('Verifica CarsService', function () {
  it('Criar um carro com sucesso', async function () {
    sinon.stub(Model, 'create').resolves(carOutput);

    const service = new CarsService();
    const result = await service.createCar(carBody);

    expect(result).to.be.deep.equal(carOutput);
  });

  it('Buscar todos os carros com sucesso', async function () {
    sinon.stub(Model, 'find').resolves(mockedCars);

    const service = new CarsService();
    const result = await service.getCars();

    expect(result).to.be.deep.equal(mockedCars);
  });

  it('Buscar um carro por id com sucesso', async function () {
    sinon.stub(Model, 'findOne').resolves(carOutput);

    const service = new CarsService();
    const result = await service.getCarById(validId);

    expect(result).to.be.deep.equal(carOutput);
  });

  it('Lança um erro ao buscar um carro inexistente', async function () {
    sinon.stub(Model, 'findOne').resolves(false);

    try {
      const service = new CarsService();
      await service.getCarById(invalidId);
    } catch (error) {
      expect((error as ErrorHandler).message).to.equal(CAR_NOT_FOUND);
    }
  });

  it('Atualiza um carro por id com sucesso', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carOutput);

    const service = new CarsService();
    const result = await service.updateCar(validId, carBody);

    expect(result).to.be.deep.equal(carOutput);
  });

  it('Lança um erro ao atualizar um carro inexistente', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves(false);

    try {
      const service = new CarsService();
      await service.updateCar(invalidId, carBody);
    } catch (error) {
      expect((error as ErrorHandler).message).to.equal(CAR_NOT_FOUND);
    }
  });

  it('Deleta um carro por id com sucesso', async function () {
    sinon.stub(Model, 'findByIdAndRemove').resolves(carOutput);

    const service = new CarsService();
    const result = await service.deleteCar(validId);

    expect(result).to.be.equal(undefined);
  });

  it('Lançar um erro ao deletar um carro inexistente', async function () {
    sinon.stub(Model, 'findByIdAndRemove').resolves(false);

    try {
      const service = new CarsService();
      await service.deleteCar(invalidId);
    } catch (error) {
      expect((error as ErrorHandler).message).to.equal(CAR_NOT_FOUND);
    }
  });

  afterEach(function () {
    sinon.restore();
  });
});