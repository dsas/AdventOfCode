/**
 * Find how many of the passports have the required fields
 * @param {String} input
 */
const partOne = (input) => {
  const passports = parseInputString(input);
  return passports.filter(requiredFieldsPresent).length;
}

/**
 * Find how many of the passports have required and valid fields
 * @param {String} input
 */
const partTwo = (input) => {
  const passports = parseInputString(input);
  return passports.filter(requiredFieldsPresentAndCorrect).length;
}

/**
 * Check the given passport has at least the required keys
 * @param {Map} passport
 */
const requiredFieldsPresent = (passport) => {
  return ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'].every(fieldName => passport.has(fieldName));
}

/**
 * Check that the given passport has the required keys and the values are valid
 * @param {Map} passport
 */
const requiredFieldsPresentAndCorrect = (passport) => {
  if (!requiredFieldsPresent(passport)) {
    return false;
  }

  const validationRules = new Map([
    ['byr', /^(19[2-9][0-9]|200[1-2])$/], // four digits between 1920 and 2002 inclusive
    ['iyr', /^20(1[0-9]|20)$/], // four digits between 2010 and 2020 inclusive
    ['eyr', /^20(2[0-9]|30)$/], // four digits between 2020 and 2030 inclusive
    ['hgt', /^1([5-8][0-9]|9[0-3])cm|^(59|6[0-9]|7[0-6])in$/], // if cm then between 150-193 inc, if inch then 59-76 inc. bit ugly
    ['hcl', /^#[0-9a-f]{6}$/],  // six digit html colour essentially
    ['ecl', /^(amb|blu|brn|gry|grn|hzl|oth)$/],
    ['pid', /^[0-9]{9}$/],  // nine digit number including leading zeros
  ]);

  for(const [field, validator] of validationRules) {
    if (!passport.get(field).match(validator)) {
      return false;
    }
  }
  return true;
}

const parseInputString = (input) => input.split("\n\n")
                                         .map(passport => new Map(passport.split(/[\s]+/)
                                                                  .map(field => field.split(':'))));

module.exports = {partOne, partTwo};
