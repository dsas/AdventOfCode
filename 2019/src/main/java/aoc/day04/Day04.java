package aoc.day04;

import aoc.Day;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

public class Day04 implements Day {

    /**
     * Check password validity:
     *
     * A password is valid if:
     *  * It is a six-digit number.
     *  * The value is within the range given in your puzzle input.
     *  * Two adjacent digits are the same (like 22 in 122345).
     *  * Going from left to right, the digits never decrease; they only ever increase or stay the same
     */
    @Override
    public String part1(List<String> input) {
        int validPasswordCount = 0;
        int[] bounds = Stream.of(input.get(0).split("-"))
                .mapToInt(Integer::parseInt)
                .toArray();

        for(int i = bounds[0]; i < bounds[1]; i++ ) {
            if (validatePassword(i, String.valueOf(i).length())) {
                validPasswordCount++;
            }
        }
        return Integer.toString(validPasswordCount);
    }

    /**
     * Check password validity:
     *
     * A password is valid if:
     *  * It is a six-digit number.
     *  * The value is within the range given in your puzzle input.
     *  * It has two (and only two) adjacent digits the same (like 22 in 122345),
     *  * Going from left to right, the digits never decrease; they only ever increase or stay the same
     */
    @Override
    public String part2(List<String> input) {
        int validPasswordCount = 0;
        int[] bounds = Stream.of(input.get(0).split("-"))
                .mapToInt(Integer::parseInt)
                .toArray();

        for(int i = bounds[0]; i < bounds[1]; i++ ) {
            if (validatePassword(i, 2)) {
                validPasswordCount++;
            }
        }
        return Integer.toString(validPasswordCount);
    }

    /**
     * Check password validity:
     *
     * A password is valid if:
     *  * Two adjacent digits are the same (like 22 in 122345).
     *  * Going from left to right, the digits never decrease; they only ever increase or stay the same
     * @param n the password to validate
     * @param maxAdjacent the maximum number of adjacent identical digits
     * @return Whether the password is valid
     */
    private boolean validatePassword(int n, int maxAdjacent) {
        Map<Character, Integer> adjacencyCount = new HashMap<>();
        char currentChar;
        int currentCount;
        String password = Integer.toString(n);

        for (int i = 1; i < password.length(); i++) {
            currentChar = password.charAt(i);
            if (currentChar < password.charAt(i-1)) {
                return false;
            }

            if (password.charAt(i) == password.charAt(i-1)) {
                currentCount = adjacencyCount.getOrDefault(password.charAt(i), 1);
                adjacencyCount.put(currentChar, ++currentCount);
            }
        }
        return !adjacencyCount.isEmpty() && Collections.min(adjacencyCount.values()) <= maxAdjacent;
    }
}
