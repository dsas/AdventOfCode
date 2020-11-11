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
        int diagnosticCode;
        // Provided program will run a series of diagnostic tests on the ShipComputer
        List<Integer> thermalDiagnosticProgram = CsvLineToInts(input.get(0));

        // Tell the program to test the ships aircon unit (system 1)
        diagnosticCode = runDiagnosticsOnSystem(thermalDiagnosticProgram, 1);

        return Integer.toString(diagnosticCode);
    }

    @Override
    public String part2(List<String> input) {
        int diagnosticCode;
        // Provided program will run a series of diagnostic tests on the ShipComputer
        List<Integer> thermalDiagnosticProgram = CsvLineToInts(input.get(0));

        // Tell the program to test the ships thermal radiator (system 5)
        diagnosticCode = runDiagnosticsOnSystem(thermalDiagnosticProgram, 5);

        return Integer.toString(diagnosticCode);
    }

    private int runDiagnosticsOnSystem(List<Integer> diagnosticProgram, int systemToDiagnose) {
        LinkedList<Integer> inputInstruction = new LinkedList<>();
        inputInstruction.add(systemToDiagnose);

        ShipComputer computer = new ShipComputer(inputInstruction);
        computer.executeProgram(diagnosticProgram);

        LinkedList<Integer> diagnosticOutput = computer.outputBuffer();

        // The system will output the result of each test and finally it will output a
        // diagnostic code and halt.
        int diagnosticCode = diagnosticOutput.removeLast();

        if (!this.checkDiagnosticSuccessful(diagnosticOutput)) {
            throw new RuntimeException("Test failure " + diagnosticOutput.toString());
        }

        return diagnosticCode;
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
