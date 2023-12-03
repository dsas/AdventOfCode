/**
 * Given a grid of numbers and symbols, find the sum of the numbers that are
 * in anyway adajacent to a symbol. 123 takes up three spaces on the grid,
 * yet counts as one number.
 * @param { string } input
 */
const partOne = (input) => {
  const schematic = parseInputString( input );
  const checkAndAdd = ( number, is_addable, partNumbers ) => {
    if ( number.length > 0 && is_addable ) {
      partNumbers.push( parseInt( number ) );
    }
  };
  const isDigit = new RegExp( /\d/ );

  let currentNumber = '';
  let symbolAdjacent = false;
  let partNumbers = [];

  schematic.forEach( ( row, x ) => {
    checkAndAdd( currentNumber, symbolAdjacent, partNumbers );
    currentNumber = '';
    symbolAdjacent = false;
    row.forEach( ( char, y ) => {
      if ( isDigit.test( char ) ) {
        currentNumber += char;
        symbolAdjacent = symbolAdjacent || checkAnyAdjacentMatches( x, y, /[^0-9]/, schematic );
      } else {
        checkAndAdd( currentNumber, symbolAdjacent, partNumbers );
        currentNumber = '';
        symbolAdjacent = false;
      }
    } );
  } );

  return partNumbers.reduce( ( a, b ) => a + b );
}
const partTwo = (input) => {
  return undefined;
}

const parseInputString = ( input ) => input.trim().split( "\n" ).map( s => s.split( "" ) );


const checkAnyAdjacentMatches = ( x, y, regex, schematic ) => {
  for ( let i = x - 1; i <= x + 1; i++ ) {
    if ( schematic[i] === undefined) {
      continue;
    }
    for ( let j = y - 1; j <= y + 1; j++ ) {
      if ( i === x && j === y ) {
        continue;
      }
      if ( schematic[i][j] === undefined || schematic[i][j] === '.' ) {
        continue;
      }
      if ( regex.test( schematic[i][j] ) ) {
        return true;
      }
    }
  }
  return false;
};

module.exports = {partOne, partTwo};
