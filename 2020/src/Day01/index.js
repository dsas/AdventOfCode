
/**
 * Find the two numbers in the newline separated input that sum to 2020 and
 * multiply them together
 * @param {String} input
 */
const partOne = (input) => {
  let nums = parseInputString(input);
  for (let i=0; i<=nums.length; i++) {
    let number = nums[i];
    let needle = 2020 - number;
    if (nums.includes(needle)) {
      return needle * number;
    }
  }
}
/**
 * Find the three numbers in the newline separated input that sum to 2020 and
 * multiply them together
 * @param {String} input
 */
const partTwo = (input) => {
  let nums = parseInputString(input);

  for (let i=0; i <= nums.length; i++) {
    let first = nums[i];

    for (let j=i+1; j <= nums.length; j++) {
      let second = nums[j];
      let needle = 2020 - first - second;

      if (nums.includes(needle)) {
        return needle * first * second;
      }
    }
  }
}

const parseInputString = (input) => input.trim().split("\n").map(n => parseInt(n));

module.exports = {partOne, partTwo};
