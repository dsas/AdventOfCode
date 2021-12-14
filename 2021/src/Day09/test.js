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
