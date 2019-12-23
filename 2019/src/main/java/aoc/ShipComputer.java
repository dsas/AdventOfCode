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

        while(true) {
            switch(this.memory.get(this.instructionPointer)) {
                case HALT:
                    return this.memory;
                case ADD:
                    add();
                    break;
                case MULTIPLY:
                    multiply();
                    break;
                case READ_INPUT:
                    readFromInput();
                    break;
                case WRITE_OUTPUT:
                    writeToOutput();
                    break;
                default:
                    var invalidOp = this.memory.get(this.instructionPointer);
                    throw new InvalidOpCodeException(String.format("Instruction at %1$d is %2$d which is invalid", this.instructionPointer, invalidOp));
            }
        }
    }

    private void add() {
        int leftOperandRegister = memory.get(instructionPointer + 1);
        int leftValue = memory.get(leftOperandRegister);
        int rightOperandRegister = memory.get(instructionPointer + 2);
        int rightValue = memory.get(rightOperandRegister);
        int targetRegister = memory.get(instructionPointer + 3);

        memory.set(targetRegister, leftValue + rightValue);
        instructionPointer += 4;
    }

    private void multiply() {
        int leftOperandRegister = memory.get(instructionPointer + 1);
        int leftValue = memory.get(leftOperandRegister);
        int rightOperandRegister = memory.get(instructionPointer + 2);
        int rightValue = memory.get(rightOperandRegister);
        int targetRegister = memory.get(instructionPointer + 3);

        memory.set(targetRegister, leftValue * rightValue);
        instructionPointer += 4;
    }

    private void readFromInput() {
        int targetRegister = memory.get(instructionPointer + 1);
        memory.set(targetRegister, input.remove());
        instructionPointer += 2;
    }

    private void writeToOutput() {
        int targetRegister = memory.get(instructionPointer + 1);
        output.add(memory.get(targetRegister));
        instructionPointer += 2;
    }

    public int output() {
        return this.output.poll();
    }
}
