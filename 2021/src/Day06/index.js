/**
 * Count the number of fish after 80 days, assuming they grow according to the following rules:
 *  1. Each fish creates one new fish every 7 days
 *  2. Each fish takes 2 days to reach reproductive maturity
 */
const partOne = (input) => {
    let initial = parseInputString(input)
    return simulateFishGrowth(initial, 80);
}

/**
 * Count the number of fish after 256 days, assuming they grow according to the following rules:
 *  1. Each fish creates one new fish every 7 days
 *  2. Each fish takes 2 days to reach reproductive maturity
 */
const partTwo = (input) => {
    let initial = parseInputString(input)
    return simulateFishGrowth(initial, 256);
}

/**
 * Run the fish reproduction simulation, according to the rules above
 * @param {Array} initial Each entry is the number of days until that fish reproduces
 * @param {int} duration How many days to run the simulation for
 * @returns  {int} the number of fish at the end of the simulation
 */
const simulateFishGrowth = (initial, duration) => {
    // This works by keeping track of the number of fish with a given timer, rather than tracking each individual fish.

    // timer => count
    let timers = Array(9).fill(0);

    initial.forEach( (timer) => timers[timer]++);

    for (let i=0; i<duration; i++) {
        // Add the number of fish reaching zero to the fish at day six to
        // restart their timers and add the same number of new fish to day eight
        let reproducers = timers.shift();
        timers[6] += reproducers;
        timers.push(reproducers);
    }

    return timers.reduce( (fish, total) => fish + total)
}

const parseInputString = (input) => input.split(",").map(n => parseInt(n));

module.exports = {partOne, partTwo};
