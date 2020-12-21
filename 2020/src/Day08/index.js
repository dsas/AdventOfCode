/**
 * Given a string, parse into an instruction list and run it, returning the end value of the accumulator.
 * @param {String} input
 */
const partOne = (input) => {
    const instructions = parseInputString(input);
    return runComputer(instructions, false)

}


/**
 * Given a string, return the end value of the accumulator after patching one instruction to avoid an infinite loops.
 *
 * @param {String} input
 */
const partTwo = (input) => {
    const instructions = parseInputString(input);

    for (let instructionToCheck = 1; instructionToCheck < instructions.length; instructionToCheck++)
    {
        let acc;
        // Deep copy of instructions, it's a bit of a hack but that's js.
        let patchedInstructions = JSON.parse(JSON.stringify(instructions));
        let opcodeToCheck = instructions[instructionToCheck][0];

        if (opcodeToCheck === 'acc') {
            continue;
        }
        else if (opcodeToCheck === 'nop') {
            patchedInstructions[instructionToCheck][0] = 'jmp'
        }
        else if (opcodeToCheck === 'jmp') {
            patchedInstructions[instructionToCheck][0] = 'nop'
        }

        try
        {
            acc = runComputer(patchedInstructions, true)
            return acc;
        }
        // eslint-disable-next-line no-empty
        catch (e) { }
    }
}

/**
 * Runs the given computer program until it completes or an infinite loop is detected
 * @param {Array} instructions first is the instruction name (jmp, acc, nop), second is instruction argument
 * @param {Boolean} throwOnInfiniteLoop Throw an exception if an infinite loop is detected
 * @returns {number|Boolean} The value of the accumulator at the end of the run
 */
const runComputer = (instructions, throwOnInfiniteLoop) => {
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

    if (throwOnInfiniteLoop && instructions.length !== instructionPointer) {
        throw 'infinite loop detected';
    }

    return accumulator;
}



const parseInputString = (input) => input.split("\n")
                                         .map(instruction => [instruction.substring(0, 3), parseInt(instruction.substring(3).trim(), 10)]);

module.exports = {partOne, partTwo};
