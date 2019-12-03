package aoc.day02;

import aoc.Day;
import aoc.ShipComputer;

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
        program = computer.ExecuteProgram(program);


        return program.get(0).toString();
    }

    @Override
    public String part2(List<String> input) {

        return "";
    }

    private List<Integer> CsvLineToInts(String line) {

        return Stream.of(line.split(","))
                .map(Integer::parseInt)
                .collect(Collectors.toList());
    }

}
