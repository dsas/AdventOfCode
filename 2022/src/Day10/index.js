/**
 * Imagine a computer that understands the following instructions:
 * noop - consumes one clock cycle
 * addx N - consumes two clock cycles and adds N to the accumulator
 */

/**
 * Given instructions return the 'signal strength' of the program.
 *
 * The signal strength is the sum of the cycle number multiplied by the value of the accumulator every 40 clock cycles starting from 20.
 *
 * @param {string} input - Instructions separated by newlines
 * @returns {number} - The signal strength
 */
const partOne = ( input ) => {
	const instructions = parseInput( input );
	return runProgram( instructions ).signal;
};

/**
 * Given instructions, return the screen that the program draws.
 *
 * The screen is a 40x6 grid where each pixel may be either on (#) or off (.).
 * Each cycle draws a pixel. If the pixel is within 1 of the accumulator+1, it is on, otherwise it is off.
 *
 * NOTE: The screen has a bug, the last column is sometimes incorrect, though it generally produces a legible screen.
 *
 * @param {string} input
 * @returns {string}
 */
const partTwo = ( input ) => {
	const instructions = parseInput( input );
	return runProgram( instructions ).screen;
};

const runProgram = ( instructions ) => {
	let cycle = 0;
	let instructionCounter = 0;
	let accumulator = 1;
	let signal = 0;
	let adding = false;
	const rawScreen = [];

	while ( instructionCounter < instructions.length ) {
		cycle++;
		if ( ( cycle - 20 ) % 40 === 0 ) {
			signal += cycle * accumulator;
		}
		const instruction = instructions[ instructionCounter ];

    // The screen is drawn in a 40x6 grid but for convenience it can be represented as a single dimensioned array
    // and the lines drawn later.
    rawScreen.push(Math.abs((cycle % 40) - (accumulator + 1)) <= 1);

		if ( instruction === 'noop' ) {
			instructionCounter++;
		} else if ( adding ) {
			accumulator += parseInt( instruction.split( ' ' )[ 1 ] );
			instructionCounter++;
			adding = false;
		} else {
			adding = true;
		}
	}

  // Draw the screen into it's 40x6 grid.
  const screen =
    rawScreen.slice(0, 40).map(on => on ? '#' : '.').join('') +
    '\n' +
    rawScreen.slice(40, 80).map(on => on ? '#' : '.').join('') +
    '\n' +
    rawScreen.slice(80, 120).map(on => on ? '#' : '.').join('') +
    '\n' +
    rawScreen.slice(120, 160).map(on => on ? '#' : '.').join('') +
    '\n' +
    rawScreen.slice(160, 200).map(on => on ? '#' : '.').join('') +
    '\n' +
    rawScreen.slice(200, 240).map(on => on ? '#' : '.').join('');
	return { signal, screen };
};

const parseInput = ( input ) => {
	return input.split( '\n' ).map( ( line ) => line.trim() );
};

module.exports = { partOne, partTwo };
