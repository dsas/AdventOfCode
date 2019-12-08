package aoc;

public class Coordinate {
    private int x;
    private int y;

    public Coordinate(int x, int y) {
        this.x = x;
        this.y = y;
    }

    public int getX() {
        return x;
    }

    public int getY() {
        return y;
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
