'use strict';

var Elara = require('../lib');

describe('Elara', function() {
  it('loadScriptSync', function(done) {
    var elara = new Elara({
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
});
