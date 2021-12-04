const assert = require('assert');
const solver = require('./');

describe('Day 03 part one', function() {
  it('should return 198 with input', function() {
    let input = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`;
    assert.strictEqual(solver.partOne(input), 198);
  });
});

describe('Day 03 part two', function() {
  it('should return 230 with input', function() {
    let input = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`;
    assert.strictEqual(solver.partTwo(input), 230);
  });
});
