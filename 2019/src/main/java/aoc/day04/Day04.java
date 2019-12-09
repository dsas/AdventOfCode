package aoc.day04;

import aoc.Day;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

public class Day04 implements Day {

    @Override
    public String part1(List<String> input) {
        int validPasswordCount = 0;
        int[] bounds = Stream.of(input.get(0).split("-"))
                .mapToInt(Integer::parseInt)
                .toArray();

        for(int i = bounds[0]; i < bounds[1]; i++ ) {
            if (validatePassword(i)) {
                validPasswordCount++;
            }
        }
        return Integer.toString(validPasswordCount);
    }

    @Override
    public String part2(List<String> input) {
        return null;
    }

    /**
     * Check password validity:
     *
     * A password is valid if:
     *  * It is a six-digit number.
     *  * The value is within the range given in your puzzle input.
     *  * Two adjacent digits are the same (like 22 in 122345).
     *  * Going from left to right, the digits never decrease; they only ever increase or stay the same
     * @param n the password to validate
     * @return Whether the password is valid
     */
    private boolean validatePassword(int n) {
        boolean adjacentIdentical = false;
        if (n < 100000 || n > 999999) {
            return false;
        }

        String password = Integer.toString(n);

        for (int i = 1; i < password.length(); i++) {
            if (password.charAt(i) < password.charAt(i-1)) {
                return false;
            }
            adjacentIdentical = adjacentIdentical || password.charAt(i) == password.charAt(i-1);
        }
        return adjacentIdentical;
    }
}
