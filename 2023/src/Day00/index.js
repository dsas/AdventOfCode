const partOne = ( input ) => {
    return parseInputString( input ).reduce( ( accumulator, current ) => accumulator + current );
}
const partTwo = ( input ) => {
    let nums = parseInputString( input );
    let total = nums.reduce( ( accumulator, current ) => accumulator + current );
    return total / nums.length;
}

const parseInputString = ( input ) => input.split( "\n" ).map( n => parseInt( n ) );

module.exports = { partOne, partTwo };
