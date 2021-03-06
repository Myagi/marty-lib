var expect = require('chai').expect;
var buildMarty = require('../../../test/lib/buildMarty');
var describeStyles = require('../../../test/lib/describeStyles');

describeStyles('SessionStorageStateSource', function (styles) {
  var source, Marty;

  beforeEach(function () {
    Marty = buildMarty();
    sessionStorage.clear();
    var Source = styles({
      classic: function () {
        return Marty.createStateSource({
          type: 'sessionStorage'
        });
      },
      es6: function () {
        return class SessionStorage extends Marty.SessionStorageStateSource {
        };
      }
    });

    source = new Source();
  });

  describe('#createRepository()', function () {
    it('should expose get and set methods', function () {
      expect(source).to.have.property('get');
      expect(source).to.have.property('set');
    });
  });

  describe('#set()', function () {
    beforeEach(function () {
      source.set('foo', 'bar');
    });

    it('should store data under key in sessionStorage', function () {
      expect(sessionStorage.getItem('foo')).to.equal('bar');
    });
  });

  describe('#get()', function () {
    beforeEach(function () {
      sessionStorage.setItem('foo', 'bar');
    });

    it('should retrieve data under key in sessionStorage', function () {
      expect(source.get('foo')).to.equal('bar');
    });
  });

  describe('#namespace', function () {
    beforeEach(function () {
      var Source = styles({
        classic: function () {
          return Marty.createStateSource({
            namespace: 'baz',
            type: 'sessionStorage'
          });
        },
        es6: function () {
          return class SessionStorage extends Marty.SessionStorageStateSource {
            get namespace() {
              return 'baz';
            }
          };
        }
      });

      source = new Source();
    });

    describe('when you pass in a namespace', function () {
      describe('when retrieving data', function () {
        beforeEach(function () {
          sessionStorage.setItem('bazfoo', 'bar');
        });

        it('should prepend namespace to key', function () {
          expect(source.get('foo')).to.equal('bar');
        });
      });

      describe('when storing data', function () {
        beforeEach(function () {
          source.set('foo', 'bar');
        });

        it('should prepend namespace to key', function () {
          expect(sessionStorage.getItem('bazfoo')).to.equal('bar');
        });
      });
    });
  });
});