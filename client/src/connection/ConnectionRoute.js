'use strict';

function ConnectionRoute(baseUrl) {
  var route = this;
  var mountUrl = [];
  var separator = '/';

  baseUrl = String(baseUrl || '').trim();
  var len = baseUrl.length || 1;
  if (baseUrl[len-1] !== separator) baseUrl += separator;

  var clearFrag = function(frag) {
    var fragment = String(frag || '').trim();
    var fragLen  = fragment.length;
    var empty    = !fragLen;
    if (empty) return route;

    var clearSep = fragment[0] === separator;
    if (clearSep) fragment = fragment.slice(-1 * (fragLen-1));

    mountUrl.push(fragment);
    return route;
  };

  route.one = clearFrag;
  route.all = clearFrag;

  route.getUrl = function() {
    return baseUrl.concat(mountUrl.join(separator));
  };
}

module.exports = ConnectionRoute;
