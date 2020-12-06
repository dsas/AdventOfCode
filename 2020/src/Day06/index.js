/**
 * Given a string, for each \n\n separated group, count the unique characters in each group, then sum each groups count
 * @param {String} input
 */
const partOne = (input) => {
    let customsForms = parseInputString(input)

    // For each group, merge the individual answers, filter to just the distinct answers for that group
    // and then count up the answers for all of the groups
    return customsForms.map(group => distinctCharacters(group.join('')))
                       .reduce((acc, curr) => acc += curr.length, 0);
}


/**
 * Given a string, for each \n\n separated group, count the characters duplicated on every line, then sum each groups count
 * @param {String} input
 */
const partTwo = (input) => {
  let customsForms = parseInputString(input)

  // For each group, merge the individual answers, filter to the entries present in every row of the group
  // and then count up the answers for all of the groups
  return customsForms.map(group => sharedEntries(group.flat()))
                     .reduce((acc, curr) => acc += curr.length, 0);
}

/**
 * Given a string returns all of the unique characters in that string as an array
 * @param {String} str
 */
const distinctCharacters = (str) => [...new Set(str)];

/**
 * Given an array of strings, see which characters are in all of the strings
 * @param {Array} arr
 */
const sharedEntries = (arr) => {
  let charstoSearch = arr[0].split('');
  return charstoSearch.filter((char) =>
    arr.every((individualsForm) => individualsForm.includes(char))
  );
}

/**
 * @param {String} input groups of answers separated by \n\n and individuals answers within that group separated with \n
 * @return {Array} containing each group as an array with individuals answers as a string within
 */
const parseInputString = (input) => input.split("\n\n")
                                         .map(groupForm => groupForm.split("\n"));

module.exports = {partOne, partTwo};
