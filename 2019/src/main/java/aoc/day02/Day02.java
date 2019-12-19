package aoc.day02;

import aoc.Day;
import aoc.ShipComputer;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class Day02 implements Day {

    @Override
    public String part1(List<String> input) {

        List<Integer> program = CsvLineToInts(input.get(0));

        program.set(1, 12);
        program.set(2,2);

        ShipComputer computer = new ShipComputer();
        program = computer.executeProgram(program);

        return program.get(0).toString();
    }

    @Override
    public String part2(List<String> input) {
        List<Integer> resultState;
        List<Integer> initialState = CsvLineToInts(input.get(0));
        List<Integer> program;
        ShipComputer computer = new ShipComputer();

        for (int i = 0; i < 100; i++) {
           for (int j = 0; j < 100; j++) {
               program = new ArrayList<>(initialState);
               program.set(1, i);
               program.set(2, j);

               resultState = computer.executeProgram(program);
               if (resultState.get(0) == 19690720) {
                   return Integer.toString(100 * i + j);
               }
           }
        }
        throw new RuntimeException("Up the range");
    }

    private List<Integer> CsvLineToInts(String line) {
        return Stream.of(line.split(","))
                .map(Integer::parseInt)
                .collect(Collectors.toList());
    }

}
