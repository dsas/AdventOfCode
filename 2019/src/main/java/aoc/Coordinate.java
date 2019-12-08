package aoc;

public class Coordinate {
    private int x;
    private int y;
    private int steps;

    public Coordinate(int x, int y, int steps) {
        this.x = x;
        this.y = y;
        this.steps = steps;
    }

    public int getX() {
        return x;
    }

    public int getY() {
        return y;
    }

    public int getSteps() {
        return steps;
    }

    public boolean equals(Object o) {
        if (!(o instanceof Coordinate)) {
            return false;
        }

        Coordinate other = (Coordinate) o;

        return x == other.getX() && y == other.getY();
    }

    public int getManhattanDistance() {
        return Math.abs(x) + Math.abs(y);
    }
}
