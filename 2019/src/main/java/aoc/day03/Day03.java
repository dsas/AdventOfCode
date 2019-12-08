package aoc.day03;

import aoc.Coordinate;
import aoc.Day;

import java.util.ArrayList;
import java.util.List;

public class Day03 implements Day {

    @Override
    public String part1(List<String> input) {
        int minDistance;
        // plot line for each input
        ArrayList<Coordinate> firstWire = CreateWire(input.get(0));
        ArrayList<Coordinate> secondWire = CreateWire(input.get(1));

        // work out where the wires intersect. For wires 100s in length this takes > 30s
        firstWire.retainAll(secondWire);

        // work out the closest point to the central port using manhattan distance
        minDistance = firstWire
                .stream()
                .map(Coordinate::getManhattanDistance)
                .min(Integer::compare)
                .get();

        // the answer is the shortest point
        return Integer.toString(minDistance);
    }

    @Override
    public String part2(List<String> input) {
        return null;
    }

    private ArrayList<Coordinate> CreateWire(String rawDirections) {
        int x = 0;
        int y = 0;
        ArrayList<Coordinate> wirePath = new ArrayList<>();

        String[] directions = rawDirections.split(",");
        for (String direction : directions) {

            int distance = Integer.parseInt(direction.substring(1));

            for (; distance >=1; distance--) {
                switch (direction.charAt(0)) {
                    case 'U':
                        y += 1;
                        break;
                    case 'R':
                        x += 1;
                        break;
                    case 'D':
                        y -= 1;
                        break;
                    case 'L':
                        x -= 1;
                        break;
                }
                wirePath.add(new Coordinate(x, y));
            }

        }
        return wirePath;
    }
}
