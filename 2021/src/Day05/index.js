/**
 * The input indicates the paths of several lines, count the number of intersections of the horizontal and vertical lines only
 */
const partOne = (input) => {
    const ventLines = parseInputString(input);

    let ventMap = [];
    ventLines.forEach(ventLine => {
        let x1 = ventLine[0][0];
        let x2 = ventLine[1][0];
        let y1 = ventLine[0][1];
        let y2 = ventLine[1][1];
        let path = calculatePath(x1, y1, x2, y2);
        ventMap = updateMap(ventMap, path);
    });
    return countOverlaps(ventMap, 2);
}

/**
 * The input indicates the paths of several lines, count the number of intersections of the horizontal, vertical and diagonal lines
 */
const partTwo = (input) => {
    const ventLines = parseInputString(input);

    let ventMap = [];
    ventLines.forEach(ventLine => {
        let x1 = ventLine[0][0];
        let x2 = ventLine[1][0];
        let y1 = ventLine[0][1];
        let y2 = ventLine[1][1];
        let path = calculatePath(x1, y1, x2, y2, true);
        ventMap = updateMap(ventMap, path);
    });
    return countOverlaps(ventMap, 2);
}

/**
 * The input is made up of lines in the format x1,y1 -> x2,y2 and will be parsed into [[x1,y1],[x2,y2]]
 * @param {string} input
 * @returns {Array}
 */
const parseInputString = (input) => {
    return input.split("\n")
            .map(rawVentLine => rawVentLine.split(' -> ')
                .map(parsedVentLine => parsedVentLine.split(',')
                    .map(n => parseInt(n))
                )
            );
}

/**
 * Calculate the path between two coordinates, if one can be found that is horizontal, vertical, or (optionally) diagonal
 * @param {int} x1
 * @param {int} y1
 * @param {int} x2
 * @param {int} y2
 * @param {boolean} allowDiagonal
 * @returns {Array}
 */
const calculatePath = (x1, y1, x2, y2, allowDiagonal=false) => {
    let path = [];
    if (x1 == x2) {
        // vertical line
        let ys = sequence(y1, y2);
        for (let i = 0; i < ys.length; i++) {
           path.push([x1, ys[i]]) ;
        }
        return path;
    } else if (y1 == y2) {
        // horizontal line
        let xs = sequence(x1, x2);
        for (let i = 0; i < xs.length; i++) {
           path.push([xs[i], y1]) ;
        }
        return path;
    } else if (allowDiagonal) {
        let xs = sequence(x1, x2);
        let ys = sequence(y1, y2);
        return xs.map((value, key) => [value, ys[key]]);
    }
    return [];
}

/**
 * Update a map with the location of vents from a path
 *
 * Vents are represented by numbers which indicates the number of times a vent
 * has been found at that location.
 *
 * @param {Array} map
 * @param {Array} path
 * @returns {Array}
 */
const updateMap = (map, path) => {
    path.forEach( (coords) => {
        let [x,y] = coords;
        if (map[x] === undefined) {
            map[x] = [];
        }
        if (map[x][y] === undefined) {
            map[x][y] = 0;
        }
        map[x][y]++;
    });
    return map;
}

/**
 * Count the number of vents on a map that have been found more than threshold times
 * @param {Array} map
 * @param {int} threshold
 * @returns {int}
 */
const countOverlaps = (map, threshold) => map.flat().filter( (overlaps) => overlaps >= threshold ).length;

/**
 * Gets the numbers between the two given ones (also included) in the order between them
 *
 * @example sequence(1,3)  // [1,2,3]
 * @example sequence(3,1)  // [3,2,1]
 * @param {int} n
 * @param {int} m
 * @returns {Array}
 */
const sequence = (n,m) => {
    if (n > m) {
        return range(n, m, -1);
    } else {
        return range(n, m);
    }
}

/**
 * Returns the stepth numbers between the two given ones (also included)
 *
 * @example range(1,3) // [1,2,3]
 * @example range(3, 1, -1) // [3,2,1]
 * @param {int} start
 * @param {int} stop
 * @param {int} step
 * @returns {Array}
 */
const range = (start, stop, step = 1) =>
  Array(Math.abs(Math.ceil((stop - start) / step +1))).fill(start).map((x, y) => x + y * step)

// eslint-disable-next-line no-unused-vars
const printMap = (map) => {
    for (let i =0; i < 10; i++) {
        if (map[i] === undefined) map[i] = [];
        for (let j = 0; j < 10; j++) {
            let value = map[j][i];
            if (value === undefined) value = '.';
            process.stdout.write(String(value));
        }
        process.stdout.write("\n");
    }
}

module.exports = {partOne, partTwo};
