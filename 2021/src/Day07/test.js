const assert = require('assert');
const solver = require('./');

describe('Day 07 part one', function() {
  it('should return 37 with input', function() {
    let input = `16,1,2,0,4,2,7,1,2,14`;
    assert.strictEqual(solver.partOne(input), 37);
  });
});

describe('Day 07 part two', function() {
  it('should return 168 with input', function() {
    let input = `16,1,2,0,4,2,7,1,2,14`;
    assert.strictEqual(solver.partTwo(input), 168);
  });
});