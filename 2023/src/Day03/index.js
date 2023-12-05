/**
 * Given a grid of numbers and symbols, find the sum of the numbers that are
 * in anyway adajacent to a symbol. 123 takes up three spaces on the grid,
 * yet counts as one number.
 * @param { string } input
 */
const partOne = ( input ) => {
  const schematic = parseInputString( input );
  const { numberMap } = buildMaps( schematic );

  // Iterate over all of the numbers in the map to check if they are adjacent to a symbol
  let sum = 0;
  for ( const number of numberMap ) {
    if ( number.adjacentSymbols.length > 0 ) {
      sum += number.value;
    }
  }
  return sum;
}

/**
 * Given a grid of numbers and symbols, find * symbols that are adjacent to
 * exactly two numbers, multiply those numbers together, and add them to the
 * other multiplied numbers.
 * @param { string } input
 * @returns
 */
const partTwo = ( input ) => {
  const schematic = parseInputString( input );
  const { symbolMap } = buildMaps( schematic );

  let sum = 0;
  for ( const symbol of symbolMap.values() ) {
    if ( symbol.value !== '*' || symbol.adjacentNumbers.length !== 2 ) {
      continue;
    }
    sum += symbol.adjacentNumbers[0].value * symbol.adjacentNumbers[1].value;
  }

  return sum;
}

const parseInputString = ( input ) => input.trim().split( "\n" ) ;

/**
 * Given a schematic of numbers and symbols, build a map of numbers and a map
 * of symbols.
 * @param {array} schematic
 * @returns  {numberMap: array, symbolMap: Map}
 *    numberMap: array of objects with the following properties:
 *      value: number
 *      row: number
 *      start: number
 *      end: number
 *      adjacentSymbols: array of symbols
 *
 *    symbolMap: Map of objects with the following properties:
 *      value: string
 *      x: number
 *      y: number
 *      adjacentNumbers: array of numbers
 *
 */
const buildMaps = ( schematic ) => {
  const numberMap = [];
  const symbolMap = new Map();

  const updateMaps = ( value, x, startY, stopY ) => {
    if ( startY !== undefined ) {
      const number = { value: parseInt( value ), row: x, start: startY, end: stopY, adjacentSymbols: [] };
      for ( let i = x - 1; i <= x + 1; i++ ) {
        for ( let j = startY - 1; j <= stopY + 1; j++ ) {
          if ( schematic[i] === undefined || schematic[i][j] === undefined || schematic[i][j] === '.' || /\d/.test( schematic[i][j] ) ) {
            continue;
          }

          let symbol;
          const symbolKey = i + ',' + j;
          if ( symbolMap.has( symbolKey ) ) {
            symbol = symbolMap.get( symbolKey );
          } else {
            symbol = { value: schematic[i][j], x: i, y: j, adjacentNumbers: [] }
            symbolMap.set( symbolKey, symbol );
          }
          symbol.adjacentNumbers.push( number );
          number.adjacentSymbols.push( symbol );
        }
      }
      numberMap.push( number );
    }
  }

  // Build maps of all the symbols and numbers in the schematic
  for ( let x = 0; x < schematic.length; x++ ) {
    let currentNumber = '';
    let startNumberIndex, y, currentCharacter;
    for ( y = 0; y < schematic[x].length; y++ ) {
      currentCharacter = schematic[x][y];
      if ( /\d/.test( currentCharacter ) ) {
        currentNumber += currentCharacter;
        if ( startNumberIndex === undefined ) {
          startNumberIndex = y;
        }
      } else {
        updateMaps( currentNumber, x, startNumberIndex, y - 1 );
        currentNumber = '';
        startNumberIndex = undefined;
      }
    }
    updateMaps( currentNumber, x, startNumberIndex, y );
  }

  return { numberMap, symbolMap };
}

module.exports = { partOne, partTwo };
