const assert = require( 'assert' );
const solver = require( './' );

describe( 'Day 06 part one', function () {
	it( 'should return 5 with input', function () {
		let input = `bvwbjplbgvbhsrlpgdmjqwftvncz`;
		assert.strictEqual( solver.partOne( input ), 5 );
	} );
	it( 'should return 6  with input', function () {
		let input = `nppdvjthqldpwncqszvftbrmjlhg`;
		assert.strictEqual( solver.partOne( input ), 6 );
	} );
	it( 'should return 10  with input', function () {
		let input = `nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`;
		assert.strictEqual( solver.partOne( input ), 10 );
	} );
	it( 'should return 11  with input', function () {
		let input = `zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`;
		assert.strictEqual( solver.partOne( input ), 11 );
	} );
} );

describe( 'Day 06 part two', function () {
	it( 'should return 19 with input', function () {
		let input = `mjqjpqmgbljsphdztnvjfqwrcgsmlb`;
		assert.strictEqual( solver.partTwo( input ), 19 );
	} );
} );
