const mockRandomInt = jest.fn();
// const generateQueue = require("../src/queueService");
// math.randomInt = mockRandomInt;

let generateQueue;

beforeEach(() => {
    jest.doMock("mathjs", () => {
        return {
            randomInt: mockRandomInt
        };
    });
    generateQueue = require("../src/queueService");
});

test("generateQueue should return an array of integers with that length", () => {
	// mockRandomInt.mockImplementationOnce(jest.fn(() => 5));
	// mockRandomInt.mockImplementation(jest.fn(() => 1));
	mockRandomInt.mockReturnValueOnce(5);
	mockRandomInt.mockReturnValue(1);

	let result = generateQueue();

	expect(Array.isArray(result)).toBe(true);
	result.forEach(num => {
		expect(num).toBe(1);
	});
	expect(result.length).toBe(5);
});

test("generateQueue should return an array of length between 1 to 10", () => {
    jest.dontMock("mathjs");
    generateQueue = require("../src/queueService");
    
	let result = generateQueue();
	console.log(result);
	expect(result.length).toBeGreaterThanOrEqual(1);
	expect(result.length).toBeLessThanOrEqual(10);
});

test("generateQueue should return an array that contains numbers between -20 to 50", () => {
	let result = generateQueue();
	result.forEach(num => {
		console.log(num);
		expect(num).toBeGreaterThanOrEqual(-20);
		expect(num).toBeLessThanOrEqual(50);
	});
});
