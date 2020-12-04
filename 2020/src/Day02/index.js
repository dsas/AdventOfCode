/**
 * Check how many passwords meet the first password policy
 * @param {String} input
 */
const partOne = (input) => {
    let letPassSpec = parseInputString(input);
    return letPassSpec.filter(isPasswordValidOne).length;
}

/**
 * Check how many passwords meet the second password policy
 * @param {String} input
 */
const partTwo = (input) => {
  let letPassSpec = parseInputString(input);
  return letPassSpec.filter(isPasswordValidTwo).length;
}

/**
 * Check whether a password is valid
 *
 * This means that the character specified occurs between the minimum and maximum times within the password.
 * @param {Array} passwordEntry comprised of min occurances, max occurances, character to check & password
 */
const isPasswordValidOne = (passwordEntry) => {
  let _min, max, needle, password;
  [_min, max, needle, password] = passwordEntry;
  let actualCount = password.split(needle).length -1;
  return actualCount >= _min && actualCount <= max;
}

/**
 * Check whether a password is valid
 *
 * This means that the character specified is in exactly one of the positions within the password.
 * @param {Array} passwordEntry comprised of first position, second position, character to check & password
 */
const isPasswordValidTwo = (passwordEntry) => {
  let first, second, needle, password;
  [first, second, needle, password] = passwordEntry;
  let passwordArray = [...password];
  return (needle === passwordArray[first - 1] || needle === passwordArray[second - 1])
    && passwordArray[first - 1] !== passwordArray[second - 1]
}

const parseInputString = (input) =>
  input.split("\n").map(
    passpol => passpol.match(/([0-9]*)-([0-9]*) ([a-z]*): ([a-z]*)/)
                      .slice(1,5));

module.exports = {partOne, partTwo};
