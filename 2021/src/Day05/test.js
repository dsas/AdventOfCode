const assert = require('assert');
const solver = require('./');

describe('Day 05 part one', function() {
  it('should return 5 with input', function() {
    let input = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`;
    assert.strictEqual(solver.partOne(input), 5);
  });
});

describe('Day 05 part two', function() {
  it('should return 12 with input', function() {
    let input = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`;
    assert.strictEqual(solver.partTwo(input), 12);
  });
});
