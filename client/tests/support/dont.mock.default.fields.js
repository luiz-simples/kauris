'use strict';

var pathSrc        = '../../src/';
var pathPrototypes = pathSrc.concat('Prototypes');

var pathFormField          = pathSrc.concat('form/fields/FormField');
var pathFormFieldText      = pathSrc.concat('form/fields/FormFieldText');
var pathFormFieldString    = pathSrc.concat('form/fields/FormFieldString');
var pathFormFieldInteger   = pathSrc.concat('form/fields/FormFieldInteger');
var pathValidationMessage  = pathSrc.concat('form/fields/validations/ValidationMessage');
var pathValidationRequired = pathSrc.concat('form/fields/validations/ValidationRequired');

jest.dontMock(pathPrototypes);

jest.dontMock(pathFormField);
jest.dontMock(pathFormFieldText);
jest.dontMock(pathFormFieldString);
jest.dontMock(pathFormFieldInteger);
jest.dontMock(pathValidationMessage);
jest.dontMock(pathValidationRequired);
