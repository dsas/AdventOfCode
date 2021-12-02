const assert = require('assert');
const solver = require('./');

describe('Day 02 part one', function() {
  it('should return 150 with input', function() {
    let input = `forward 5
down 5
forward 8
up 3
down 8
forward 2`;
    assert.strictEqual(solver.partOne(input), 150);
  });
});

describe('Day 02 part two', function() {
  it('should return 900 with input', function() {
    let input = `forward 5
down 5
forward 8
up 3
down 8
forward 2`;
    assert.strictEqual(solver.partTwo(input), 900);
  });
});
