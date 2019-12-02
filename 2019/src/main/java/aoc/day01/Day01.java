package aoc.day01;

import aoc.Day;

import java.util.ArrayList;
import java.util.List;

public class Day01 implements Day {

    @Override
    public String part1(List<String> input) {
        ArrayList<Integer> totals = new ArrayList<>();

        for (String string : input) {
            totals.add(this.FuelRequiredForMass(Integer.parseInt(string)));
        }

        int sum = totals.stream()
                .mapToInt(Integer::intValue)
                .sum();

        return Integer.toString(sum);

    }

    @Override
    public String part2(List<String> input) {
        ArrayList<Integer> totals = new ArrayList<Integer>();

        for (String string : input) {
            totals.add(this.FuelRequiredForMassAndFuel(Integer.parseInt(string)));
        }

        int sum = totals.stream()
                .mapToInt(Integer::intValue)
                .sum();

        return Integer.toString(sum);
    }

    private int FuelRequiredForMass(int mass) {
        return (int) Math.floor(mass / 3) - 2;
    }

    private int FuelRequiredForMassAndFuel(int mass) {
        int fuel = this.FuelRequiredForMass(mass);
        if (fuel > 0) {
            fuel += this.FuelRequiredForMassAndFuel(fuel);
        }
        return Math.max(0, fuel);
    }

}
