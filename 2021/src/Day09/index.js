/**
 * Find the sum of the numbers that are lower than all adjacent points (N,E,S,W), plus the number of these numbers
 */
const partOne = (input) => {
    const grid = parseInputString(input)
    let sum = 0;

    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[x].length; y++ ) {
            if (lowerThanAdjacent(grid, x, y)) {
                sum += 1 + grid[x][y];
            }
        }
    }
    return sum;
}

const lowerThanAdjacent = (grid, x, y) => {
    const check = grid[x][y];
    const toCheck = adjacentCoords(x, y);

    for (let [i,j] of toCheck) {
        if (grid[i] !== undefined && grid[i][j] != undefined && grid[i][j] <= check) {
            return false;
        }
    }
    return true;
};

let adjacentCoords = (x, y) => {
    const coords = [
        [x-1, y],
        [x,y-1],
        [x,y+1],
        [x+1,y]
    ];
    return coords;
}

/**
 *
 */
const partTwo = (input) => {
    const initialPositions = parseInputString(input)
    return undefined;
}

const parseInputString = (input) => input.split("\n").map( (s) => s.split('').map( n => parseInt(n)));

module.exports = {partOne, partTwo};
