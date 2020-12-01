package aoc.day06;

import java.util.ArrayList;
import java.util.HashMap;

class OrbitMap {
    private HashMap<String, Body> bodyList;

    public OrbitMap() {
        this.bodyList = new HashMap<>();
    }

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

    public int numberOfOrbits() {
        int orbitCount = 0;

        for (Body body : this.bodyList.values() ) {
            orbitCount += this.linearPathBetween(body, this.bodyList.get("COM")).size();
        }

        return orbitCount;
    }

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
}