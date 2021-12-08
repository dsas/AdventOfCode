/**
 * Find the count of distinguishable sequences in the rightmost (output) section of the input
 */
const partOne = (input) => {
    // The number of segments needed to form each digit
    const segmentsNeeded = [6, 2, 5, 5, 4, 5, 6, 3, 7, 6];
    // The digits needing a distinct number of segments can be easily calculated.
    let distinguishableDigits = segmentsNeeded.filter( (value) => segmentsNeeded.indexOf(value) == segmentsNeeded.lastIndexOf(value));

    const notes = parseInputString(input)
    const outputs = notes.map( (note) => note.split(' | ')[1] );

    return outputs.reduce( (count, note) => {
        note.split(' ').forEach( (s) => {
            if (distinguishableDigits.includes(s.length)) {
                count++;
            }
        });
        return count;
    }, 0)
}

/**
 * Calculate which digits are represented by each part of the leftmost section of the input and use it to transform the rightmost section. Then sum the rightmost sections
 * This code is ugly, it needs tidying but I didn't enjoy this.
 */
const partTwo = (input) => {
    const notes = parseInputString(input);
    const decodedOutputs = [];
    notes.forEach( (note) => {
        let [unidentifiedInput, output] = note.split(' | ').map( (s) => s.split(' '));
        const segmentMapping = {
            T: undefined,
            TL: undefined,
            TR: undefined,
            M: undefined,
            BL: undefined,
            BR: undefined,
            B: undefined,
        };
        const numberMapping = new Map();

        // Calculate the digits with distinct number of segments - 1, 4, 7, 8
        unidentifiedInput.sort( (x, y) => x.length - y.length);
        unidentifiedInput = unidentifiedInput.map( (pattern) => sort(pattern));
        unidentifiedInput = unidentifiedInput.filter( (pattern) => {
            if (pattern.length === 2) {
                numberMapping.set(pattern, 1);
                segmentMapping.TR = pattern.split('');
                segmentMapping.BR = pattern.split('');
                return false;
            } else if (pattern.length === 4) {
                numberMapping.set(pattern, 4);
                segmentMapping.M = segmentMapping.TL = difference(pattern.split(''), segmentMapping.TR);
                return false;
            } else if (pattern.length === 3) {
                numberMapping.set(pattern, 7);
                segmentMapping.T = difference(pattern.split(''), segmentMapping.TR);
                return false;
            } else if (pattern.length === 7) {
                numberMapping.set(pattern, 8);
                segmentMapping.BL = segmentMapping.B = difference(pattern.split(''), union(segmentMapping.T, segmentMapping.TR, segmentMapping.M));
                return false;
            }
            return true;
        });

        // Calculate 6 & 9
        unidentifiedInput = unidentifiedInput.filter( pattern  => {
            if (pattern.length !== 6) return true;
            // 6 will not have the TR segment that 1 has, unlike 0 & 9
            const tr = difference(indexOf(numberMapping, 1).split(''), pattern.split(''));
            if (tr.length === 1) {
                numberMapping.set(pattern, 6);
                segmentMapping.TR = tr;
                segmentMapping.BR = difference(segmentMapping.BR, tr);
                return false;
            }

            // 9 will have all the segments of 4 and 7 unlike 6 & 9.
            // The bottom is the only segment in 9 that isn't in 4 & 7
            const fourAndSeven = union(indexOf(numberMapping,4), indexOf(numberMapping,7));
            const bottom = difference(pattern.split(''), fourAndSeven.split(''));
            if (bottom.length === 1) {
                numberMapping.set(pattern, 9);
                segmentMapping.B = bottom;
                segmentMapping.BL = difference(segmentMapping.BL, pattern.split(''));
                return false;
            }
            return true;
        })

        // zero is the only input left that's 6 segments long
        unidentifiedInput = unidentifiedInput.filter( pattern => {
            if (pattern.length !== 6) return true;
            numberMapping.set(pattern, 0);
            segmentMapping.M = difference(indexOf(numberMapping, 8), pattern.split(''))
        });

        // 2, 3, 5  are left
        unidentifiedInput = unidentifiedInput.filter( pattern => {
            // 2 contains a bottom left segment, unlike 3 & 5
            if ( difference(segmentMapping.BL, pattern.split('')).length === 0) {
                numberMapping.set(pattern, 2);
                return false;
            }
            // 3 contains all of 1 unlike 2 & 5
            if ( difference(indexOf(numberMapping, 1).split(''), pattern.split('')).length === 0) {
                numberMapping.set(pattern, 3);
                return false;
            }
            return true;
        });

        numberMapping.set(unidentifiedInput.pop(), 5);

        decodedOutputs.push(parseInt(output.map( (pattern) => numberMapping.get(sort(pattern))).join('')));

    });


    return decodedOutputs.reduce( (total, curr) => total + curr);
}

const sort = (toSort) =>  Array.from(toSort).sort().join('');

const difference = (x, y) => Array.from(x).filter(a => !y.includes(a));
const union = (x, y) => x.concat(y);

const indexOf = (map, searchValue) => {
    for (const [key, value] of map ) {
        if (value === searchValue) {
            return key;
        }
    }
    return undefined;
}

const parseInputString = (input) => input.split('\n');

module.exports = {partOne, partTwo};
