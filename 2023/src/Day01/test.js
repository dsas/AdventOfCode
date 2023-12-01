const assert = require('assert');
const solver = require('./');

describe( 'Day 01 part one', function() {
  it( 'should return 142 with input', function() {
    let input = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;
    assert.strictEqual( solver.partOne( input ), 142 );
  });
});

describe( 'Day 01 part two', function() {
  it( 'should return 281 with input', function() {
    let input = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;
    assert.strictEqual( solver.partTwo( input ), 281 );
  });

  it( 'should treat overlapping numbers as two separate numbers', function () {
    let input = `twone
one2threez`;
    assert.strictEqual( solver.partTwo( input ), 34 );
  });
});
