const partOne = ( input ) => {
  const hands = parseInputString( input );
  hands.sort( ( a, b ) => {
    const scoreA = scoreByType( a[0] );
    const scoreB = scoreByType( b[0] );
    if ( scoreA > scoreB ) {
      return 1;
    }
    if ( scoreA < scoreB ) {
      return -1;
    }

    if ( scoreA === scoreB ) {
      // secondary sort is by comparing the first elements of each hand, the
      // highest card comes first. If they're equal, compare the second etc.
      for ( let i = 0; i < 5; i++ ) {
        const symbolA = convertSymbolToNumber( a[0][i] );
        const symbolB = convertSymbolToNumber( b[0][i] );
        if ( symbolA > symbolB ) {
          return 1;
        }
        if ( symbolA < symbolB ) {
          return -1;
        }
      }
    }
    throw new Error( 'Two hands have the exact same score' );
  } );

  return hands.reduce( ( total, hand, rank ) => {
    return total + ( hand[1] * ( rank + 1 ) );
  }, 0 );

}
const partTwo = ( input ) => {
}

const parseInputString = ( input ) => {
  return input.trim()
    .split( "\n" )
    .map( s => {
      let [ hand, bid ] = s.split( " " );
      return [ hand, parseInt( bid ) ]
    } );
}

/**
 * Returns a number representing the strength of the hand.
 *
 * 7 - Five of a kind, where all five cards have the same label: AAAAA
 * 6 - Four of a kind, where four cards have the same label and one card has
 *     a different label: AA8AA
 * 5 - Full house, where three cards have the same label, and the remaining
 *     two cards share a different label: 23332
 * 4 - Three of a kind, where three cards have the same label, and the
 *     remaining two cards are each different from any other card in the
 *     hand: TTT98
 * 3 - Two pair, where two cards share one label, two other cards share a
 *     second label, and the remaining card has a third label: 23432
 * 2 - One pair, where two cards share one label, and the other three cards
 *     have a different label from the pair and each other: A23A4
 * 1 - High card, where all cards' labels are distinct: 23456
 *
 * @param {string} hand
 */
const scoreByType = ( hand ) => {
  hand = hand.split( '' );
  hand.sort();
  const runs = countRuns( hand );
  const firstRun = runs.shift();
  if ( firstRun === 5 ) {
    return 7;
  }
  if ( firstRun === 4 ) {
    return 6;
  }
  if ( firstRun === 3 ) {
    const secondRun = runs.shift();
    if ( secondRun === 2 ) {
      return 5;
    }
    return 4;
  }
  if ( firstRun === 2 ) {
    const secondRun = runs.shift();
    if ( secondRun === 2 ) {
      return 3;
    }
    return 2;
  }
  if ( firstRun === 1 ) {
    return 1;
  }
  throw new Error( 'Hand cannot be scored' );
}

/**
 * Counts the number of times each symbol appears in an array
 *
 * The array must be sorted before calling this function.
 * The returned array is sorted in descending order.
 *
 * Example:
 * countRuns( [ 'A', 'A', 'A', 'A', 'A' ] )
 *  => [ 5 ]
 * countRuns( [ 'A', 'A', 'A', 'A', 'K' ] )
 *  => [ 4, 1 ]
 *
 * @param {array} symbols
 * @returns {array}
 */
function countRuns( symbols ) {
	return symbols
		.reduce( ( runs, symbol ) => {
			const lastRun = runs[ runs.length - 1 ];
			symbol === ( lastRun && lastRun.symbol )
				? lastRun.count++
				: runs.push( { symbol, count: 1 } );
			return runs;
		}, [] )
		.map( ( run ) => run.count )
		.sort( ( a, b ) => b - a );
}

const convertSymbolToNumber = ( card ) => {
  const cardMap = {
    'A': 14,
    'K': 13,
    'Q': 12,
    'J': 11,
    'T': 10,
  };
  if ( cardMap[card] ) {
    return cardMap[card];
  }
  return parseInt( card );
}
module.exports = { partOne, partTwo, scoreByType };
