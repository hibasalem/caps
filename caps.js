'use strict';

const events = require('./events.js');

require('./driver.js');
require('./vendor.js');

events.on('test', test);
function test() {
  console.log('test');
}

events.emit('test');

// events.on('pickup', iHavePackageHandler);

// function iHavePackageHandler(payload) {
//   console.log('Vindor : i have a package ', {
//     time: new Date().toLocaleString(),
//     payload,
//   });
// }

module.exports = {
  test: test,
};
