package aoc.day01;

import org.junit.Test;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.Assert.assertEquals;

public class Day01Test {

    @Test
    public void testPart1(){
        // Given
        List<String> input = Arrays.asList("100756", "1969", "14", "12");

        // When
        String result = new Day01().part1(input);

        // Then
        assertEquals(Integer.toString(33583 + 654 + 2 + 2), result);
    }

    @Test
    public void testPart2(){
        // Given
        List<String> input = Collections.singletonList("100756");

        // When
        String result = new Day01().part2(input);

        // Then
        assertEquals("50346", result);
    }
}
