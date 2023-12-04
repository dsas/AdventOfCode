const assert = require('assert');
const solver = require('./');

describe( 'Day 03 part one', function() {
  it( 'should return 4361 with input', function() {
    let input = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
.`;
    assert.strictEqual( solver.partOne( input ), 4361 );
  } );
} );

describe( 'Day 03 part two', function() {
  it( 'should return 467835 with input', function () {
		let input = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
.`;
		assert.strictEqual( solver.partTwo( input ), 467835 );
  } );
} );
