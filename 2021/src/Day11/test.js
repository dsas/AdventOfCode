const assert = require('assert');
const solver = require('./');

describe('Day 11 part one', function() {
  it('should return 1656 with input', function() {
    let input = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`;
    assert.strictEqual(solver.partOne(input), 1656);
  });
});

describe('Day 11 arrayHasArray', function() {
  it('should return false when array empty', function() {
    assert.strictEqual(solver.arrayHasArray([], [1]), false);
  })
  it('should return true when it has same array', function() {
    let x = [1];
    assert.strictEqual(solver.arrayHasArray([x], x), true);
  })
  it('should return true when it has identical array', function() {
    assert.strictEqual(solver.arrayHasArray([ [1] ], [1]), true);
  });
});


describe('Day 11 part two', function() {
  it('should return 195 with input', function() {
    let input = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`;
    assert.strictEqual(solver.partTwo(input), 195);
  });
});