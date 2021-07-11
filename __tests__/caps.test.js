'use strict';

const caps = require('../caps.js');
const supertest = require('supertest');
const events = require('../events.js');
const mockRequest = supertest(caps);

var faker = require('faker');
require('dotenv').config();

describe('caps test', () => {
  let consoleSpy;

  let payload = {
    storeName: process.env.storeName,
    orderId: faker.datatype.uuid(),
    customerName: `${faker.name.firstName()} ${faker.name.lastName()}`,
    address: ` ${faker.address.secondaryAddress()} ,${faker.address.cityName()} ,${faker.address.country()}`,
  };

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });
  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('test log values ', async () => {
    await caps.test();
    expect(await consoleSpy).toHaveBeenCalled();
  });


  it('logs for  pickup', async () => {
    await events.emit('pickup', payload);
    expect(await consoleSpy).toHaveBeenCalled();
  });
  it('logs for  in-transit', async () => {
    events.emit('in-transit', payload);
    expect(await consoleSpy).toHaveBeenCalled();
  });
  it('logs for  delivered', async () => {
    events.emit('delivered', payload);
    expect(await consoleSpy).toHaveBeenCalled();
  });
});
