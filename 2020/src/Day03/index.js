/**
 * Check how many trees are hit when moving three positions across and one down each move
 * @param {String} input
 */
const partOne = (input) => {
    const map = parseInputString(input);
    return treesHitPerRun(map, 3, 1);
}

/**
 * Find the product of trees hit across five different trajectories
 * @param {String} input
 */
const partTwo = (input) => {
  const map = parseInputString(input);
  let treeProduct = [
    [1,1],
    [3,1],
    [5,1],
    [7,1],
    [1,2]].map(velocities => treesHitPerRun(map, velocities[0], velocities[1]))
          .reduce((accumulator, treeCount) => accumulator * treeCount );

    return treeProduct;

}

/**
 * Complete a run across a map, counting the number of # (trees) stopped on
 *
 * The map repeats across the x axis infinitely, crossing the y boundary ends the run
 * @param {array} map this is an array of arrays with . for open spaces and # for trees
 * @param {integer} xVelocity the number of positions to the right to move
 * @param {integer} yVelocity the number of positions down to move
 */
const treesHitPerRun = (map, xVelocity, yVelocity) => {
  const targetRow = map.length;
  let x = 0, y = 0, treeCount = 0;

  while (y < targetRow) {
    x = x % map[y].length;
    if (map[y][x] == '#') {
      treeCount++;
    }

    x += xVelocity;
    y += yVelocity;
  }
  return treeCount;
}

const parseInputString = (input) => input.split("\n").map(str => [...str.trim()]);

module.exports = {partOne, partTwo};
