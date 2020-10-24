package aoc;

import java.util.LinkedList;
import java.util.List;

/**
 * Implementation of an Intcode computer
 *
 * An Intcode program is a list of integers separated by commas.
 * The first position in the list will be an opcode - 1 (add), 2 (multiply) or 99 (halt immediately).
 * The second and third positions in the list are the values to operate on.
 * The fourth position in the list is the position to store the result of the operation in.
 * Execution then moves to the next opcode (every fourth value)
 */
public class ShipComputer {
    private static final int ADD = 1;
    private static final int MULTIPLY = 2;
    private static final int READ_INPUT = 3;
    private static final int WRITE_OUTPUT = 4;
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
                default:
                    throw new InvalidOpCodeException(String.format("Instruction at %1$d is %2$d which is invalid", this.instructionPointer, opcode));
            }
        }
    }

    private void add(int mode) {
        int[] params = resolveValues(mode);

        int targetRegister = memory.get(instructionPointer + 3);

        memory.set(targetRegister, params[0] + params[1]);
        instructionPointer += 4;
    }

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
}
