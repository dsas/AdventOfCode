/**
 * Some of the input lines have a closing character for which there is no
 * opening character, find the first such character on each line and sum
 * up according to the scoring mechanism
 *
 */
const partOne = (input) => {
    const lines = parseInputString(input);
    const points = new Map([
        [')', 3],
        [']',57],
        ['}',1197],
        ['>',25137],
    ]);
    const symbols = new Map([
        ['(', ')'],
        ['[', ']'],
        ['{', '}'],
        ['<', '>'],
    ]);
    let score = 0;

    lines.forEach( line => {
        let chars = [];
        line.split('').forEach(char => {
            if (symbols.has(char)) {
                chars.push(char);
            } else {
                let previousOpener = chars.pop();
                if (symbols.get(previousOpener) !== char) {
                    score += points.get(char);
                }
            }
        });
    });
    return score;
}

/**
 *
 */
const partTwo = (input) => { // eslint-disable-line no-unused-vars
    return undefined;
}

const parseInputString = (input) => input.split("\n");

module.exports = {partOne, partTwo};
