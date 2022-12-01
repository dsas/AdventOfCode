
/**
 * Given a string comprising of integers separated by newlines in groups separated by double newlines,
 * sum the numbers in each group and return the sum of the numbers in the biggest group
 * @param {string} input
 * @returns {number}
 */
const partOne = (input) => {
  const parsedInput = parseInputString(input);
  return topNGroups(parsedInput, 1)[0];
}

/**
 * Given a string comprising of integers separated by newlines in groups separated by double newlines,
 * sum the numbers in each group and return the sum of the numbers in the three biggest groups.
 * @param {string} input
 * @returns {number}
 */
const partTwo = (input) => {
  const parsedInput = parseInputString(input);
  const topThree = topNGroups(parsedInput, 3);
  return topThree.reduce((a, b) => a + b);
}

/**
 * Given an array of arrays of numbers, sum the inner arrays and return the biggest n sums
 *
 * @param {number[][]} groups
 * @param {number} n
 * @returns {number[]}
 */
const topNGroups = (groups, n) => {
  const caloriesPerElf = groups.map(calories => calories.reduce((a, b) => a + b), 0);
  const sortedCaloriesPerElf = caloriesPerElf.sort((a, b) => a - b);
  return sortedCaloriesPerElf.slice(n * -1);
}

const parseInputString = (input) => input.trim().split("\n\n").map(s => s.split("\n").map( n => parseInt(n)));

module.exports = {partOne, partTwo};
