'use strict';

var pathSrc                = '../../src/';
var pathPrototypes         = pathSrc.concat('Prototypes');
var pathFormFieldText      = pathSrc.concat('form/fields/FormFieldText');
var pathFormFieldString    = pathSrc.concat('form/fields/FormFieldString');
var pathValidationMessage  = pathSrc.concat('form/fields/validations/ValidationMessage');
var pathValidationRequired = pathSrc.concat('form/fields/validations/ValidationRequired');

jest.dontMock(pathPrototypes);
jest.dontMock(pathFormFieldText);
jest.dontMock(pathFormFieldString);
jest.dontMock(pathValidationMessage);
jest.dontMock(pathValidationRequired);
