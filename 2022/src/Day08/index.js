// The approaches here are over complicated, it would've been easier to have multiple loops
// rather than slicing and mapping and filtering.

/**
 * Given a grid of numbers, find the number of cells that have a run of smaller numbers in any direction
 *
 * Cells without an adjacent cell in a direction are considered to have a run of smaller numbers
 *
 * @param {string} input -
 * @returns {number}
 */
const partOne = ( input ) => {
	const grid = parseInput( input );
	let visibleCount = 0;
	for ( const [ rowIndex, row ] of grid.entries() ) {
		for ( const colIndex of row.keys() ) {
			if ( checkVisible( grid, rowIndex, colIndex ) ) {
				visibleCount++;
			}
		}
	}

	return visibleCount;
};

const checkVisible = ( grid, rowIndex, colIndex ) => {
	if (
		rowIndex === 0 ||
		colIndex === 0 ||
		rowIndex === grid.length - 1 ||
		colIndex === grid[ 0 ].length - 1
	) {
		// The outer edge is always visible
		return true;
	}

	const cellBeingChecked = grid[ rowIndex ][ colIndex ];
	const allSmaller = ( cell ) => cell < cellBeingChecked;

	return (
		grid[ rowIndex ].slice( 0, colIndex ).every( allSmaller ) ||
		grid[ rowIndex ].slice( colIndex + 1 ).every( allSmaller ) ||
		grid
			.map( ( row, index ) =>
				index < rowIndex ? row[ colIndex ] : null
			)
			.every( allSmaller ) ||
		grid
			.map( ( row, index ) =>
				index > rowIndex ? row[ colIndex ] : null
			)
			.every( allSmaller )
	);
};

/**
 * Given a grid of numbers, find the maximum score for any cell
 *
 * The score is calculated by multiplying the number of smaller sequentially adjacent cells in each direction
 *
 * @param {string} input
 * @returns {number}
 */
const partTwo = ( input ) => {
	const grid = parseInput( input );
	let maxScore = 0;
	for ( const [ rowIndex, row ] of grid.entries() ) {
		for ( const colIndex of row.keys() ) {
			maxScore = Math.max(
				maxScore,
				calculateScore( grid, rowIndex, colIndex )
			);
		}
	}

	return maxScore;
};

/**
 * Calculate the score for the cell idenfied by the row and column index
 *
 * The score is calculated by multiplying the number of smaller sequentially adjacent cells in each direction
 */
const calculateScore = ( grid, rowIndex, colIndex ) => {
	const sameOrBigger = ( cell ) => cell >= cellBeingChecked;
	const cellBeingChecked = grid[ rowIndex ][ colIndex ];

	const west = grid[ rowIndex ].slice( 0, colIndex ).reverse();
	let westScore = west.findIndex( sameOrBigger );
	westScore = westScore == -1 ? west.length : westScore + 1;

	const east = grid[ rowIndex ].slice( colIndex + 1 );
	let eastScore = east.findIndex( sameOrBigger );
	eastScore = eastScore == -1 ? east.length : eastScore + 1;

	const north = grid
		.map( ( row, index ) => ( index < rowIndex ? row[ colIndex ] : null ) )
		.filter( ( val ) => val != null )
		.reverse();
	let northScore = north.findIndex( sameOrBigger );
	northScore = northScore == -1 ? north.length : northScore + 1;

	const south = grid
		.map( ( row, index ) => ( index > rowIndex ? row[ colIndex ] : null ) )
		.filter( ( val ) => val != null );
	let southScore = south.findIndex( sameOrBigger );
	southScore = southScore == -1 ? south.length : southScore + 1;

	return westScore * eastScore * northScore * southScore;
};

const parseInput = ( input ) =>
	input
		.trim()
		.split( '\n' )
		.map( ( line ) => line.split( '' ).map( Number ) );

module.exports = { partOne, partTwo };
