package aoc.day06;

import aoc.Day;

import java.util.*;

public class Day06 implements Day {
    @Override
    public String part1(List<String> input) {

        OrbitMap map = this.buildMap(input);

        return Integer.toString(map.numberOfOrbits());
    }

    /**
     * Build a representation of the orbiting data from the input
     *
     * @param rawData List<String> each entry describing an orbit of the form orbitee)orbiter
     * @return each celestial body as a key with the value being it's direct orbiting bodies
     */
    private OrbitMap buildMap(List<String> rawData) {
        OrbitMap map = new OrbitMap();
        String[] orbit;

        for (String string : rawData) {
            orbit = string.split("\\)");

            map.addToMap(orbit[0], orbit[1]);
        }

        return map;
    }

    @Override
    public String part2(List<String> input) {


        return null;
    }
}

