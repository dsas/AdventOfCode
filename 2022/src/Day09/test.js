const assert = require( 'assert' );
const solver = require( './' );

describe( 'Day 09 part one', function () {
  it( 'should return 13 with input', function () {
    let input = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;
    assert.strictEqual( solver.partOne( input ), 13 );
  } );
} );

describe( 'Day 09 part two', function () {
  it( 'should return 36 with input', function () {
    let input = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`;
    assert.strictEqual( solver.partTwo( input ), 36 );
  } );
} );
