package aoc;

import org.junit.Test;

import java.util.*;

import static org.junit.Assert.assertEquals;

public class ShipComputerTest {

    @Test
    public void addNumbers() {
        // 1 + 1 = 2
        testComputer(new ArrayList<>(Arrays.asList(1, 0, 0, 0, 99)), new ArrayList<>(Arrays.asList(2, 0, 0, 0, 99)));
    }

    @Test
    public void multiplyNumbers() {
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
    public void readFromInput() {
        LinkedList<Integer> input = new LinkedList<>(Collections.singletonList(5));
        ShipComputer computer = new ShipComputer(input);
        // Store 5 (input) in position 0
        List<Integer> actualResult = computer.executeProgram(new ArrayList<>(Arrays.asList(3,0,99)));
        assertEquals(new ArrayList<>(Arrays.asList(5,0,99)), actualResult);
    }

    @Test
    public void writeToOutput() {
        ShipComputer computer = new ShipComputer();
        // Output 1
        List<Integer> actualResult = computer.executeProgram(new ArrayList<>(Arrays.asList(4, 1, 99)));
        assertEquals(1, computer.output());
        assertEquals(new ArrayList<>(Arrays.asList(4, 1, 99)), actualResult);
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

    private void testComputer(List<Integer> program, List<Integer> expectedResult) {
        ShipComputer computer = new ShipComputer();

        List<Integer> actualResult = computer.executeProgram(program);
        assertEquals(expectedResult, actualResult);
    }
}
