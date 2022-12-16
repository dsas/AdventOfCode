const assert = require( 'assert' );
const solver = require( './' );

describe( 'Day 13 part one', function () {
	it( 'should return 13 with input', function () {
		let input = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`;
    assert.strictEqual( solver.partOne( input ), 13 );
	} );
} );

describe( 'Day 13 part two', function () {
	it( 'should return 140 with input', function () {
		let input = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`;
		assert.strictEqual( solver.partTwo( input ), 140 );
	} );
} );
