const assert = require('assert');
const solver = require('./');

describe('Day 02 part one', function() {
  it('should return 15 with input', function() {
    let input = `A Y
B X
C Z`;
    assert.strictEqual(solver.partOne(input), 15);
  });
});

describe('Day 02 part two', function() {
  it('should return 12 with input', function() {
    let input = `A Y
B X
C Z`;
    assert.strictEqual(solver.partTwo(input), 12);
  });
});
