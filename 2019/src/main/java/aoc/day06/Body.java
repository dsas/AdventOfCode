package aoc.day06;

import java.util.ArrayList;

class Body {
    /**
     * The name of this body
     */
    private String name;

    /**
     * The name of the body that this body directly orbits
     */
    private String orbiting;

    /**
     * The names of the bodies that orbit this body
     */
    private ArrayList<String> satellites;

    public Body(String name) {
        this.name = name;
        this.satellites = new ArrayList<>();
    }

    public String getName() {
        return name;
    }

    public void orbit(String body) {
        this.orbiting = body;
    }

    public String orbits() {
        return this.orbiting;
    }

    public void addSatellite(Body orbiter) {
        orbiter.orbit(this.name);
        satellites.add(orbiter.getName());
    }

    public ArrayList<String> getSatellites() {
        return satellites;
    }
}