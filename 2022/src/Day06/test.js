const assert = require( 'assert' );
const solver = require( './' );

describe( 'Day 06 part one', function () {
	it( 'should return 5 with input', function () {
		let input = `bvwbjplbgvbhsrlpgdmjqwftvncz`;

		assert.strictEqual( solver.partOne( input ), 5 );
	} );
} );

describe( 'Day 06 part two', function () {
	it( 'should return 19 with input', function () {
		let input = `mjqjpqmgbljsphdztnvjfqwrcgsmlb`;
		assert.strictEqual( solver.partTwo( input ), 19 );
	} );
} );
