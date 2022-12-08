const assert = require( 'assert' );
const solver = require( './' );

describe( 'Day 08 part one', function () {
	it( 'should return 21 with input', function () {
		let input = `30373
25512
65332
33549
35390`;
		assert.strictEqual( solver.partOne( input ), 21 );
	} );
} );

describe( 'Day 08 part two', function () {
	it( 'should return 8 with input', function () {
		let input = `30373
25512
65332
33549
35390`;
		assert.strictEqual( solver.partTwo( input ), 8 );
	} );
} );
