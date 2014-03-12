
/**
 * Module dependencies.
 */

var tableize = require('tableize');
var assert = require('assert');

/**
 * Expose `validate()`.
 */

module.exports = validate;

/**
 * Redshfit datatypes:
 *
 * DATE                  - Calendar date (year, month, day)
 * TIMESTAMP             - Date and time (without time zone)
 * SMALLINT - INT2       - Signed two-byte integer
 * INTEGER  - INT, INT4  - Signed four-byte integer
 * BIGINT   - INT8       - Signed eight-byte integer
 * DECIMAL  - NUMERIC    - Exact numeric of selectable precision
 * REAL     - FLOAT4     - Single precision floating-point number
 * BOOLEAN  - BOOL       - Logical Boolean (true/false)
 * DOUBLE   - PRECISION FLOAT8, FLOAT  - Double precision floating-point number
 * CHAR     - CHARACTER, NCHAR, BPCHAR - Fixed-length character string
 * VARCHAR  - CHARACTER VARYING, NVARCHAR, TEXT - Variable-length character string with a user-defined limit
 */

/**
 * Validate `obj` against `schema` and return
 * an object of error messages, or null.
 *
 * @param {Object} obj
 * @return {Object} schema
 * @return {Object} errors or null
 * @api public
 */

function validate(obj, schema) {
  assert(obj, 'object required');
  assert(schema, 'schema required');

  var errors;
  obj = tableize(obj);

  Object.keys(obj).forEach(function(key){
    var type = schema[key];
    var val = obj[key];

    var err = valid(val, type);
    if (!err) return;

    errors = errors || {};
    errors[key] = err;
  });

  return errors;
}

/**
 * Validate `val` against `type`.
 *
 * @param {Mixed} val
 * @param {String} type
 * @return {String} error or null
 * @api private
 */

function valid(val, type) {
  switch (type) {
    case 'varchar':
      if ('string' != typeof val) return 'string expected';
      break;

    case 'float':
      if ('number' != typeof val) return 'number expected';
      break;

    case 'boolean':
      if ('boolean' != typeof val) return 'boolean expected';
      break;

    default:
      return 'undefined column';
  }
}
