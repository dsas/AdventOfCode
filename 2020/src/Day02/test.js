const assert = require('assert');
const solver = require('./');

describe('Day 02 part one', function() {
  it('should be two valid passwords (first and third) with input', function() {
    let input = `1-3 a: abcde
    1-3 b: cdefg
    2-9 c: ccccccccc`;
    assert.strictEqual(solver.partOne(input), 2);
  });
});

describe('Day 02 part two', function() {
  it('should be one valid password (first) with input', function() {
    let input = `1-3 a: abcde
    1-3 b: cdefg
    2-9 c: ccccccccc`;
    assert.strictEqual(solver.partTwo(input), 1);
  });
});
