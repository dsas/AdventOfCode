/**
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

		const newFromStack = stacks[ from ].slice(
			0,
			stacks[ from ].length - count
		);
		stacks[ from ] = newFromStack;
	} );

	return topmostCellsAsString( stacks );
};

/**
 *
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

		const newFromStack = stacks[ from ].slice(
			0,
			stacks[ from ].length - count
		);
		stacks[ from ] = newFromStack;
	} );

	return topmostCellsAsString( stacks );
};

const parseInputString = ( input ) => input.trimEnd().split( '\n\n' );

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

const topmostCellsAsString = ( stacks ) => {
	const topmostCells = stacks.map( ( stack ) => stack.slice( -1 ) );
	return topmostCells.join( '' );
};

module.exports = { partOne, partTwo };
