
# validate-schema

  Validate an object against a schema.

## Installation

```
$ npm install validate-schema
```

## Example

```js
var validate = require('validate-schema');
var generate = require('auto-schema');

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
```

yields:

```js
{ 'user.id': 'float',
  'name.first': 'varchar',
  'name.last': 'varchar' }

{ 'user.id': 'number expected',
  'name.last': 'string expected',
  'user.timestamp': 'undefined column' }
```

# License

  MIT