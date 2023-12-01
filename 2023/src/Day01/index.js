const partOne = ( input ) => {
  const parsedInput = parseInputString( input );
  // Find the digits in each line, concatenate the first and last digits to
  // create a number, and then sum the numbers across all lines
  return parsedInput.reduce( ( sum, line ) => {
    const digits = line.match( /\d/g );
    return sum + parseInt( digits[0] + digits[ digits.length - 1 ] );
  }, 0 );

}
const partTwo = ( input ) => {
  // Find both the digits and the written numbers in each line, concatenate
  // the first and last numbers to create a number, and then sum the numbers
  // across all lines
  const parsedInput = parseInputString(input);
  const numberMap = new Map();
  numberMap.set( 'zero', '0');
  numberMap.set( 'one', '1' );
  numberMap.set( 'two', '2' );
  numberMap.set('three', '3' );
  numberMap.set('four', '4' );
  numberMap.set('five', '5' );
  numberMap.set('six', '6' );
  numberMap.set('seven', '7' );
  numberMap.set('eight', '8' );
  numberMap.set('nine', '9' );

  return parsedInput.reduce( ( sum, line ) => {
    let firstNumber = line.match( /(\d|zero|one|two|three|four|five|six|seven|eight|nine)/ )[0];
    if ( numberMap.has( firstNumber ) ) {
      firstNumber = numberMap.get( firstNumber );
    }

    // Use a second regex to get the last number in the line - the first and
    // last numbers can overlap like `twone`, so this was a quick way to solve
    // that.
    let lastNumber = line.match( /.*(\d|zero|one|two|three|four|five|six|seven|eight|nine)/ )[1];
    if ( numberMap.has( lastNumber ) ) {
      lastNumber = numberMap.get( lastNumber );
    }

    return sum + parseInt( firstNumber + lastNumber );

  }, 0);
}

const parseInputString = ( input ) => input.trim().split( "\n" );

module.exports = { partOne, partTwo };
