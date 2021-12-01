const assert = require('assert');
const solver = require('./');

describe('Day 01 part one', function() {
  it('should return 7 with input', function() {
    let input = `199
      200
      208
      210
      200
      207
      240
      269
      260
      263`;
    assert.strictEqual(solver.partOne(input), 7);
  });
});

describe('Day 01 part two', function() {
  it('should return 5 with input', function() {
    let input = `199
      200
      208
      210
      200
      207
      240
      269
      260
      263`;
    assert.strictEqual(solver.partTwo(input), 5);
  });
});
