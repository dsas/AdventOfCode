package aoc;

import org.junit.Test;

import java.util.*;

import static org.junit.Assert.assertEquals;

public class ShipComputerTest {

    @Test
    public void addNumbersInPositionMode() {
        // 1 + 1 = 2
        testComputer(new ArrayList<>(Arrays.asList(1, 0, 0, 0, 99)), new ArrayList<>(Arrays.asList(2, 0, 0, 0, 99)));
    }

    @Test
    public void multiplyNumbersInPositionMode() {
        // 3 * 2 = 6
        testComputer(new ArrayList<>(Arrays.asList(2, 3, 0, 3, 99)), new ArrayList<>(Arrays.asList(2, 3, 0, 6, 99)));
        // 99 * 99 = 9801
        testComputer(new ArrayList<>(Arrays.asList(2, 4, 4, 5, 99, 0)), new ArrayList<>(Arrays.asList(2, 4, 4, 5, 99, 9801)));
    }

    @Test
    public void replacingHaltContinues() {
        // 1+1=2, store in place of the first 99
        // 5*6 = 30 store in place of the first 1
        testComputer(new ArrayList<>(Arrays.asList(1, 1, 1, 4, 99, 5, 6, 0, 99)), new ArrayList<>(Arrays.asList(30, 1, 1, 4, 2, 5, 6, 0, 99)));
    }

    @Test
    public void readFromInputInPositionMode() {
        LinkedList<Integer> input = new LinkedList<>(Collections.singletonList(5));
        ShipComputer computer = new ShipComputer(input);
        // Program means put the input value into memory location indicated by 2nd memory location and stop.
        List<Integer> actualResult = computer.executeProgram(new ArrayList<>(Arrays.asList(3,0,99)));
        assertEquals(new ArrayList<>(Arrays.asList(5,0,99)), actualResult);
    }

    @Test
    public void readFromInputInImmediateMode() {
        LinkedList<Integer> input = new LinkedList<>(Collections.singletonList(5));
        ShipComputer computer = new ShipComputer(input);
        // Program means put the input value into memory location and stop
        List<Integer> actualResult = computer.executeProgram(new ArrayList<>(Arrays.asList(103,0,99)));
        assertEquals(new ArrayList<>(Arrays.asList(103,5,99)), actualResult);
    }

    @Test
    public void writeToOutputInPositionMode() {
        ShipComputer computer = new ShipComputer();
        // Program means put the value stored in memory location indicated by 2nd memory location into the output buffer
        // and stop.
        List<Integer> actualResult = computer.executeProgram(new ArrayList<>(Arrays.asList(4, 0, 99)));
        assertEquals(4, computer.output());
        assertEquals(new ArrayList<>(Arrays.asList(4, 0, 99)), actualResult);
    }

    @Test
    public void writeToOutputInImmediateMode() {
        ShipComputer computer = new ShipComputer();
        // Program means put the value stored in 2nd memory location into the output buffer
        List<Integer> actualResult = computer.executeProgram(new ArrayList<>(Arrays.asList(104, 2, 99)));
        assertEquals(2, computer.output());
        assertEquals(new ArrayList<>(Arrays.asList(104, 2, 99)), actualResult);
    }

    @Test
    public void whatGoesInMustComeOut() {
        LinkedList<Integer> input = new LinkedList<>(Collections.singletonList(5));
        ShipComputer computer = new ShipComputer(input);

        // Store 5 (input) in the output
        List<Integer> actualResult = computer.executeProgram(new ArrayList<>(Arrays.asList(3,0,4,0,99)));

        assertEquals(new ArrayList<>(Arrays.asList(5,0,4,0,99)), actualResult);
        assertEquals(5, computer.output());
    }

    @Test
    public void multiplyInImmediate() {
        // 33 * 3 = 99
        testComputer(new ArrayList<>(Arrays.asList(1002, 4, 3, 4, 33)), new ArrayList<>(Arrays.asList(1002, 4, 3, 4, 99)));
    }

    @Test
    public void addInImmediateMode() {
        // 66 + 33 = 99
        testComputer(new ArrayList<>(Arrays.asList(1001, 4, 66, 4, 33)), new ArrayList<>(Arrays.asList(1001, 4, 66, 4, 99)));
    }

    @Test
    public void outputBuffer() {
        ShipComputer computer = new ShipComputer();
        // Program means put the value stored in memory location indicated by 2nd memory location into the output buffer
        // and then do it again, then stop.
        List<Integer> actualResult = computer.executeProgram(new ArrayList<>(Arrays.asList(4, 0, 4, 0, 99)));
        assertEquals(new LinkedList<>(List.of(4, 4)), computer.outputBuffer());
        assertEquals("Output buffer should be drained", 0, computer.outputBuffer().size());
        assertEquals(new ArrayList<>(Arrays.asList(4, 0, 4, 0, 99)), actualResult);
    }

    @Test
    public void jumpsIfTrueJumpsWhenTrueInPositionMode() {
        ShipComputer computer = new ShipComputer();
        // Program means if 1 is not 0 output 5 and end.
        ArrayList<Integer> program = new ArrayList<>(Arrays.asList(5, 1, 4, 99, 4, 0, 99));
        List<Integer> actualResult = computer.executeProgram(program);
        assertEquals(5, computer.output());
        assertEquals(program, actualResult);
    }

    @Test
    public void jumpsIfTrueJumpsWhenTrueInImmediateMode() {
        ShipComputer computer = new ShipComputer();
        // Program means if 1 is not 0 output 105 and end.
        ArrayList<Integer> program = new ArrayList<>(Arrays.asList(105, 1, 4, 99, 4, 0, 99));
        List<Integer> actualResult = computer.executeProgram(program);
        assertEquals(105, computer.output());
        assertEquals(program, actualResult);
    }

    @Test
    public void jumpsIfTrueDoesNotJumpWhenFalseInPositionMode() {
        ShipComputer computer = new ShipComputer();
        // Program means if 0 is 0 output 5 and end.
        ArrayList<Integer> program = new ArrayList<>(Arrays.asList(5, 4, 4, 4, 0, 99));
        List<Integer> actualResult = computer.executeProgram(program);
        assertEquals(5, computer.output());
        assertEquals(program, actualResult);
    }

    @Test
    public void jumpsIfTrueDoesNotJumpWhenFalseInImmediateMode() {
        ShipComputer computer = new ShipComputer();
        // Program means if 0 is 0 output 1005 and end.
        ArrayList<Integer> program = new ArrayList<>(Arrays.asList(1005, 4, 4, 4, 0, 99));
        List<Integer> actualResult = computer.executeProgram(program);
        assertEquals(1005, computer.output());
        assertEquals(program, actualResult);
    }

    private void testComputer(List<Integer> program, List<Integer> expectedResult) {
        ShipComputer computer = new ShipComputer();

        List<Integer> actualResult = computer.executeProgram(program);
        assertEquals(expectedResult, actualResult);
    }
}
