/**
 *  Find the first place in the string where the strinng has 4 distinct characters
 *
 * @param {string} input -
 * @returns {number}
 */
const partOne = ( input ) => {
	return findDistinctSet( input, 4 );
};

/**
 *  Find the first place in the string where the strinng has 14 distinct characters
 *
 * @param {string} input
 * @returns {number}
 */
const partTwo = ( input ) => {
	return findDistinctSet( input, 14 );
};

const findDistinctSet = ( input, length ) => {
	for (
		let currentChar = length - 1;
		currentChar < input.length;
		currentChar++
	) {
		const set = new Set( input.slice( currentChar - length, currentChar ) );
		if ( set.size === length ) {
			return currentChar;
		}
	}
	return null;
};

module.exports = { partOne, partTwo };
