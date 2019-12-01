import java.util.ArrayList;

public class Day1TotalFuelRequired {
    public static void main(String[] args) {
        ArrayList<Integer> totals = new ArrayList<Integer>();

        for (String string : args) {
            totals.add(Day1TotalFuelRequired.FuelRequiredForMass(Integer.parseInt(string)));
        }
        
        int sum = totals.stream()
            .mapToInt(Integer::intValue)
            .sum(); 

        System.out.println("The total fuel required is " + sum);
    }

    private static int FuelRequiredForMass(int mass)
    {
        return (int) Math.floor(mass / 3) - 2;
    }
}