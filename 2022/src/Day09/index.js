/**
 * Calculate the number of unique locations the last knot in the rope has visited if there are two knots in the rope
 *
 * @param {string} input -
 * @returns {number}
 */
const partOne = (input) => {
  const instructions = input
    .split('\n')
    .map((line) => line.split(' '));

  return calculateUniqueTailLocations(instructions, 2);
}

/**
 * Calculate the number of unique locations the last knot in the rope has visited
 *
 * @param {array} instructions First element is direction (one of RLUD), second is integer distance
 * @param {Number} knotsInRope Number of knots in the rope
 * @returns
 */
const calculateUniqueTailLocations = (instructions, knotsInRope) => {
  const rope = [];
  for (let i = 0; i < knotsInRope; i++) {
    rope.push({ row: 0, col: 0 });
  }

  const visited = new Set();

  instructions.forEach( ( instruction ) => {
    // Calculate the direction and velocity of the lead knot and move the rope one step at a time
    const [ direction, distance ] = instruction;
    for ( let i = 0; i < distance; i++ ) {
      switch ( direction ) {
        case 'R':
          rope[0].col++;
          break;
        case 'L':
          rope[0].col--;
          break;
        case 'U':
          rope[0].row++;
          break;
        case 'D':
          rope[0].row--;
          break;
      }

      // Now the head knot has moved a step, move the tail knots to follow in relation to the knot ahead of it
      for (let j = 1; j < rope.length; j++) {
        const head = rope[j - 1];
        const tail = rope[j];

        while (
          Math.max(
            Math.abs(head.row - tail.row),
            Math.abs(head.col - tail.col)
          ) > 1
        ) {
          if (Math.abs(head.row - tail.row) > 0) {
            tail.row += head.row > tail.row ? 1 : -1;
          }
          if (Math.abs(head.col - tail.col) > 0) {
            tail.col += head.col > tail.col ? 1 : -1;
          }
        }
      }
      // End of this step, store the location of the last knot.
      visited.add(`${rope.at(-1).row},${rope.at(-1).col}`);
    }
  } );

  return visited.size;
};

/**
 * Calculate the number of unique locations the last knot in the rope has visited if there are ten knots in the rope
 *
 * @param {string} input
 * @returns {number}
 */
const partTwo = (input) => {
  const instructions = input
    .split('\n')
    .map((line) => line.split(' '));

  return calculateUniqueTailLocations(instructions, 10);
}

module.exports = { partOne, partTwo };
