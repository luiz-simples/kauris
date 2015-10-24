/*globals jest:false */
'use strict';

function returnSuperAgent() {
  return this;
}

var mockError    = null;
var mockResponse = null;

function __setMockError(callErr) {
  mockError = callErr;
}

function __setMockResponse(callRes) {
  mockResponse = callRes;
}

function endMethod(callEnd) {
  var error    = mockError    ? mockError()    : null;
  var response = mockResponse ? mockResponse() : null;

  callEnd(error, response);
}

var superAgentMock ={
  end:    jest.genMockFunction().mockImplementation(endMethod),
  set:    jest.genMockFunction().mockImplementation(returnSuperAgent),
  get:    jest.genMockFunction().mockImplementation(returnSuperAgent),
  use:    jest.genMockFunction().mockImplementation(returnSuperAgent),
  put:    jest.genMockFunction().mockImplementation(returnSuperAgent),
  send:   jest.genMockFunction().mockImplementation(returnSuperAgent),
  post:   jest.genMockFunction().mockImplementation(returnSuperAgent),
  delete: jest.genMockFunction().mockImplementation(returnSuperAgent)
};

superAgentMock.__setMockError    = __setMockError;
superAgentMock.__setMockResponse = __setMockResponse;

module.exports = superAgentMock;
