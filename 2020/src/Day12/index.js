
const partOne = (input) => {
  const instructions = parseInputString(input);

  let calculator = new ManhattanCalculator();

  for (let [action, strength] of instructions) {
    calculator.followInstruction(action, strength);
  }

  return calculator.getManhattan();
}

class ManhattanCalculator {
  constructor () {
    this.x = 0;
    this.y = 0;
    this.direction = 'E';
    this.directionMap = ['E', 'S', 'W', 'N'];
  }

  followInstruction (action, strength) {
    switch (action) {
      case 'N':
        this.y += strength
        break;
      case 'E':
        this.x += strength
        break;
      case 'S':
        this.y -= strength
        break;
      case 'W':
        this.x -= strength
        break;
      case 'L':
        this.turn(-strength)
        break;
      case 'R':
        this.turn(strength);
        break;
      case 'F':
        this.followInstruction(this.direction, strength);
        break;
      default:
        throw Error("Unknown action: " + action);
    }
  }

  turn(strength) {
    let directionID = this.directionMap.indexOf(this.direction);
    directionID = directionID + Math.round(strength / 90);
    directionID = directionID >= 4 ? directionID - 4 : directionID;
    directionID = directionID < 0 ? directionID + 4 : directionID;
    this.direction = this.directionMap[directionID];
  }

  getManhattan() {
    return Math.abs(this.x) + Math.abs(this.y);
  }
}


const partTwo = (input) => {
  // eslint-disable-next-line no-unused-vars
  const numbers = parseInputString(input);

}

/**
 *
 * @param {String} input
 * @return {Array}
 */
const parseInputString = (input) => input.split("\n")
                                         .map((el) => [ el[0], parseInt(el.slice(1), 10) ] );


module.exports = {partOne, partTwo, ManhattanCalculator};
