package aoc;

import java.util.LinkedList;
import java.util.List;

/**
 * Implementation of an Intcode computer
 *
 * An Intcode program is a list of integers separated by commas.
 * The first integer is an op-code, and subsequent integers are either parameters for that operation or a new op-code
 * Op-codes have a fixed number of parameters, though this varies for each op-code.
 * Executing an op-code will resolve any parameters, perform the operation and then go to the next op-code
 */
public class ShipComputer {
    private static final int ADD = 1;
    private static final int MULTIPLY = 2;
    private static final int READ_INPUT = 3;
    private static final int WRITE_OUTPUT = 4;
    private static final int JUMP_IF_TRUE = 5;
    private static final int JUMP_IF_FALSE = 6;
    private static final int HALT = 99;

    private LinkedList<Integer> input;
    private LinkedList<Integer> output;

    private int instructionPointer;
    private List<Integer> memory;

    public ShipComputer() {
        this.output = new LinkedList<>();
    }

    public ShipComputer(LinkedList<Integer> input) {
        this();
        this.input = input;
    }

    /**
     * Execute an Intcode program, returning the modified program
     * @param program Intcode program to run
     * @return Intcode program after executing the program
     */
    public List<Integer> executeProgram(List<Integer> program) {
        this.instructionPointer = 0;
        this.memory = program;
        int instructionDefinition;
        int opcode;
        int mode;

        while(true) {
            instructionDefinition = this.memory.get(this.instructionPointer);

            opcode = instructionDefinition % 100;
            mode = instructionDefinition - opcode;

            switch(opcode) {
                case HALT:
                    return this.memory;
                case ADD:
                    add(mode);
                    break;
                case MULTIPLY:
                    multiply(mode);
                    break;
                case READ_INPUT:
                    readFromInput(mode);
                    break;
                case WRITE_OUTPUT:
                    writeToOutput(mode);
                    break;
                case JUMP_IF_TRUE:
                    jumpIfTrue(mode);
                    break;
                case JUMP_IF_FALSE:
                    jumpIfFalse(mode);
                    break;
                default:
                    throw new InvalidOpCodeException(String.format("Instruction at %1$d is %2$d which is invalid", this.instructionPointer, opcode));
            }
        }
    }

    /**
     * Performs an add operation
     * Add is op-code one and takes three parameters, so it will consume four integers
     * The second and third parameters are the values to add (either absolute values or the memory location of the
     * absolute values)
     * The fourth parameter is the position to store the result of the addition in.
     */
    private void add(int mode) {
        int[] params = resolveValues(mode);

        int targetRegister = memory.get(instructionPointer + 3);

        memory.set(targetRegister, params[0] + params[1]);
        instructionPointer += 4;
    }

    /**
     * Performs a multiply operation
     * Multiply is op-code one and takes three parameters, so it will consume four integers
     * The second and third parameters are the values to multiply (either absolute values or the memory location of the
     * absolute values)
     * The fourth parameter is the position to store the result of the addition in.
     */
    private void multiply(int mode) {
        int[] params = resolveValues(mode);

        int targetRegister = memory.get(instructionPointer + 3);

        memory.set(targetRegister, params[0] * params[1]);
        instructionPointer += 4;
    }

    /**
     * Get the values to be used in this operation by using the mode
     *
     * @param mode integer with how to interpret each parameter as a fixed value or memory location
     * @return the two values to use in this operation
     *
     * A mode can be either 0 (memory location/position) or 1 (use this fixed value) for each parameter. The 100s digit
     * controls the first parameter and the 1000s digit contains the second parameter
     */
    private int[] resolveValues(int mode) {
        int leftValue;
        int rightValue;
        if (mode / 100 % 10 == 1) {
            leftValue = memory.get(instructionPointer + 1);
        } else {
            leftValue = memory.get(memory.get(instructionPointer + 1));
        }

        if (mode / 1000 % 10 == 1) {
            rightValue = memory.get(instructionPointer + 2);
        } else {
            rightValue = memory.get(memory.get(instructionPointer + 2));
        }

        return new int[] {leftValue, rightValue};
    }

    /**
     * Performs a read from input operation
     * Read is op-code three and takes one parameter, so it will consume two integers
     * The parameter is the position to store the read value in
     */
    private void readFromInput(int mode) {
        int targetRegister;
        if (mode / 100 % 10 == 1) {
            targetRegister = instructionPointer + 1;
        } else {
            targetRegister = memory.get(instructionPointer + 1);
        }

        memory.set(targetRegister, input.remove());
        instructionPointer += 2;
    }

    /**
     * Performs a write to output operation
     * Write is op-code four and takes one parameter, so it will consume two integers
     * The parameter is the value to output (either absolute value or the memory location of the absolute value)
     */
    private void writeToOutput(int mode) {
        int targetRegister;
        if (mode / 100 % 10 == 1) {
            targetRegister = instructionPointer + 1;
        } else {
            targetRegister = memory.get(instructionPointer + 1);
        }

        output.add(memory.get(targetRegister));
        instructionPointer += 2;
    }

    /**
     * @return oldest value in the output buffer, which is then removed
     */
    public int output() {
        return this.output.poll();
    }

    /**
     *
     * @return the whole of the output buffer, emptying it afterwards
     */
    public LinkedList<Integer> outputBuffer() {
        LinkedList<Integer> output = (LinkedList<Integer>) this.output.clone();
        this.output.clear();
        return output;
    }

    /**
     * Performs a jump if true operation
     * Jump if true takes two parameters
     * The first parameter is the value to check for truthiness (either absolute values or the memory location of the
     * absolute values)
     * The second parameter is the position to jump to (either absolute, or the memory location of the absolute value) if
     * the first parameter is truthy.
     * If the first parameter is not truthy then three integers are consumed.
     */
    private void jumpIfTrue(int mode) {
        int[] params = resolveValues(mode);

        if (params[0] != 0){
            instructionPointer = params[1];
        } else {
            instructionPointer += 3;
        }
    }

    /**
     * Performs a jump if false operation
     * Jump if false takes two parameters
     * The first parameter is the value to check for falsiness (either absolute values or the memory location of the
     * absolute values)
     * The second parameter is the position to jump to (either absolute, or the memory location of the absolute value) if
     * the first parameter is falsey.
     * If the first parameter is not falsey then three integers are consumed.
     */
    private void jumpIfFalse(int mode) {
        int[] params = resolveValues(mode);

        if (params[0] == 0){
            instructionPointer = params[1];
        } else {
            instructionPointer += 3;
        }
    }
}
