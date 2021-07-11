const events = require('./events.js');

// As a vendor, I want to alert the system when I have a package to be picked up
// As a vendor, I want to be notified when my package has been delivered

var faker = require('faker');
require('dotenv').config();

events.on('pickup', iHavePackageHandler);

function iHavePackageHandler(payload) {
  console.log('Vindor : i have a package ', {
    Event: 'i have a package',
    time: new Date().toLocaleString(),
    payload,
  });
}

const interval = setInterval(function () {
  let payload = {
    storeName: process.env.storeName,
    orderId: faker.datatype.uuid(),
    customerName: `${faker.name.firstName()} ${faker.name.lastName()}`,
    address: ` ${faker.address.secondaryAddress()} ,${faker.address.cityName()} ,${faker.address.country()}`,
  };
  events.emit('pickup', payload);
}, 5000);

setTimeout(function () {
  clearInterval(interval);
}, 6000);

events.on('delivered', deliveredHandler);

function deliveredHandler(payload) {
  console.log(' Vindor :  Thank you for delivering', payload.orderId, {
    Event: 'delivered',
    time: new Date().toLocaleString(),
    payload: payload,
  });
}
