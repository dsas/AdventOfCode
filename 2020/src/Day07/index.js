/**
 * Given a string in which each line gives a name and a comma separated list of child names
 * see how many top-level names can have "shiny gold" as a descendent
 * @param {String} input
 */
const partOne = (input) => {
    const rules = parseInputString(input).map(parseBagRule);
    let parentList = new Map();

    // Build up a map of bag => bags which may contain it
    for (let rule of rules) {
      let parent = rule.shift();
      for (let bag of rule) {
        let parents = [];
        if (parentList.has(bag)) {
          parents = parentList.get(bag);
        }
        parents.push(parent);
        parentList.set(bag, parents);
      }
    }

  let allParents = getAllParents(parentList, 'shiny gold bag');
  allParents = [...new Set(allParents)];  // unique bags only
  return allParents.length - 1; // Don't include initial shiny gold bag
}

const getAllParents = (relations, child) => {
  let seen = [];
  seen.push(child);
  if (relations.has(child)) {
    for (const parent of relations.get(child)) {
      seen = seen.concat(getAllParents(relations, parent));
    }
  }
  return seen;
}


const partTwo = (input) => {
  const bagRules = parseInputString(input)

}

const parseInputString = (input) => input.split("\n")

/**
 * @param {String} bagRule
 * @return {String[]} The first element is the name, any subsequent elements are child names
 */
const parseBagRule = function(bagRule) {
  let match = bagRule.match(/([\w]+ [\w]+) bag/g);
  match = match.filter((bagDesc) => bagDesc != 'no other bags');
  return match;
}

module.exports = {partOne, partTwo};
