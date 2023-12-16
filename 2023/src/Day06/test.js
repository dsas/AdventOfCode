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
  it( 'should return 10 with input', function() {
    let input = `5
      5
      20`;
    assert.strictEqual( solver.partTwo( input ), 10 );
  } );
} );
