import Motorcycle from '../../../src/Domains/Motorcycle';

const validId = '6348513f34c397abcad040b2';

const invalidId = 'xxxx';

const motorcycleBody = {
  model: 'Marea',
  year: 2002,
  color: 'Black',
  status: true,
  buyValue: 15.990,
  category: 'Street',
  engineCapacity: 600,
};

const motorcycleOutput = {
  id: '6348513f34c397abcad040b2',
  ...motorcycleBody,
};

const mockedMotorcycles = [
  motorcycleOutput,
  {
    id: '7777777f34c397abcad040b2',
    model: 'CB 1000',
    year: 2020,
    color: 'Red',
    status: false,
    buyValue: 50.000,
    category: 'Street',
    engineCapacity: 1000,
  },
];

const carDomain = new Motorcycle(motorcycleOutput);

const mockedCarDomains = [carDomain];

export {
  validId,
  invalidId,
  motorcycleBody,
  motorcycleOutput,
  mockedMotorcycles,
  carDomain,
  mockedCarDomains,
};