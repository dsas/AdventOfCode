package aoc;

import org.junit.Test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import static org.junit.Assert.assertEquals;

public class ShipComputerTest {

    @Test
    public void executeProgram(){

        ShipComputer computer = new ShipComputer();

        // I feel bad but it's easier to declare this list of tests and deal with the boxing than the alternative
        int[][][] testCases = {
                {{1,0,0,0,99}, {2,0,0,0,99}},
                {{2,3,0,3,99}, {2,3,0,6,99}},
                {{2,4,4,5,99,0}, {2,4,4,5,99,9801}},
                {{1,1,1,4,99,5,6,0,99}, {30,1,1,4,2,5,6,0,99}}};

        for (int[][] testCase : testCases) {
            // Given
            List<Integer> program = intToInteger(testCase[0]);

            // When
            List<Integer> result = computer.ExecuteProgram(program);

            // Then
            assertEquals(intToInteger(testCase[1]), result);
        }
    }

    private List<Integer> intToInteger(int[] intArray) {
        return Arrays.stream(intArray).boxed().collect(Collectors.toList());
    }
}
