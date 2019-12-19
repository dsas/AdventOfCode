package aoc;

import org.junit.Test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

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

    public void testComputer(List<Integer> program, List<Integer> expectedResult) {
        ShipComputer computer = new ShipComputer();

        List<Integer> actualResult = computer.executeProgram(program);
        assertEquals(expectedResult, actualResult);
    }
}
