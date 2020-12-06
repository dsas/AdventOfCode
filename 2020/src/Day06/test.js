const assert = require('assert');
const solver = require('./');

describe('Day 06 part one', function() {
  it('should return 11 with input', function() {
    let input = `abc

a
b
c

ab
ac

a
a
a
a

b`;
    assert.strictEqual(solver.partOne(input), 11);
  });
});

describe('Day 06 part two', function() {
  it('should return 6 with input', function() {
    let input = `abc

a
b
c

ab
ac

a
a
a
a

b`;
    assert.strictEqual(solver.partTwo(input), 6);
  });
});