const events = require('./events.js');

// As a driver, I want to be notified when there is a package to be delivered
// As a driver, I want to alert the system when I have picked up a package and it is in transit
// As a driver, I want to alert the system when a package has been delivered

events.on('pickup', pickupHandler);

events.on('in-transit', inTransitHandler);

function pickupHandler(payload) {
  setTimeout(function () {
    console.log('DRIVER: picked up', payload.orderId);
    events.emit('in-transit', payload);
  }, 1000);

  setTimeout(function () {
    console.log('DRIVER: delivered ', payload.orderId);
    events.emit('delivered', payload);
  }, 3000);
}

function inTransitHandler(payload) {
  console.log('DRIVER', {
    Event: 'in-transit',
    time: new Date().toLocaleString(),
    payload: payload,
  });
}
