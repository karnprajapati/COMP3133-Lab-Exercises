// test/calculator.js
const { expect } = require('chai');
const { add, sub, mul, div } = require('../app/calculator');

describe('Calculator Tests', () => {
    // Test addition
    it('should return 7 for add(5, 2)', () => {
        expect(add(5, 2)).to.equal(7);
    });

    it('should fail for add(5, 2) expecting 8', () => {
        expect(add(5, 2)).to.not.equal(8);
    });

    // Test subtraction
    it('should return 3 for sub(5, 2)', () => {
        expect(sub(5, 2)).to.equal(3);
    });

    it('should fail for sub(5, 2) expecting 5', () => {
        expect(sub(5, 2)).to.not.equal(5);
    });

    // Test multiplication
    it('should return 10 for mul(5, 2)', () => {
        expect(mul(5, 2)).to.equal(10);
    });

    it('should fail for mul(5, 2) expecting 12', () => {
        expect(mul(5, 2)).to.not.equal(12);
    });

    // Test division
    it('should return 5 for div(10, 2)', () => {
        expect(div(10, 2)).to.equal(5);
    });

    it('should fail for div(10, 2) expecting 2', () => {
        expect(div(10, 2)).to.not.equal(2);
    });
});