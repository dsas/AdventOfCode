package aoc;

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
    private static final int HALT = 99;

    /**
     * Execute an Intcode program, returning the modified program
     * @param program Intcode program to run
     * @return Intcode program after executing the program
     */
    public List<Integer> ExecuteProgram(List<Integer> program) {
        int currentRegister = 0;

        while(true) {
            int currentOpCode = program.get(currentRegister);

            if (currentOpCode == HALT) {
                return program;
            }

            int leftOperandRegister = program.get(currentRegister + 1);
            int leftValue = program.get(leftOperandRegister);
            int rightOperandRegister = program.get(currentRegister + 2);
            int rightValue = program.get(rightOperandRegister);
            int targetRegister = program.get(currentRegister + 3);

            switch(currentOpCode) {
                case ADD:
                    program.set(targetRegister, leftValue + rightValue);
                    break;
                case MULTIPLY:
                    program.set(targetRegister, leftValue * rightValue);
                    break;
            }
            currentRegister += 4;
        }
    }
}
