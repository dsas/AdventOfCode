/**
 * 
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
 * 
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
    // The other lines are bingo deck - 5x5 matrices of numbers, each separated by an empty line
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
    if (card) {
        deck.push(card);
    }

    return [calls, deck];
}

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

const fullLine = (line) => line.every( (cell) => cell == 'X');

const scoreCard = (card, call) => {
    return call * card.flat()
    .filter( (element) => element != 'X')
    .reduce( (total, element) => element + total );
}

module.exports = {partOne, partTwo, hasWon, scoreCard, parseInputString };
