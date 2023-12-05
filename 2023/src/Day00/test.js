const assert = require( 'assert' );
const solver = require( './' );

describe( 'Day 00 part one', function() {
  it( 'should return 10 with input', function() {
    let input = `3
      5
      2`;
    assert.strictEqual( solver.partOne( input ), 10 );
  } );
} );

describe( 'Day 00 part two', function() {
  it( 'should return 10 with input', function() {
    let input = `5
      5
      20`;
    assert.strictEqual( solver.partTwo( input ), 10 );
  } );
} );