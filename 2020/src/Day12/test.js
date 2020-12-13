const assert = require('assert');
const { ManhattanCalculator } = require('./');
const solver = require('./');

describe('Day 12 part one', function() {
  it('should return 25 with input', function() {
    let input = `F10
N3
F7
R90
F11`;
    assert.strictEqual(solver.partOne(input), 25);
  });

  it('faces south after rotating 1.25 times clockwise', function() {
    let calc = new ManhattanCalculator();
    calc.followInstruction('R', 180);
    calc.followInstruction('R', 180);
    calc.followInstruction('R', 90);
    assert.strictEqual(calc.direction, 'S');
  });

  it('faces west after rotating 2.5 times anti-clockwise', function() {
    let calc = new ManhattanCalculator();
    calc.followInstruction('L', 180);
    calc.followInstruction('L', 180);
    calc.followInstruction('L', 90);
    calc.followInstruction('L', 180);
    calc.followInstruction('L', 180);
    calc.followInstruction('L', 90);
    assert.strictEqual(calc.direction, 'W');
  });
});

