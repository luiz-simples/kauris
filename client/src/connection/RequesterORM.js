'use strict';

var separator = '/';

var prepareStr = function(baseUrl) {
  baseUrl = baseUrl ? String(baseUrl).trim() : '';
  return baseUrl;
};

function RequesterORM(baseUrl, requester) {
  var orm = this;
  baseUrl = prepareStr(baseUrl);

  var callRequest = function(verb) {
    return function(params) {
      var address = orm.url();

      return requester
        .getProtocol()
        .request(verb, address, params);
    };
  };

  var wrapper = function(name) {
    name = prepareStr(name);
    if (!name.length) return orm;

    var clearSep = name[0] === separator;
    if (clearSep) name = name.slice(-1 * (name.length-1));
    var base = baseUrl.concat(separator, name);

    return new RequesterORM(base, requester);
  };

  orm.one = wrapper;
  orm.all = wrapper;
  orm.url = function() {
    if (!baseUrl.length) return separator;
    return baseUrl;
  };

  orm.get    = callRequest('GET');
  orm.put    = callRequest('PUT');
  orm.post   = callRequest('POST');
  orm.delete = callRequest('DELETE');
}

module.exports = RequesterORM;
