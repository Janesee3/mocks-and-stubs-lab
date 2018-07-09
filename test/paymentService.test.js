const { makePayment, refundPayment } = require("../src/paymentService");

test("makePayment should return correct string output when given a valid input", () => {
	const amt = 10;
	expect(makePayment(amt)).toBe(`payment made for $${amt}`);
});

test("refundPayment should return correct string output when given a valid input", () => {
	const amt = 10;
	expect(refundPayment(amt)).toBe(`refund made for $${amt}`);
});
