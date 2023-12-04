const partOne = ( input ) => {
  const cards = parseInputString( input );
  return cards.reduce( ( sum, card ) => {
    const { winningNumbers, cardNumbers } = card;
    const matchingNumbers = winningNumbers.filter( number => cardNumbers.includes( number ) );
    if ( matchingNumbers.length === 0 ) {
      return sum;
    }
    return sum + 2 ** ( matchingNumbers.length - 1);
  }, 0);
}
const partTwo = ( input ) => {
  return undefined;
}

const parseInputString = (input) => {
  const cards = input.trim()
    .split( "\n" )
    .map(line => line.match(/Card\s+\d+: (?<winning_numbers>.*) \| (?<card_numbers>.*)/).groups );
  return cards.map( card => {
    return {
      winningNumbers: card.winning_numbers.split(" ")
        .map( number => parseInt( number ) )
        .filter( number => !Number.isNaN( number ) ),
      cardNumbers: card.card_numbers.split(" ")
        .map(number => parseInt(number))
        .filter( number => !Number.isNaN( number ) )
    }
  } );
}

module.exports = {partOne, partTwo};
