/**
 * Given a boarding plan, find the highest seat ID
 * @param {String} input
 */
const partOne = (input) => {
    const boardingPlans = parseInputString(input).map(planToInt);
    return boardingPlans.reduce((accumulator, value) => Math.max(accumulator, value));

}

/**
 * Given a boarding plan, find the missing seat
 * @param {String} input
 */
const partTwo = (input) => {
  let boardingPlans = parseInputString(input).map(planToInt);
  boardingPlans.sort((x,y) => x-y);

  for (let i = 0; i < boardingPlans.length; i++) {
    if (boardingPlans[i + 1] == boardingPlans[i] + 2) {
      return boardingPlans[i] + 1;
    }
  }
}

/**
 * Convert a boarding plan string to an integer
 * Boarding plan strings are made up of FB for the first seven characters and LR for the last three,
 * Bs and Rs mean that that bit is on and F and Ls mean it's off
 * @param {String} boardingPlan
 * @return {Integer}
 */
const planToInt = (boardingPlan) => {
  return parseInt(boardingPlan.replace(/[FL]/g, '0').replace(/[BR]/g, '1'), 2);
}

const parseInputString = (input) => input.split("\n").map(n => n.trim());

module.exports = {partOne, partTwo};
