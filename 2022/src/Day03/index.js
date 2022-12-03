/**
 * Find the character on each line that appears in both halves of the line, score it and sum the scores
 *
 * @param {string} input - A string of lines, each line containing alphabetical characters
 * @returns {number}
 */
const partOne = (input) => {
  const parsedInput = parseInputString(input);

  return parsedInput.reduce((runningTotal, sack) => {
    const compartments = [
      sack.slice(0, sack.length / 2).split(''),
      sack.slice(sack.length / 2).split('')
    ];
    const intersection = compartments[0].filter((compartment) => compartments[1].includes(compartment));
    if (intersection.length === 0) {
      return runningTotal;
    }
    return runningTotal + lowerUpperAlphabet.indexOf(intersection[0]) + 1;
  } , 0);

}

/**
 * Find the single character that appears in each group of 3 lines, score it and sum the scores
 *
 * @param {string} input - A string of lines, each line containing alphabetical characters
 * @returns {number}
 */
const partTwo = (input) => {
  const parsedInput = parseInputString(input);
  let runningTotal = 0;

  for (let i = 0; i < parsedInput.length; i += 3) {
    const sacks = [
      parsedInput[i].split(''),
      parsedInput[i + 1].split(''),
      parsedInput[i + 2].split('')
    ];
    const intersection = sacks[0].filter( (compartment) => sacks[1].includes(compartment) && sacks[2].includes(compartment) );
    if (intersection.length === 0) {
      continue;
    }
    runningTotal += lowerUpperAlphabet.indexOf(intersection[0]) + 1;
  }
  return runningTotal;
}

const lowerUpperAlphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const parseInputString = (input) => input.trim().split("\n");

module.exports = {partOne, partTwo};
