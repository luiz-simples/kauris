'use strict';

var skt = {
  on:   jest.genMockFunction(),
  emit: jest.genMockFunction(),
  once: jest.genMockFunction()
};

var socketIoClientMock = jest.genMockFunction().mockImplementation(function() {
  return skt;
});

module.exports = socketIoClientMock;
