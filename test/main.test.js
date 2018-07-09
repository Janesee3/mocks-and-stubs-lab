const makePayment = jest.fn()
const refundPayment = jest.fn()
const mockQueueService = jest.fn()

jest.doMock('../src/paymentService.js', () => {
  return {
    makePayment: makePayment,
    refundPayment: refundPayment,
  }
})
jest.doMock('../src/queueService.js', () => {
  return mockQueueService
})
const processPayments = require("../src/main");

// Need to clear to reset the count for number of times fn is called
beforeEach(() => {
  makePayment.mockClear()
  refundPayment.mockClear()
  mockQueueService.mockClear()
})


// generateQueue.mockImplementation(() => [-1, 0, 1]);
// makePayment.mockImplementation(() => {console.log("do mock payment")})
// refundPayment.mockImplementation(() => {console.log("do mock refund")})


test("processPayments should call generateQueue once and call makePayment and refundPayment for the correct number of times accordingly", () => {
  mockQueueService.mockReturnValue([-1, 0, 1]);

  processPayments();

  expect(mockQueueService).toHaveBeenCalledTimes(1);
  expect(makePayment).toHaveBeenCalledTimes(2);
  expect(refundPayment).toHaveBeenCalledTimes(1);
});

test("processPayments should not call makePayment and refundPayment if generated queue is empty", () => {
  mockQueueService.mockReturnValue([]);

  processPayments();

  expect(mockQueueService).toHaveBeenCalledTimes(1);
  expect(makePayment).not.toHaveBeenCalled();
  expect(refundPayment).not.toHaveBeenCalled();
});
