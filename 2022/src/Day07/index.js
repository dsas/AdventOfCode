/**
 * Calculates the total size of all directories that are less than 100000 bytes.
 *
 * Does this by first calculating the size of each directory and then summing the sizes of the directories that are less than 100000 bytes.
 *
 *
 * @param {string} input - commands and output as newline separated strings. The commands are of the form:
 * $ cd <dir>
 * $ ls
 * <size> <file>
 * dir <dirname>
 * @returns {number}
 */
const partOne = ( input ) => {
	const sizes = calculateSizes( input );
	let total = 0;
	for ( let size of sizes.values() ) {
		if ( size <= 100000 ) {
			total += size;
		}
	}
	return total;
};

/**
 * Iterate over the command output and calculate the size of each directory.
 *
 * The size of a directory is the sum of the sizes of all files and directories in that directory.
 * This means that a file will be counted multiples times. Once for each directory it is in.
 *
 * `dir` lines in the command output are ignored, they tell you a directory exists but unless the directory is later `ls`ed we can't calculate the size of the directory.
 * `$ ls` lines are also ignored, the later lines have the details
 *
 * @param {string} input
 * @returns {Map<string, number>} Map of directory name to size
 */
const calculateSizes = ( input ) => {
	let currentDir = [];
	let sizes = new Map();

	input.split( '\n' ).forEach( ( line ) => {
		if ( line.startsWith( '$ cd' ) ) {
			let cdArg = line.split( ' ' ).slice( 2 )[ 0 ];
			if ( cdArg === '..' ) {
				currentDir.pop();
			} else {
				currentDir.push( cdArg );
			}
		} else if ( /[0-9]/.test( line ) ) {
			const size = parseInt( line.split( ' ' )[ 0 ] );
			let temp = Array.from( currentDir );
			while ( temp.length > 0 ) {
				let dirName = temp.join( '/' );
				if ( sizes.has( dirName ) ) {
					sizes.set( dirName, sizes.get( dirName ) + size );
				} else {
					sizes.set( dirName, size );
				}
				temp.pop();
			}
		}
	} );
	return sizes;
};

/**
 * Calculate the size of the smallest directory that can be deleted to free up enough space to move a file.
 *
 * @param {string} input - commands and output as newline separated strings. The commands are of the form:
 * $ cd <dir>
 * $ ls
 * <size> <file>
 * dir <dirname>
 * @returns {number}
 */
const partTwo = ( input ) => {
	const capacity = 70000000;
	const needed = 30000000;
	const sizes = calculateSizes( input );
	const used = sizes.get( '/' );
	const spaceToFree = used + needed - capacity;

	const sorted = Array.from( sizes.values() ).sort( ( a, b ) => a - b );
	for ( let size of sorted ) {
		if ( spaceToFree <= size ) {
			return size;
		}
	}
};

module.exports = { partOne, partTwo };
