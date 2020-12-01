package aoc.day06;

import org.junit.Test;

import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.assertEquals;

public class Day06Test {
    @Test
    public void testPart1(){
        // Given
        List<String> input = Arrays.asList("COM)B", "B)C", "C)D", "D)E", "E)F", "B)G", "G)H", "D)I", "E)J", "J)K", "K)L");

        // When
        String result = new Day06().part1(input);

        // Then
        assertEquals(Integer.toString(42), result);
    }

}
