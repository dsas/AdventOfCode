/**
 * 
 */
const partOne = (input) => {
    const instructions = parseInputString(input)
    var horizontalPosition = 0;
    var depthPosition = 0;

    instructions.forEach(function (instruction) {
        const distance = parseInt(instruction[1]);
        switch (instruction[0]) {
            case 'forward':
                horizontalPosition += distance;
                break;
            case 'down':
                depthPosition += distance;
                break;
            case 'up':
                depthPosition -= distance;
                break;
            default:
                throw 'Unknown direction, expected forward, down or up but got ' + instruction;
        }
    });


    return horizontalPosition * depthPosition;
}

/**
 * 
 */
const partTwo = (input) => {
    const instructions = parseInputString(input)
    var horizontalPosition = 0;
    var depthPosition = 0;
    var aim = 0;

    instructions.forEach(function (instruction) {
        const distance = parseInt(instruction[1]);
        switch (instruction[0]) {
            case 'forward':
                horizontalPosition += distance;
                depthPosition += distance * aim;
                break;
            case 'down':
                aim += distance;
                break;
            case 'up':
                aim -= distance;
                break;
            default:
                throw 'Unknown direction, expected forward, down or up but got ' + instruction;
        }
    });
    return horizontalPosition * depthPosition;

}

const parseInputString = (input) => input.split("\n").filter(s => s).map(s => s.split(' '));

module.exports = {partOne, partTwo};
