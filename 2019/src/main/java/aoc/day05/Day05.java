package aoc.day05;

import aoc.Day;
import aoc.ShipComputer;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class Day05 implements Day {

    @Override
    public String part1(List<String> input) {

        // Provided program will run a series of diagnostic tests on the ShipComputer
        List<Integer> thermalDiagnosticProgram = CsvLineToInts(input.get(0));

        // Tell the program to test the ships aircon unit (system 1)
        LinkedList<Integer> inputInstruction = new LinkedList<>();
        inputInstruction.add(1);

        ShipComputer computer = new ShipComputer(inputInstruction);
        computer.executeProgram(thermalDiagnosticProgram);

        LinkedList<Integer> thermalDiagnosticOutput = computer.outputBuffer();

        // The system will output the result of each test and finally it will output a
        // diagnostic code and halt.
        int diagnosticCode = thermalDiagnosticOutput.removeLast();

        if (!this.checkDiagnosticSuccessful(thermalDiagnosticOutput)) {
            throw new RuntimeException("Test failure " + thermalDiagnosticOutput.toString());
        }

        return Integer.toString(diagnosticCode);
    }

    @Override
    public String part2(List<String> input) {
        throw new RuntimeException("Not implemented yet");
    }

    private boolean checkDiagnosticSuccessful(LinkedList<Integer> testOutput) {
        return testOutput.stream().allMatch(o -> o == 0);
    }

    private List<Integer> CsvLineToInts(String line) {
        return Stream.of(line.split(","))
                .map(Integer::parseInt)
                .collect(Collectors.toList());
    }
}
