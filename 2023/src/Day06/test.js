const assert = require( 'assert' );
const solver = require( './' );

describe( 'Day 06 part one', function() {
  it( 'should return 288 with input', function() {
    let input = `Time:      7  15   30
Distance:  9  40  200`;
    assert.strictEqual( solver.partOne( input ), 288 );
  } );
} );

describe( 'Day 06 part two', function() {
  it( 'should return 71503 with input', function() {
    let input = `Time:      7  15   30
Distance:  9  40  200`;
    assert.strictEqual( solver.partTwo( input ), 71503 );
  } );
} );
