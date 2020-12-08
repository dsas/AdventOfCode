/**
 * Given a string, parse into an instruction list and run it, returning the end value of the accumulator.
 * @param {String} input
 */
const partOne = (input) => {
    const instructions = parseInputString(input);
    return runComputer(instructions)

}


/**
 * Given a string, return the end value of the accumulator after removing any infinite loops.
 *
 * @param {String} input
 */
const partTwo = (input) => {

}

/**
 * Runs the given computer program until it completes or an infinite loop is detected
 * @param {Array} instructions first is the instruction name (jmp, acc, nop), second is instruction argument
 * @returns {number} The value of the accumulator at the end of the run
 */
const runComputer = (instructions) => {
    let seenInstructionIDs = [];
    let instructionPointer = 0;
    let accumulator = 0;

    while (instructions.length > instructionPointer && !seenInstructionIDs.includes(instructionPointer)) {
        seenInstructionIDs.push(instructionPointer);

        let instruction = instructions[instructionPointer];
        switch (instruction[0]) {
            case 'jmp':
                instructionPointer += instruction[1];
                break;
            case 'acc':
                accumulator += instruction[1];
                instructionPointer++
                break;
            case 'nop':
                instructionPointer++;
                break;
        }
    }

    return accumulator;
}



const parseInputString = (input) => input.split("\n")
                                         .map(instruction => [instruction.substring(0, 3), parseInt(instruction.substring(3).trim(), 10)]);

module.exports = {partOne, partTwo};
