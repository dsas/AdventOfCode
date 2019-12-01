import java.util.ArrayList;

public class Day1TotalFuelRequiredPt2 {
    public static void main(String[] args) {
        ArrayList<Integer> totals = new ArrayList<Integer>();

        for (String string : args) {
            totals.add(Day1TotalFuelRequiredPt2.FuelRequiredForMass(Integer.parseInt(string)));
        }
        
        int sum = totals.stream()
            .mapToInt(Integer::intValue)
            .sum(); 

        System.out.println("The total fuel required is " + sum);
    }

    private static int FuelRequiredForMass(int mass)
    {
        int fuel = (int) Math.floor(mass / 3) - 2;
        if (fuel > 0) {
            fuel += Day1TotalFuelRequiredPt2.FuelRequiredForMass(fuel);
        }
        return Math.max(0, fuel);
    }
}