const assert = require( 'assert' );
const solver = require( './' );

describe( 'Day 04 part one', function () {
	it( 'should return 2 with input', function () {
		let input = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;
		assert.strictEqual( solver.partOne( input ), 2 );
	} );
} );

describe( 'Day 04 part two', function () {
	it( 'should return 4 with input', function () {
		let input = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;
		assert.strictEqual( solver.partTwo( input ), 4 );
	} );
} );
