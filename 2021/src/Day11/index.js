/**
 *
 *
 */
const partOne = (input) => {
    let octopuses = parseInputString(input)
    let flashes = 0;
    let toIncrease = [];
    let flashed = [];
    let steps = 0;

    while (steps < 100) {
        for (let i = 0; i < octopuses.length; i++) {
            for (let j = 0; j < octopuses[i].length; j++) {
                octopuses[i][j]++;
                if (octopuses[i][j] > 9) {
                    toIncrease.push([i, j]);
                }
            }
        }

        while (toIncrease.length !== 0) {
            let [x,y] = toIncrease.shift();
            octopuses[x][y]++;
            if (octopuses[x][y] > 9) {
                if (! arrayHasArray(flashed, [x,y])) {
                    flashes++;
                    flashed.push([x,y]);
                    toIncrease = toIncrease.concat(surroundingCoords(octopuses, x, y))
                }
            }
        }

        flashed.forEach( ([x,y]) => octopuses[x][y] = 0)
        flashed = [];
        steps++;
    }

    return flashes;
}

/**
 * Given a 2d array return all of the points surrounding point xy, but not xy itself
 * @param {Array} grid
 * @param {int} x
 * @param {int} y
 * @returns
 */
const surroundingCoords = (grid, x, y) => {
    let coords = [];
    for(let i of range(x-1, x+1)) {
        for(let j of range(y-1, y+1)) {
            if ( !(i == x && y == j) && grid[i] != undefined  && grid[i][j] != undefined) {
                coords.push([i,j]);
            }
        }
    }
    return coords;
}

const range = (start, stop, step = 1) =>
  Array(Math.abs(Math.ceil((stop - start) / step +1))).fill(start).map((x, y) => x + y * step)

/**
 * Whether the given haystack array contains an array that looks like the needle array
 *
 * Array.includes doesn't work with arrays due to JS SameValue algorithm
 * @param {array} haystack
 * @param {array} needle
 * @returns
 */
const arrayHasArray = (haystack, needle) => {
    return haystack.some( a =>
        a.every( (value, key) =>
            needle[key] === value
        )
    );
}

/**
 *
 */
const partTwo = (input) => {
    let octopuses = parseInputString(input)
    let toIncrease = [];
    let flashed = [];
    let steps = 0;
    const cells = cellCount(octopuses)

    while (flashed.length != cells) {
        flashed = [];
        for (let i = 0; i < octopuses.length; i++) {
            for (let j = 0; j < octopuses[i].length; j++) {
                octopuses[i][j]++;
                if (octopuses[i][j] > 9) {
                    toIncrease.push([i, j]);
                }
            }
        }

        while (toIncrease.length !== 0) {
            let [x,y] = toIncrease.shift();
            octopuses[x][y]++;
            if (octopuses[x][y] > 9) {
                if (! arrayHasArray(flashed, [x,y])) {
                    flashed.push([x,y]);
                    toIncrease = toIncrease.concat(surroundingCoords(octopuses, x, y))
                }
            }
        }
        steps++;
        flashed.forEach( ([x,y]) => octopuses[x][y] = 0)
    }

    return steps;
}

/**
 * In a two dimensional array count the number of cells within
 *
 * Works on jagged arrays too
 * @param {array} grid
 * @returns int
 */
const cellCount = (grid) => {
    return grid.reduce( (total, current) => total + current.length, 0);
}

const parseInputString = (input) => input.split("\n").map( (s) => s.split(''));

module.exports = {partOne, partTwo, arrayHasArray};
