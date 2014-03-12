
var validate = require('..');
var assert = require('assert');

describe('validate(obj, schema)', function(){
  describe('when valid', function(){
    it('should return null', function(){
      var schema = {
        user: 'varchar',
        id: 'float'
      };

      var obj = {
        user: 'tobi',
        id: 12345
      };

      var ret = validate(obj, schema);
      assert(null == ret);
    })
  })

  describe('when varchar is not a string', function(){
    it('should return an error', function(){
      var schema = { user: 'varchar' };
      var obj = { user: 123 };

      var ret = validate(obj, schema);

      ret.should.eql({
        user: 'string expected'
      });
    })
  })

  describe('when boolean is not a boolean', function(){
    it('should return an error', function(){
      var schema = { agreed: 'boolean' };
      var obj = { agreed: 'whoop' };

      var ret = validate(obj, schema);

      ret.should.eql({
        agreed: 'boolean expected'
      });
    })
  })

  describe('when float is not a number', function(){
    it('should return an error', function(){
      var schema = { payed: 'float' };
      var obj = { payed: '1.0' };

      var ret = validate(obj, schema);

      ret.should.eql({
        payed: 'number expected'
      });
    })
  })

  describe('when column is undefined', function(){
    it('should return an error', function(){
      var schema = { payed: 'float' };
      var obj = { 'name.first': 'tobi', 'name.last': 'ferret' };

      var ret = validate(obj, schema);

      ret.should.eql({
        'name.first': 'undefined column',
        'name.last': 'undefined column'
      });
    })
  })

  describe('when varchar is undefined', function(){
    it('should not error', function(){
      var schema = { name: 'varchar' };
      var obj = {};

      var ret = validate(obj, schema);
      assert(null == ret);
    })
  })

  describe('when boolean is undefined', function(){
    it('should not error', function(){
      var schema = { agreed: 'boolean' };
      var obj = {};

      var ret = validate(obj, schema);
      assert(null == ret);
    })
  })

  describe('when float is undefined', function(){
    it('should not error', function(){
      var schema = { payed: 'float' };
      var obj = {};

      var ret = validate(obj, schema);
      assert(null == ret);
    })
  })
})
