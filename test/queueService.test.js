const generateQueue = require("../src/queueService");
const math = require("mathjs");
const stubRandom = 5;
math.randomInt = jest.fn(() => stubRandom);

test.only("generateQueue should call math.randomInt, and return an array of integers with that length", () => {
	let result = generateQueue();

	expect(Array.isArray(result)).toBe(true);
	expect(typeof result[0]).toBe("number");
	expect(result.length).toBe(stubRandom);
});
