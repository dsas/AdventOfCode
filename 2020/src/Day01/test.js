const assert = require('assert');
const solver = require('./');

describe('Day 01 part one', function() {
  it('should return 514579 with input', function() {
    let input = `1721
    979
    366
    299
    675
    1456`;
    assert.strictEqual(solver.partOne(input), 514579);
  });
});

describe('Day 01 part two', function() {
  it('should return 241861950 with input', function() {
    let input = `1721
    979
    366
    299
    675
    1456`;
    assert.strictEqual(solver.partTwo(input), 241861950);
  });
});