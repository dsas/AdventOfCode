const partOne = ( input ) => {
  const [ times, distances ] = parseInputString( input );
  let waysFoundPerRace = [];

  for ( let race = 0; race < times.length; race++ ) {
    let timeAvailable = times[race];
    let distanceToBeat = distances[race];
    let waysFoundCount = 0;

    for ( let chargeTime = 0; chargeTime < timeAvailable; chargeTime++ ) {
      let distanceTravelled = chargeTime * ( timeAvailable - chargeTime );
      if ( distanceTravelled > distanceToBeat ) {
        waysFoundCount++;
      }
    }
    waysFoundPerRace.push( waysFoundCount );
  }

  return waysFoundPerRace.reduce( ( accumulator, current ) => accumulator * current );

}
const partTwo = ( input ) => {
}

const parseInputString = ( input ) => input.trim().split( "\n" ).map( s => s.split( /\s+/ ).slice( 1 ).map( n => parseInt( n ) ) );

module.exports = { partOne, partTwo };
