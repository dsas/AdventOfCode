/**
 * Find the sum of each cards score
 *
 * The score is calculated by counting how many numbers on the card appear
 * in both sections, subtracting 1 from that number, and raising 2 to the
 * power of that number.
 *
 * @param {*} input
 * @returns
 */
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

/**
 * Find how many cards get processed
 *
 * Every number on the card that is repeated in both sections means another
 * copy of the card is added to the deck. i.e. when processing Card 1, if it
 * has two repeats then a copy of card 2 and a copy of card 3 are added to
 * the deck. Copies of a card are always processed sequentially, by card
 * number.
 *
 *
 * @param {string} input
 * @returns
 */
const partTwo = ( input ) => {
  const cards = parseInputString( input );

  // Every card has at least one copy
  const cardCopies = new Array( cards.length ).fill( 1 );

  for ( let i = 0; i < cards.length; i++ ) {
    const card = cards[ i ];
    const { winningNumbers, cardNumbers } = card;
    const matchingNumbers = winningNumbers.filter( number => cardNumbers.includes( number ) ).length;

    // If this card means there are matching numbers, then each copy of this
    // card will have the same effect.
    for ( let j = i + 1; j <= i + matchingNumbers; j++ ) {
      cardCopies[j] += cardCopies[i];
    }
  }

  return cardCopies.reduce( ( sum, copies ) => sum + copies, 0 );
}

const parseInputString = (input) => {
  const cards = input.trim()
    .split( "\n" )
    .map( line => line.match( /Card\s+\d+: (?<winning_numbers>.*) \| (?<card_numbers>.*)/ ).groups );
  return cards.map( card => {
    return {
      winningNumbers: card.winning_numbers.split(" ")
        .map( number => parseInt( number ) )
        .filter( number => !Number.isNaN( number ) ),
      cardNumbers: card.card_numbers.split(" ")
        .map( number => parseInt( number ) )
        .filter( number => !Number.isNaN( number ) ),
    }
  } );
}

module.exports = { partOne, partTwo };
