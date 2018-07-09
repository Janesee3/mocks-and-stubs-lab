const processPayments = require("../src/main");
const generateQueue = require("../src/queueService");
const { makePayment, refundPayment } = require("../src/paymentService");

jest.mock('../src/queueService', () => {
  return jest.fn(() => [-1, 0, 1]); // have to nest the factory func in a jest.fn if we wanna use it in assertions
})

jest.mock('../src/paymentService', () => {
  return {
    makePayment: jest.fn(() => {console.log("mock pay")}),
    refundPayment: jest.fn(() => {console.log("mock refund")}),
  }
});


// generateQueue.mockImplementation(() => [-1, 0, 1]);
// makePayment.mockImplementation(() => {console.log("do mock payment")})
// refundPayment.mockImplementation(() => {console.log("do mock refund")})


test("processPayments should call generateQueue once and call makePayment and refundPayment for the correct number of times accordingly", () => {
  processPayments();

  // test that generateQueue is called once
  expect(generateQueue).toHaveBeenCalledTimes(1);

  // test that makePayment is called for num of +ve times
  expect(makePayment).toHaveBeenCalledTimes(2);

  // test that refundPayment is called for num of -ve times
  expect(refundPayment).toHaveBeenCalledTimes(1);
});
