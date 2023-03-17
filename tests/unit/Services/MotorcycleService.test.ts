import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import {
  invalidId,
  mockedMotorcycles,
  motorcycleBody,
  motorcycleOutput,
  validId,
} from '../Mocks/MotorcyclesMock';
import MotorcyclesService from '../../../src/Services/Motorcycle.service';
import ErrorHandler from '../../../src/Utils/Error.utils';

const MOTORCYCLE_NOT_FOUND = 'Motorcycle not found';

describe('Testando MotorcyclesService', function () {
  it('Deveria criar uma moto com sucesso', async function () {
    sinon.stub(Model, 'create').resolves(motorcycleOutput);

    const service = new MotorcyclesService();
    const result = await service.createMotorcycle(motorcycleBody);

    expect(result).to.be.deep.equal(motorcycleOutput);
  });

  it('Deveria buscar todas as motos com sucesso', async function () {
    sinon.stub(Model, 'find').resolves(mockedMotorcycles);

    const service = new MotorcyclesService();
    const result = await service.getMotorcycle();

    expect(result).to.be.deep.equal(mockedMotorcycles);
  });

  it('Deveria buscar uma moto por id com sucesso', async function () {
    sinon.stub(Model, 'findOne').resolves(motorcycleOutput);

    const service = new MotorcyclesService();
    const result = await service.getMotorcycleById(validId);

    expect(result).to.be.deep.equal(motorcycleOutput);
  });

  it('Deveria lançar um erro ao buscar uma moto inexistente', async function () {
    sinon.stub(Model, 'findOne').resolves(false);

    try {
      const service = new MotorcyclesService();
      await service.getMotorcycleById(invalidId);
    } catch (error) {
      expect((error as ErrorHandler).message).to.equal(MOTORCYCLE_NOT_FOUND);
    }
  });

  it('Deveria atualizar uma moto por id com sucesso', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves(motorcycleOutput);

    const service = new MotorcyclesService();
    const result = await service.updateMotorcycle(validId, motorcycleBody);

    expect(result).to.be.deep.equal(motorcycleOutput);
  });

  it('Deveria lançar um erro ao atualizar uma moto inexistente', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves(false);

    try {
      const service = new MotorcyclesService();
      await service.updateMotorcycle(invalidId, motorcycleBody);
    } catch (error) {
      expect((error as ErrorHandler).message).to.equal(MOTORCYCLE_NOT_FOUND);
    }
  });

  it('Deveria deletar uma moto por id com sucesso', async function () {
    sinon.stub(Model, 'findByIdAndRemove').resolves(motorcycleOutput);

    const service = new MotorcyclesService();
    const result = await service.deleteMotorcycle(validId);

    expect(result).to.be.equal(undefined);
  });

  it('Deveria lançar um erro ao deletar uma moto inexistente', async function () {
    sinon.stub(Model, 'findByIdAndRemove').resolves(false);

    try {
      const service = new MotorcyclesService();
      await service.deleteMotorcycle(invalidId);
    } catch (error) {
      expect((error as ErrorHandler).message).to.equal(MOTORCYCLE_NOT_FOUND);
    }
  });

  afterEach(function () {
    sinon.restore();
  });
});