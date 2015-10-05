'use strict';

var q        = require('q');
var faker    = require('faker');
var cpf      = require('cpf_cnpj').CPF;
var cnpj     = require('cpf_cnpj').CNPJ;
var moment   = require('moment-timezone');
var withMask = true;

var makeModel = function(model) {
  var modelArgs = {};

  model.fields.forEach(function(field) {
    if (field.kind === 'cpf')      modelArgs[field.attr] = cpf.generate(withMask);
    if (field.kind === 'cnpj')     modelArgs[field.attr] = cnpj.generate(withMask);
    if (field.kind === 'name')     modelArgs[field.attr] = faker.name.firstName();
    if (field.kind === 'email')    modelArgs[field.attr] = faker.internet.email();
    if (field.kind === 'string')   modelArgs[field.attr] = faker.lorem.words(3).join(' ');
    if (field.kind === 'text')     modelArgs[field.attr] = faker.lorem.words(10).join(' ');
    if (field.kind === 'password') modelArgs[field.attr] = 'asd123';
    if (field.kind === 'integer')  modelArgs[field.attr] = faker.random.number();
    if (field.kind === 'float')    modelArgs[field.attr] = parseFloat(String(faker.random.number()).concat('.000'));
    if (field.kind === 'percent')  modelArgs[field.attr] = parseFloat(String(faker.random.number()).concat('.000000'));
    if (field.kind === 'currency') modelArgs[field.attr] = parseFloat(String(faker.random.number()).concat('.00'));
    if (field.kind === 'date')     modelArgs[field.attr] = moment().tz('America/Sao_Paulo').toDate();
    if (field.kind === 'time')     modelArgs[field.attr] = moment().tz('America/Sao_Paulo').toDate().getTime();
    if (field.kind === 'datetime') modelArgs[field.attr] = moment().tz('America/Sao_Paulo').toDate();
    if (field.kind === 'boolean')  modelArgs[field.attr] = Boolean(true);
  });

  return modelArgs;
};

var PrepareLib = {
  make: function(model, args) {
    return q.Promise(function(resolve) {
      var modelArgs = makeModel(model);
      if (!args) return resolve(modelArgs);

      Object.keys(args).forEach(function(key) {
        if (!key) return;
        modelArgs[key] = args[key];
      });

      resolve(modelArgs);
    });
  }
};

module.exports = PrepareLib;
