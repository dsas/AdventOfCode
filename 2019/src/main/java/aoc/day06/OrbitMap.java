package aoc.day06;

import java.util.ArrayList;
import java.util.HashMap;

/**
 * Represents a map of various orbiting bodies
 */
class OrbitMap {
    private HashMap<String, Body> bodyList;

    public OrbitMap() {
        this.bodyList = new HashMap<>();
    }

    /**
     * adds a body to the map
     * @param parentName The name of the body that this body is orbiting (doesn't yet have to be mapped)
     * @param bodyName The name of the body to add to the map
     */
    public void addToMap(String parentName, String bodyName) {
        Body body;

        if (!bodyList.containsKey(parentName)) {
            Body parentBody = new Body(parentName);
            bodyList.put(parentName, parentBody);
        }

        if (bodyList.containsKey(bodyName)) {
            body = bodyList.get(bodyName);
        } else {
            body = new Body(bodyName);
            bodyList.put(bodyName, body);
        }

        bodyList.get(parentName).addSatellite(body);
    }

    /**
     * @return the count of direct and indirect orbits on the whole of the map.
     */
    public int numberOfOrbits() {
        int orbitCount = 0;

        for (Body body : this.bodyList.values() ) {
            orbitCount += this.linearPathBetween(body, this.bodyList.get("COM")).size();
        }

        return orbitCount;
    }

    /**
     * Get a list of bodies between the two given bodies
     *
     * The end body must be orbiting the start body
     * @param start
     * @param end
     * @return The list of body names between the two given bodies, if there is no route between them an empty list is returned
     */
    public ArrayList<String> linearPathBetween(Body start, Body end) {
        ArrayList<String> orbitList = new ArrayList<>();
        Body currentBody = start;

        while (currentBody != end) {
            if (currentBody.getName().equals("COM")){
                orbitList.clear();
                return orbitList;
            }
            orbitList.add(currentBody.getName());
            currentBody = this.bodyList.get(currentBody.orbits());
        }

        return orbitList;
    }

    public ArrayList<String> transferPathBetween(String start, String end) {
        ArrayList<String> path = new ArrayList<>();
        ArrayList<String> startToCOM = linearPathBetween(this.bodyList.get(start), this.bodyList.get("COM"));
        ArrayList<String> endToCOM = linearPathBetween(this.bodyList.get(end), this.bodyList.get("COM"));

        for (String currentBodyName : startToCOM) {
            path.add(currentBodyName);
            if (endToCOM.contains(currentBodyName)) {
                break;
            }
        }

        path.addAll(linearPathBetween(this.bodyList.get(end), this.bodyList.get(path.get(path.size()-1))));

        return path;
    }
}