const assert = require('assert');
const solver = require('./');

describe('Day 06 part one', function() {
  it('should return 5934 with input', function() {
    let input = `3,4,3,1,2`;
    assert.strictEqual(solver.partOne(input), 5934);
  });
});

describe('Day 06 part two', function() {
  it('should return 26984457539 with input', function() {
    let input = `3,4,3,1,2`;
    assert.strictEqual(solver.partTwo(input), 26984457539);
  });
});
