const partOne = ( input ) => {
  const [ times, distances ] = parseInputString( input );
  let totalWays = 1;

  for ( let race = 0; race < times.length; race++ ) {
    const waysFoundCount = findWays( times[race], distances[race] );
    totalWays *= waysFoundCount;
  }

  return totalWays;

}
const partTwo = ( input ) => {
  const [ times, distances ] = parseInputString( input );
  const timeAvailable = parseInt( times.join( '' ) );
  const distanceToBeat = parseInt( distances.join( '' ) );
  return findWays( timeAvailable, distanceToBeat );

}

const parseInputString = ( input ) => input.trim().split( "\n" ).map( s => s.split( /\s+/ ).slice( 1 ).map( n => parseInt( n ) ) );


const findWays = ( timeAvailable, distanceToBeat ) => {
  let waysFoundCount = 0;
  for ( let chargeTime = 0; chargeTime < timeAvailable; chargeTime++ ) {
    let distanceTravelled = chargeTime * ( timeAvailable - chargeTime );
    if ( distanceTravelled > distanceToBeat ) {
      waysFoundCount++;
    }
  }
  return waysFoundCount;
}

module.exports = { partOne, partTwo };
