const assert = require('assert');
const solver = require('./');

describe('Day 05 part one', function() {
  it('should return 820 with input', function() {
    let input = `BFFFBBFRRR
FFFBBBFRRR
BBFFBBFRLL`;
    assert.strictEqual(solver.partOne(input), 820);
  });
});