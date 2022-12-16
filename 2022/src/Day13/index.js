/**
 * Calculate the sum of the 1-based indices of pairs that are in the right order.
 *
 * @param {string} input - Pairs of JSON arrays, each pair is separated by an empty line and each array is on a separate line.
 * @returns {number}
 */
const partOne = ( input ) => {
	const packetPairs = parseInput( input );
	return packetPairs.reduce( ( indicesSum, pair, index ) => {
		let [ left, right ] = pair;
		if ( sort( left, right ) === -1 ) {
			indicesSum += index + 1;
		}
		return indicesSum;
	}, 0 );
};

/**
 * Compares two values and returns -1 if left is less than right, 1 if left is greater than right, and 0 if they are equal.
 *
 * If both values are numbers, they are compared directly.
 * If one value is a number and the other is an array, the number is converted to an array
 * If both values are arrays, the elements of each array are compared, one by one recursively. If both arrays are equal but
 * left runs out of elements first, -1 is returned. If both arrays are equal but right runs out of elements first, 1 is
 * returned.
 *
 * @param {Number|Array} left
 * @param {Number|Array} right
 * @returns {Number} between -1 and 1
 */
const sort = ( left, right ) => {
  // If both are numbers, compare them.
	if ( ! Number.isNaN( left ) && ! Number.isNaN( right ) ) {
    if (left === right) {
      return 0;
    }
    return left < right ? -1 : 1;
	}

  // If one is an array and the other is a number then make both of them arrays
	if ( Number.isNaN( left ) && ! Number.isNaN( right ) ) {
		left = [ left ];
	} else if ( Number.isNaN( right ) && ! Number.isNaN( left ) ) {
		right = [ right ];
	}

  // If both are arrays, compare the elements of each array, one by one.
  for ( let i = 0; i < left.length; i++ ) {
    if (i >= right.length) {
      return -1;
    }
    let result = sort( left[ i ], right[ i ] );
    if ( result !== 0 ) {
      return result;
    }
  }
  return left.length < right.length ? 1 : 0; // Left being longer is dealt with in the loop
};

/**
 *
 *
 * @param {string} input
 * @returns {number}
 */
const partTwo = ( input ) => {};

const parseInput = ( input ) => {
	return input
		.trim()
		.split( '\n\n' )
		.map( ( pair ) => {
			return pair.split( '\n' ).map( ( line ) => {
				return JSON.parse( line );
			} );
		} );
};

module.exports = { partOne, partTwo };
