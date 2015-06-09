'use strict';

function Elara(opts) {
  opts = opts || {};

  if (!opts.host) {
    throw new Error('opts.host is required');
  }
  this._l = opts.location || location;
  this._d = opts.document || document;

  var isSecure = this._l.protocol === 'https:';
  var host;
  if (isSecure) {
    host = opts.hostSecure || opts.host;
  } else {
    host = opts.host;
  }
  this._origin = this._l.protocol + '//' + host;

  this._seqHTML = [];
}

/**
 * Load an external script using document.write.
 * @param {String} url - The URL of the script
 */
Elara.prototype.loadScriptSync = function(url) {
  this._d.write('<script src="' + url + '"></script>');
};

Elara.prototype.loadRelativeScriptSync = function(relativeUrl) {
  this.loadScriptSync(this._origin + relativeUrl);
};

Elara.prototype.addSequentialHTML = function(html) {
  this._seqHTML.push(html);
};

Elara.prototype.pageBottom = function() {
  var html = '';
  for (var i = 0; i < this._seqHTML.length; i++) {
    html += this._seqHTML[i];
  }
  this._d.write(html);
};

module.exports = Elara;
