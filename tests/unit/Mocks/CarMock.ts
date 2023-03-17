import Car from '../../../src/Domains/Car';

const validId = '6348513f34c397abcad040b2';

const invalidId = 'xxxx';

const carBody = {
  model: 'Marea',
  year: 2002,
  color: 'Black',
  status: true,
  buyValue: 15.990,
  doorsQty: 4,
  seatsQty: 5,
};

const carOutput = {
  id: '6348513f34c397abcad040b2',
  ...carBody,
};

const mockedCars = [
  carOutput,
  {
    id: '7777777f34c397abcad040b2',
    model: 'Golf',
    year: 2016,
    color: 'White',
    status: false,
    buyValue: 22.000,
    doorsQty: 4,
    seatsQty: 5,
  },
];

const carDomain = new Car(carOutput);

const mockedCarDomains = [carDomain];

export {
  validId,
  invalidId,
  carBody,
  carOutput,
  mockedCars,
  carDomain,
  mockedCarDomains,
};