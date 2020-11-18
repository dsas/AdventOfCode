package aoc.day06;

import aoc.Day;

import java.util.*;

public class Day06 implements Day {
    @Override
    public String part1(List<String> input) {

        HashMap<String, ArrayList<String>> map = this.buildMap(input);

        return Integer.toString(numberOfOrbits(map));
    }

    private int numberOfOrbits(HashMap<String, ArrayList<String>> map) {
        int orbitCount= 0;
        for (String orbit : map.keySet()) {
            orbitCount += numberOfOrbits(map, orbit);
        }
        return orbitCount;
    }

    private int numberOfOrbits(HashMap<String, ArrayList<String>> map, String body) {
        int orbitCount = 0;
        ArrayList<String> orbits = map.get(body);
        orbitCount += orbits.size();

        for (String orbit : orbits ) {
            orbitCount += numberOfOrbits(map, orbit);
        }

        return orbitCount;
    }

    /**
     * Build a representation of the orbiting data from the input
     *
     * @param rawData List<String> each entry describing an orbit of the form orbitee)orbiter
     * @return each celestial body as a key with the value being it's direct orbiting bodies
     */
    private HashMap<String, ArrayList<String>> buildMap(List<String> rawData) {
        HashMap<String, ArrayList<String>> map = new HashMap<>();
        String[] orbit;

        for (String string : rawData) {
            orbit = string.split("\\)");

            for(String body : orbit) {
                if (!map.containsKey(body)) {
                    map.put(body, new ArrayList<>());
                }
            }

            map.get(orbit[0]).add(orbit[1]);
        }

        return map;
    }

    @Override
    public String part2(List<String> input) {
        return null;
    }
}


