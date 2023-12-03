/**
 * Find the sum of the game IDs for all games where the number of cubes of
 * each colour in each draw is less than or equal to the maximum number of
 * cubes of that colour.
 * @param { string } input
 * @returns
 */
const partOne = (input) => {
  const COLOUR_LIMITS = {
    red: 12,
    green: 13,
    blue: 14
  };

  let parsedInput = parseInputString( input )

  const drawIsPossible = ( draw ) => {
    return draw.every( ( cube ) => {
      let [ cubeCount, cubeColour ] = cube;
      return ( parseInt( cubeCount ) <= COLOUR_LIMITS[ cubeColour ] )
    } );
  }

  let possibleGamesIDSum = 0;

  parsedInput.forEach( ( game, gameId ) => {
    if ( game.every( drawIsPossible ) ) {
      possibleGamesIDSum += gameId + 1;
    }
  } );

  return possibleGamesIDSum;
}

/**
 * Find the sum of the product of the maximum number of cubes of each colour
 * required for each game.
 * @param { string } input
 * @returns
 */
const partTwo = ( input ) => {
  let parsedInput = parseInputString( input )

  return parsedInput.reduce( ( powerSetSum, game ) => {
    let maxColours = { blue: 0, green: 0, red: 0 };
    game.forEach( ( draw ) => {
      draw.forEach( ( cube ) => {
        let [ cubeCount, cubeColour ] = cube;
        maxColours[ cubeColour ] = Math.max( maxColours[ cubeColour ], parseInt( cubeCount ) );
      });
    });
    let powerSet = maxColours.blue * maxColours.green * maxColours.red;
    return powerSetSum + powerSet;
  }, 0 );
}

const parseInputString = ( input ) => input.trim().split( "\n" ).map( game => {
	/*
    Take a row of inputs like:
    ```
      Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
      Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
    ```
    and parse it into a structure like:
    ```
      [
        [
          [ [ '3', 'blue' ], [ '4', 'red' ] ],
          [ [ '1', 'red' ], [ '2', 'green' ], [ '6', 'blue' ] ],
          [ [ '2', 'green' ] ]
        ],
        // Next game...
      ];
    ```
    Just assume the games IDs are sequential and remember to add 1 to the
    index later.
  */
	return game
		.split( /Game \d+: / )[ 1 ]
		.split( '; ' )
		.map( ( rawDraw ) =>
			rawDraw
				.split( ', ' )
				.map( ( cubeColour ) => cubeColour.split( ' ' ) )
		);
});

module.exports = {partOne, partTwo};
