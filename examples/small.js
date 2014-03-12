
/**
 * Module dependencies.
 */

var generate = require('auto-schema');
var validate = require('..');

var schema = generate({
  user: {
    id: 123242123,
    name: {
      first: 'tobi',
      last: 'loki'
    }
  }
});

console.log();
console.log(schema);

var obj = {
  user: {
    id: '1234123',
    name: {
      first: 'tobi',
      last: 123
    },
    timestamp: 1394646734792
  }
};

console.log();
console.log(validate(obj, schema));