'use strict';

function Connection(injector) {
  var connection   = this;
  var queryBuilder = injector.squel;
  var pgConnection = injector.pgConnection;

  var sqlActionsBuilder = {
    search: function(config) {
      var searchBuilder = queryBuilder.select();
      searchBuilder.from(config.tableName);

      config.fields.forEach(function(condition) {
        var attr = config.tableName.concat('.', condition.attr);
        searchBuilder.field(attr);
      });

      config.where.forEach(function(condition) {
        var comparator = condition.hasOwnProperty('comparator') && condition.comparator ? condition.comparator : '=';
        var value      = condition.value;
        var attr       = condition.attr;
        var where      = config.tableName.concat('.', attr, ' ', comparator, ' ?');

        searchBuilder.where(where, value);
      });

      config.order.forEach(function(orderBy) {
        var attr  = orderBy.attr;
        var dir   = orderBy.order;
        var field = config.tableName.concat('.', attr);

        searchBuilder.order(field, dir.toUpperCase() !== 'DESC');
      });

      var minPage  = 1;
      var minLimit = 10;

      var page  = config.hasOwnProperty('page')  && config.page  ? config.page  : minPage;
      var limit = config.hasOwnProperty('limit') && config.limit ? config.limit : minLimit;

      if (page  < 0) page  = minPage;
      if (limit < 0) limit = minLimit;

      searchBuilder.limit(limit);
      searchBuilder.offset((page-1)*limit);

      return searchBuilder.toString();
    },

    delete: function(config) {
      var deleteBuilder = queryBuilder.delete();
      deleteBuilder.from(config.tableName);
      config.where.forEach(function(condition) {
        var comparator = condition.hasOwnProperty('comparator') && condition.comparator ? condition.comparator : '=';
        var value      = condition.value;
        var attr       = condition.attr;
        var where      = config.tableName.concat('.', attr, ' ', comparator, ' ?');

        deleteBuilder.where(where, value);
      });

      return deleteBuilder.toString();
    },

    create: function(config) {
      var squelPostgres = queryBuilder.useFlavour('postgres');
      var insertBuilder = squelPostgres.insert();
      insertBuilder.into(config.tableName);
      var returning = '';
      config.fields.forEach(function(condition) {
        var attr  = condition.attr;

        if (condition.hasOwnProperty('value')) {
          var value = condition.value;
          insertBuilder.set(attr, value);
        }

        returning += !returning ? attr : ', '.concat(attr);
      });

      insertBuilder.returning(returning);

      return insertBuilder.toString();
    },

    update: function(config) {
      var squelPostgres = queryBuilder.useFlavour('postgres');
      var updateBuilder = squelPostgres.update();
      updateBuilder.table(config.tableName);
      var returning = '';

      config.fields.forEach(function(condition) {
        var attr  = condition.attr;

        if (condition.hasOwnProperty('value')) {
          var value = condition.value;
          updateBuilder.set(attr, value);
        }

        returning += !returning ? attr : ', '.concat(attr);
      });

      config.where.forEach(function(condition) {
        var comparator = condition.hasOwnProperty('comparator') && condition.comparator ? condition.comparator : '=';
        var value      = condition.value;
        var attr       = condition.attr;
        var where      = config.tableName.concat('.', attr, ' ', comparator, ' ?');

        updateBuilder.where(where, value);
      });

      updateBuilder.returning(returning);

      return updateBuilder.toString();
    }
  };

  connection.search = function(config) {
    var sqlAction = sqlActionsBuilder.search(config);

    return connection.query(sqlAction).then(function(resultset) {
      return resultset;
    });
  };

  connection.persist = function(config) {
    var sqlAction = sqlActionsBuilder[config.action](config);

    return connection.query(sqlAction).then(function(resultset) {
      return resultset;
    });
  };

  connection.query = function(sql) {
    return pgConnection.runScript(sql);
  };
}

module.exports = Connection;
