/**
 * Find the number of completely overlapping pairs
 * @param {string} input - A string of lines with comma separated ranges
 * @returns {number}
 */
const partOne = (input) => {
  const parsedInput = parseInputString(input);
  return parsedInput.reduce( (containedPairCount, pair ) => {
    if ((pair[0][0] <= pair[1][0] && pair[0][1] >= pair[1][1])
      || (pair[1][0] <= pair[0][0] && pair[1][1] >= pair[0][1])) {
      containedPairCount++;
    }
    return containedPairCount;
  }, 0);
}

/**
 * Find the number of partly overlapping pairs
 * @param {string} input - A string of lines with comma separated ranges
 * @returns {number}
 */
const partTwo = (input) => {
  const parsedInput = parseInputString(input);
  return parsedInput.reduce((containedPairCount, pair) => {
    if ((pair[0][0] <= pair[1][0] && pair[0][1] >= pair[1][0])
      || (pair[1][0] <= pair[0][0] && pair[1][1] >= pair[0][0])) {
      containedPairCount++;
    }
    return containedPairCount;
  }, 0);
}

const parseInputString = (input) => input.trim().split("\n").map((line) => line.split(',').map((range) => range.split('-').map((num) => parseInt(num, 10))));

module.exports = {partOne, partTwo};
