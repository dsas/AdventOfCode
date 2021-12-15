/**
 * Given a starting string and a list of insertions to make to make to that string,
 * find the count of the most frequent character minus the least frequent after
 * applying the list of insertions ten times.
 *
 */
const partOne = (input) => {
    let [template, rules] = parseInputString(input);
    let letterCounts = polymerCounts(template, rules, 10);
    return mostLeastFrequentDiff(letterCounts);
}

/**
 * Find the counts of each character after applying the rules to the template iterations times
 *
 * A start of NNCB and a rule of 'NN -> C' with an iteration of 1 will result in a string of 'NCNCB'
 *
 * This works by keeping a map of pairs => count, which is replaced each iteration, and a map of characters => count which isn't
 *
 * @param {array} template array of characters for the initial string
 * @param {array} rules  array of rules of the form [ SS, S] where SS is a pair of characters and S is the character to insert between them
 * @param {*} iterations how many times to apply the ruleset
 * @returns Map of letter => times it appears
 */
const polymerCounts = (template, rules, iterations) => {
    let polymer = new Map();
    let letterCounts = new Map();

    increaseMapCounter(letterCounts, template[0], 1);
    for (let i = 1; i < template.length; i++) {
        increaseMapCounter(polymer, template[i-1] + template[i], 1);
        increaseMapCounter(letterCounts, template[i], 1);
    }

    for (let step = 0; step < iterations; step++ ) {
        let newPolymer = new Map();
        rules.forEach(rule => {
            let match = rule[0];
            let insert = rule[1];
            let currentCount = polymer.get(match) ?? 0;
            increaseMapCounter(newPolymer, match[0] + insert, currentCount);
            increaseMapCounter(newPolymer, insert + match[1] , currentCount);
            increaseMapCounter(letterCounts, insert, currentCount);
        })
        polymer = newPolymer;
    }
    return letterCounts;
}

/**
 * Given a map of counts, find the difference of the highest and lowest count
 * @param {Map} map any key to numeric value
 * @returns int
 */
const mostLeastFrequentDiff = (map) => {
    let mostFrequent = Math.max(...Array.from(map.values()));
    let leastFrequent = Math.min(...Array.from(map.values()));
    return mostFrequent - leastFrequent;
}

/**
 * Increase the value of the map.key by additionalCount
 * @param {Map} map
 * @param {*} key
 * @param {int} additionalCount
 */
const increaseMapCounter = (map, key, additionalCount) => {
    let existingCount = map.get(key) ?? 0;
    map.set(key, existingCount + additionalCount);
}

/**
 * Given a starting string and a list of insertions to make to make to that string,
 * find the count of the most frequent character minus the least frequent after
 * applying the list of insertions forty times.
 */
const partTwo = (input) => {
    let [template, rules] = parseInputString(input);
    let letterCounts = polymerCounts(template, rules, 40);
    return mostLeastFrequentDiff(letterCounts);
}

const parseInputString = (input) => {
    let [start, unparsedRules] = input.split("\n\n");
    start = start.split('');

    let rules = unparsedRules.split("\n").map( rule => rule.split(' -> '));

    return [start, rules]
}

module.exports = {partOne, partTwo};
