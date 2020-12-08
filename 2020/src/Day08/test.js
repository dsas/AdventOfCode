const assert = require('assert');
const solver = require('./');

describe('Day 08 part one', function() {
  it('should return 5 with input', function() {
    let input = `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`;
    assert.strictEqual(solver.partOne(input), 5);
  });
});

describe('Day 08 part two', function() {
  it('should return 8 with input', function() {
    let input = `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`;
    assert.strictEqual(solver.partTwo(input), 8);
  });
});
