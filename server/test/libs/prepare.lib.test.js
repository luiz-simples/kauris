'use strict';

var moment     = require('moment-timezone');
var cpf        = require('cpf_cnpj').CPF;
var cnpj       = require('cpf_cnpj').CNPJ;
var expect     = require('chai').expect;
var prepareLib = require('./prepare.lib');

describe('Libs', function() {
  describe('PrepareLib', function () {
    describe('#make', function () {
      it('should return arguments with kinds of name', function() {
        var model = {
          fields: [
            { attr: 'attrName', kind: 'name' }
          ]
        };

        return prepareLib.make(model).then(function(preparedArguments) {
          expect(preparedArguments).to.have.property('attrName').and.to.be.a('string');
        });
      });

      it('should return arguments with kinds of email', function() {
        var model = {
          fields: [
            { attr: 'attrEmail', kind: 'email' }
          ]
        };

        return prepareLib.make(model).then(function(preparedArguments) {
          expect(preparedArguments).to.have.property('attrEmail').and.to.be.a('string');
          var validEmail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
          var emailValid = validEmail.test(preparedArguments.attrEmail);

          return expect(emailValid).to.be.ok;
        });
      });

      it('should return arguments with kinds of cpf', function() {
        var model = {
          fields: [
            { attr: 'attrCpf', kind: 'cpf' }
          ]
        };

        return prepareLib.make(model).then(function(preparedArguments) {
          expect(preparedArguments).to.have.property('attrCpf').and.to.be.a('string');
          var cpfValid = cpf.isValid(preparedArguments.attrCpf);

          return expect(cpfValid).to.be.ok;
        });
      });

      it('should return arguments with kinds of cnpj', function() {
        var model = {
          fields: [
            { attr: 'attrCnpj', kind: 'cnpj' }
          ]
        };

        return prepareLib.make(model).then(function(preparedArguments) {
          expect(preparedArguments).to.have.property('attrCnpj').and.to.be.a('string');
          var attrCnpjValid = cnpj.isValid(preparedArguments.attrCnpj);

          return expect(attrCnpjValid).to.be.ok;
        });
      });

      it('should return arguments with kinds of password', function() {
        var model = {
          fields: [
            { attr: 'attrPassword', kind: 'password' }
          ]
        };

        return prepareLib.make(model).then(function(preparedArguments) {
          expect(preparedArguments).to.have.property('attrPassword').and.to.be.a('string');
        });
      });

      it('should return arguments with kinds of boolean', function() {
        var model = {
          fields: [
            { attr: 'attrBoolean', kind: 'boolean' }
          ]
        };

        return prepareLib.make(model).then(function(preparedArguments) {
          expect(preparedArguments).to.have.property('attrBoolean').and.to.be.a('boolean');
        });
      });

      it('should return arguments with kinds of date and time', function() {
        var model = {
          fields: [
            { attr: 'attrDateTime', kind: 'datetime' }
          ]
        };

        return prepareLib.make(model).then(function(preparedArguments) {
          expect(preparedArguments).to.have.property('attrDateTime').and.to.be.a('date');
        });
      });

      it('should return arguments with kinds of date', function() {
        var model = {
          fields: [
            { attr: 'attrDate', kind: 'date' }
          ]
        };

        return prepareLib.make(model).then(function(preparedArguments) {
          expect(preparedArguments).to.have.property('attrDate').and.to.be.a('date');
        });
      });

      it('should return arguments with kinds of integer', function() {
        var model = {
          fields: [
            { attr: 'attrInteger', kind: 'integer' }
          ]
        };

        return prepareLib.make(model).then(function(preparedArguments) {
          expect(preparedArguments).to.have.property('attrInteger').and.to.be.a('number');
        });
      });

      it('should return arguments with kinds of currency', function() {
        var model = {
          fields: [
            { attr: 'attrCurrency', kind: 'currency' }
          ]
        };

        return prepareLib.make(model).then(function(preparedArguments) {
          expect(preparedArguments).to.have.property('attrCurrency').and.to.be.a('number');
        });
      });

      it('should return arguments with kinds of float', function() {
        var model = {
          fields: [
            { attr: 'attrFloat', kind: 'float' }
          ]
        };

        return prepareLib.make(model).then(function(preparedArguments) {
          expect(preparedArguments).to.have.property('attrFloat').and.to.be.a('number');
        });
      });

      it('should return arguments with kinds of percent', function() {
        var model = {
          fields: [
            { attr: 'attrPercent', kind: 'percent' }
          ]
        };

        return prepareLib.make(model).then(function(preparedArguments) {
          expect(preparedArguments).to.have.property('attrPercent').and.to.be.a('number');
        });
      });

      it('should return arguments with kinds of string', function() {
        var model = {
          fields: [
            { attr: 'attrString', kind: 'string' }
          ]
        };

        return prepareLib.make(model).then(function(preparedArguments) {
          expect(preparedArguments).to.have.property('attrString').and.to.be.a('string');
        });
      });

      it('should return arguments with kinds of time', function() {
        var model = {
          fields: [
            { attr: 'attrTime', kind: 'time' }
          ]
        };

        return prepareLib.make(model).then(function(preparedArguments) {
          expect(preparedArguments).to.have.property('attrTime').and.to.be.a('number');
          var timeValid = moment(preparedArguments.attrTime).isValid();

          return expect(timeValid).to.be.ok;
        });
      });

      it('should return prepared arguments of model', function() {
        var model = {
          fields: [
            { attr: 'attr1', kind: 'string' },
            { attr: 'attr2', kind: 'integer' }
          ]
        };

        return prepareLib.make(model).then(function(preparedArguments) {
          expect(preparedArguments).to.have.property('attr1').and.to.be.a('string');
          expect(preparedArguments).to.have.property('attr2').and.to.be.a('number');
        });
      });

      it('should return arguments replaced passing input args', function() {
        var model = {
          fields: [
            { attr: 'attr3', kind: 'string' },
            { attr: 'attr4', kind: 'string' }
          ]
        };

        var inputArgs = { attr4: 'SubStringArgs' };

        return prepareLib.make(model, inputArgs).then(function(preparedArguments) {
          expect(preparedArguments).to.have.property('attr3').and.to.be.a('string');
          expect(preparedArguments).to.have.property('attr4').and.to.be.a('string');
          expect(preparedArguments).to.have.property('attr4', 'SubStringArgs');
        });
      });
    });
  });
});
