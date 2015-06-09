'use strict';

function Elara(opts) {
  opts = opts || {};
  
  if (!opts.host) {
    throw new Error('opts.host is required');
  }
  var isSecure = location.href.indexOf('https:\\') === 0;
  var host;
  if (isSecure) {
    host = opts.hostSecure || opts.host;
  } else {
    host = opts.host;
  }
  this._origin = location.protocol + '//' + host;
  
  this._seqHTML = [];
}

/**
 * Load an external script using document.write.
 * @param {String} url - The URL of the script
 */
Elara.prototype.loadScriptSync = function(url) {
  document.write('<script src="' + url + '"></script>');
};

Elara.prototype.loadRelativeScriptSync = function(relativeUrl) {
  this.loadScriptSync(this._origin + relativeUrl);
};

Elara.prototype.addSequentialHTML = function(html) {
  this._seqHTML.push(html);
};

Elara.prototype.pageBottom = function() {
  for (var i = 0; i < this._seqHTML.length; i++) {
    document.write(this._seqHTML[i]);
  }
};

module.exports = Elara;
