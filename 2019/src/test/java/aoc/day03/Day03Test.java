package aoc.day03;

import org.junit.Test;

import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.assertEquals;

public class Day03Test {

    @Test
    public void testPart1(){
        // Given
        List<String> input = Arrays.asList("R75,D30,R83,U83,L12,D49,R71,U7,L72", "U62,R66,U55,R34,D71,R55,D58,R83");

        // When
        String result = new Day03().part1(input);

        // Then
        assertEquals(Integer.toString(159), result);
    }

    @Test
    public void testPart2() {
        // Given
        List<String> input = Arrays.asList("R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51", "U98,R91,D20,R16,D67,R40,U7,R15,U6,R7");

        // When
        String result = new Day03().part2(input);

        // Then
        assertEquals(Integer.toString(410), result);
    }
}
