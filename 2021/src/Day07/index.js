/**
 *
 *
 * @example `partOne('1,4')` will yield 3
 */
const partOne = (input) => {
    const initialPositions = parseInputString(input)
    const largest = getLargest(initialPositions);
    let smallestDistance = Infinity;

    for (let position = 0; position < largest; position++) {
         let distance = initialPositions.reduce( (totalDistance, currentPosition) => totalDistance + Math.abs(position - currentPosition), 0);
         if (distance < smallestDistance) {
            smallestDistance = distance;
         }
    }

    return smallestDistance;
}

/**
 * Find the biggest number in the array
 * @param {Array} arr
 * @returns int
 */
const getLargest = (arr) => arr.reduce( (largest, current) => current > largest ? current : largest);

/**
 *
 */
const partTwo = (input) => {
    const initialPositions = parseInputString(input)
    const largest = getLargest(initialPositions);
    let leastFuel = Infinity;

    for (let position = 0; position < largest; position++) {
         let fuelForPosition = initialPositions.reduce( (totalDistance, currentPosition) => {
             let movesRequired = Math.abs(position - currentPosition);
             return totalDistance += ((movesRequired * (movesRequired + 1)) / 2);
         }, 0 );
         leastFuel = Math.min(leastFuel, fuelForPosition)
    }

    return leastFuel;
}

const parseInputString = (input) => input.split(",").map( (n) => parseInt(n));

module.exports = {partOne, partTwo};
