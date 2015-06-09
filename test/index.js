'use strict';

var Elara = require('../lib');

describe('Elara', function() {
  it('loadScriptSync', function(done) {
    var elara = new Elara({
      host: 'localhost:3000',
      document: {
        write: function(html) {
          expect(html).toBe('<script src="http://domain.com/smth.js"></script>');
          done();
        }
      }
    });
    elara.loadScriptSync('http://domain.com/smth.js');
  });

  it('addSequentialHTML', function(done) {
    var elara = new Elara({
      host: 'localhost:3000',
      document: {
        write: function(html) {
          expect(html).toBe('foobar');
          done();
        }
      }
    });
    elara.addSequentialHTML('foo');
    elara.addSequentialHTML('bar');
    elara.pageBottom();
  });

  describe('loadRelativeScriptSync', function() {
    it('on non-secure page', function(done) {
      var elara = new Elara({
        host: 'localhost:3000',
        location: {
          protocol: 'http:'
        },
        document: {
          write: function(html) {
            expect(html).toBe('<script src="http://localhost:3000/smth.js"></script>');
            done();
          }
        }
      });
      elara.loadRelativeScriptSync('/smth.js');
    });

    it('on secure page when no hostSecure specified', function(done) {
      var elara = new Elara({
        host: 'localhost:3000',
        location: {
          protocol: 'https:'
        },
        document: {
          write: function(html) {
            expect(html).toBe('<script src="https://localhost:3000/smth.js"></script>');
            done();
          }
        }
      });
      elara.loadRelativeScriptSync('/smth.js');
    });

    it('on secure page when hostSecure specified', function(done) {
      var elara = new Elara({
        host: 'localhost:3000',
        hostSecure: 'localhost:3001',
        location: {
          protocol: 'https:'
        },
        document: {
          write: function(html) {
            expect(html).toBe('<script src="https://localhost:3001/smth.js"></script>');
            done();
          }
        }
      });
      elara.loadRelativeScriptSync('/smth.js');
    });
  });
});
