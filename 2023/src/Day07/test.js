const assert = require( 'assert' );
const solver = require( './' );

describe( 'Day 07 part one', function() {
  it( 'should return 6440 with input', function () {
		let input = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;
		assert.strictEqual( solver.partOne( input ), 6440 );
  } );
} );

describe( 'Day 07 part two', function() {
  it( 'should return 10 with input', function() {
    let input = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;
    assert.strictEqual( solver.partTwo( input ), 10 );
  } );
} );

describe( 'Day 07 scoreByType', function() {
  it( 'should return 7 for AAAAA as it is five of a kind', function() {
    assert.strictEqual( solver.scoreByType( 'AAAAA' ), 7 );
  } );
  it( 'should return 6 for AA8AA as it is four of a kind', function () {
    assert.strictEqual( solver.scoreByType( 'AA8AA' ), 6 );
  } );
  it( 'should return 5 for 23332 as it is full house - a set of three & a pair', function () {
    assert.strictEqual( solver.scoreByType( '23332' ), 5 );
  } );
  it( 'should return 4 for TTT98 as it is three of a kind - a set of three & two singles', function () {
    assert.strictEqual( solver.scoreByType( 'TTT98' ), 4 );
  } );
  it( 'should return 3 for 23432 as it is two pairs', function () {
    assert.strictEqual( solver.scoreByType( '23432' ), 3 );
  } );
  it( 'should return 2 for A23A4 as it is one pair', function () {
    assert.strictEqual( solver.scoreByType( 'A23A4' ), 2 );
  } );
  it( 'should return 1 for 23456 as it is high card - five singles', function () {
    assert.strictEqual( solver.scoreByType( '23456' ), 1 );
  } );
} );
