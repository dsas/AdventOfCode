const assert = require('assert');
const solver = require('./');

describe('Day 09 part one', function() {
  it('should return 15 with input', function() {
    let input = `2199943210
3987894921
9856789892
8767896789
9899965678`;
    assert.strictEqual(solver.partOne(input), 15);
  });
});

describe('Day 09 part two', function() {
  it('should return ? with input', function() {
    let input = `16,1,2,0,4,2,7,1,2,14`;
    assert.strictEqual(solver.partTwo(input), undefined);
  });
});