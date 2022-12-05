/**
 * Given a string containing a list of stacks, and a string containing instructions, return the topmost cells of the stacks after the instructions have been executed
 *
 * The instructions are of the form of "move 3 from 1 to 2", which means to move the top 3 cells from stack 1 to stack 2.
 * The cells can only be moved one at a time, so when moving three cells the order after being moved will be reversed.
 *
 *
 * @param {string} input
 * @returns {string}
 */
const partOne = ( input ) => {
	const [ unparsedStacks, unparsedInstructions ] = parseInputString( input );
	let stacks = parseStacks( unparsedStacks );
	unparsedInstructions.split( '\n' ).forEach( ( instruction ) => {
		let [ count, from, to ] = parseInstruction( instruction );
		// Instructions are 1-indexed, but arrays are 0-indexed
		from--;
		to--;

		const movingCells = stacks[ from ].slice( -1 * count );
		stacks[ to ] = stacks[ to ].concat( movingCells.reverse() );

		const newFromStack = stacks[ from ].slice( 0, -1 * count );
		stacks[ from ] = newFromStack;
	} );

	return topmostCellsAsString( stacks );
};

/**
 * Given a string containing a list of stacks, and a string containing instructions, return the topmost cells of the stacks after the instructions have been executed
 *
 * The instructions are of the form of "move 3 from 1 to 2", which means to move the top 3 cells from stack 1 to stack 2.
 * The cells in each instruction are moved simultaneously so their order after moving will be preserved.
 *
 * @param {string} input
 * @returns {string}
 */
const partTwo = ( input ) => {
	const [ unparsedStacks, unparsedInstructions ] = parseInputString( input );
	let stacks = parseStacks( unparsedStacks );
	unparsedInstructions.split( '\n' ).forEach( ( instruction ) => {
		let [ count, from, to ] = parseInstruction( instruction );
		// Instructions are 1-indexed, but arrays are 0-indexed
		from--;
		to--;

		const movingCells = stacks[ from ].slice( -1 * count );
		stacks[ to ] = stacks[ to ].concat( movingCells );

		const newFromStack = stacks[ from ].slice( 0, -1 * count );
		stacks[ from ] = newFromStack;
	} );

	return topmostCellsAsString( stacks );
};

/**
 * Just splits the input into two parts, the stacks and the instructions
 * @param {string} input
 * @returns {string}
 */
const parseInputString = ( input ) => input.trimEnd().split( '\n\n' );

/**
 * Parses the stacks from the input string into a 2D array
 *
 * The input string has the stacks in a jagged grid, where each grid cell is four characters wide.
 * We just care about the cells that have a letter in them.
 * @param {string} unparsedStacks
 * @returns {string[][]}
 */
const parseStacks = ( unparsedStacks ) => {
	let stacks = [];
	unparsedStacks.split( '\n' ).forEach( ( line ) => {
		line.match( /.{1,4}/g ).forEach( ( cell, stack ) => {
			if ( ! stacks[ stack ] ) {
				stacks[ stack ] = [];
			}

			const cellDetails = cell.match( /([A-Z]+)/ );
			if ( cellDetails ) {
				stacks[ stack ].unshift( cellDetails[ 1 ] );
			}
		} );
	} );

	return stacks;
};

const parseInstruction = ( unparsedInstruction ) => {
	return unparsedInstruction
		.match( /move (\d+) from (\d+) to (\d+)/ )
		.slice( 1, 4 );
};

/**
 * Given a 2D array return the last element of every array and concatenate them into a string
 * @param {string[][]} stacks
 * @returns {string}
 */
const topmostCellsAsString = ( stacks ) => {
	const topmostCells = stacks.map( ( stack ) => stack.slice( -1 ) );
	return topmostCells.join( '' );
};

module.exports = { partOne, partTwo };
