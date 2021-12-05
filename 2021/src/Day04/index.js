/**
 * 2021 day 4 solutions
 * This is a bit messy, a better solution might have been to have a card class
 * capable of checking when it's a winner and alerting the rest of the system,
 * scoring itself and so forth.
 */

/**
 * Find the first bingo card to win and return it's score - the sum of the uncalled numbers multiplied by the last called number
 *
 * Bingo cards are 5x5, winning is done by completing a row or a column.
 *
 * The input is the calling order as a comma separated line and further lines as bingo cards separated by two newlines
 */
const partOne = (input) => {
    const [calls, deck]= parseInputString(input)
    let winningCard;
    let currentCall;

    while (!winningCard) {
        currentCall = calls.shift();
        checkCall: {
            for (let currentCard = 0; currentCard < deck.length; currentCard++) {
                for (let currentRow = 0; currentRow < 5; currentRow++) {
                    for (let currentCell = 0; currentCell < 5; currentCell++) {
                        if (deck[currentCard][currentRow][currentCell] == currentCall) {
                            deck[currentCard][currentRow][currentCell] = 'X';
                            if (hasWon(deck[currentCard])) {
                                winningCard = deck[currentCard];
                                break checkCall;
                            }
                        }
                    }
                }
            }
        }
    }

    return scoreCard(winningCard, currentCall);
}

/**
 * Find the last bingo card to win
 *
 * Bingo cards are 5x5, winning is done by completing a row or a column.
 *
 * The input is the calling order as a comma separated line and further lines as bingo cards separated by two newlines
 */
const partTwo = (input) => {
    let [calls, deck]= parseInputString(input)
    let currentCall;
    let deckwinners = [];
    while (deck.length != deckwinners.length ) {
        currentCall = calls.shift();
        for (let currentCard = 0; currentCard < deck.length; currentCard++) {
            for (let currentRow = 0; currentRow < 5; currentRow++) {
                for (let currentCell = 0; currentCell < 5; currentCell++) {
                    if (deck[currentCard][currentRow][currentCell] == currentCall) {
                        deck[currentCard][currentRow][currentCell] = 'X';
                        if (hasWon(deck[currentCard])) {
                            deckwinners.push(currentCard);
                            deckwinners= deckwinners.filter((x, i, a) => a.indexOf(x) == i)
                            if (deck.length == deckwinners.length ) {
                                return scoreCard(deck[currentCard], currentCall);
                            }
                        }
                    }
                }
            }
        }
    }
}


const parseInputString = (input) => {
    // The first line is the numbers that will be called
    // The other lines are the bingo deck - 5x5 matrices of numbers, each separated by an empty line
    const nlSeparated = input.split("\n")
    const calls = nlSeparated.shift().split(',').map(n => parseInt(n));
    nlSeparated.shift();    // 2nd of the original lines is blank, just skip it here.

    let deck = [];
    let card = [];
    nlSeparated.forEach(element => {
        if (!element.trim()) {
            // blank line means new card, push the old one onto the deck and start afresh
            deck.push(card);
            card = [];
        } else {
            card.push(element.match(/\d+/g).map(n => parseInt(n)));
        }
    });
    // Just in case the input doesn't end on a newline
    if (card) {
        deck.push(card);
    }

    return [calls, deck];
}

/**
 * Check to see if a card is a winning card
 *
 * Winning means has a full row or column of called numbers
 *
 * @param {array} card
 * @returns {boolean}
 */
const hasWon = (card)  => {
    if (card.some( (row) => fullLine(row))) {
        return true;
    }

    for (let i = 0; i < card.length; i++) {
        let column = card.map(x => x[i])
        if (fullLine(column)) {
            return true;
        }
    }
    return false;
}

/**
 * See if every every in the line has been found - marked with an X
 * @param {array} line
 * @returns {boolean}
 */
const fullLine = (line) => line.every( (cell) => cell == 'X');

/**
 * Score a card
 *
 * The scoring algorithm is the sum of uncalled numbers on the card multiplied by the last called number
 *
 * @param {array} card
 * @param {int} call
 * @returns
 */
const scoreCard = (card, call) => {
    return call * card.flat()
    .filter( (element) => element != 'X')
    .reduce( (total, element) => element + total );
}

module.exports = {partOne, partTwo, hasWon, scoreCard, parseInputString };
