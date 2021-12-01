/**
 * Count the number of times a number in the newline separated input is greater than the previous number
 */
const partOne = (input) => {
    const depths = parseInputString(input)
    return increaseCounter(depths);
}

/**
 * As above but rather than each number, compare a sliding window of three numbers with the previous window
 */
const partTwo = (input) => {
    const depths = parseInputString(input)
    const windows = [];
    for (let i = 0; i + 3 <= depths.length; i++) {
        windows.push (depths[i] + depths[i+1] + depths[i+2]);
    }
    return increaseCounter(windows);

}

/**
 * Count the number of times the value increases from one value to the next
 * @param array of ints
 * @return int
 */
const increaseCounter = (values) => {
    let increases = 0;
    for (let i = 1; i < values.length; i++) {
        let previous = values[i-1];
        let current = values[i];
        if (current > previous) {
            increases++;
        }
    }
   return increases;
}

const parseInputString = (input) => input.split("\n").map(n => parseInt(n));

module.exports = {partOne, partTwo};
