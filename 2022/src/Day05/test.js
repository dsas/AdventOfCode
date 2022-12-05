const assert = require( 'assert' );
const solver = require( './' );

describe( 'Day 05 part one', function () {
	it( 'should return CMZ with input', function () {
		let input = `    [D]
[N] [C]
[Z] [M] [P]
 1   2   3

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

		assert.strictEqual( solver.partOne( input ), 'CMZ' );
	} );
} );

describe( 'Day 05 part two', function () {
	it( 'should return MCD with input', function () {
		let input = `    [D]
[N] [C]
[Z] [M] [P]
 1   2   3

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;
		assert.strictEqual( solver.partTwo( input ), 'MCD' );
	} );
} );
