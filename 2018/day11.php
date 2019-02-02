<?php

$serial_number = $argv[1];

// Calculate the power level of each fuel cell
$fuel_cells = [];
foreach (range(1, 300) as $x) {
    foreach (range(1, 300) as $y) {
        $rack_id = $x + 10;
        $power = ($rack_id * $y) + $serial_number;
        $power *= $rack_id;
        $power  = $power % 1000;
        if ($power >= 100) {
            $power = floor($power / 100);
        } else {
            $power = 0;
        }
        $power -= 5;

        $fuel_cells[$x][$y] = $power;
    }
}

// Find the 3x3 grid that has the highest total
$highest_cell = [];
$highest_square_power = 0;
// No need to visit 2x2 border across the right and bottom edges, they
// won't be the top left start of any 3x3 grids.
for ($x = 1; $x < 298; $x++) {
    for ($y = 1; $y < 298; $y++) {
        $cells = GetCells($fuel_cells, $x, $y);
        $square_power = array_sum($cells);
        if ($square_power > $highest_square_power) {
            $highest_cell['x'] = $x;
            $highest_cell['y'] = $y;
            $highest_square_power = $square_power;
        }
    }
}

print_r($highest_cell);

/**
 * Returns the values of the grid entries that are in a 3x3 grid starting from the coordinates given
 *
 * @param $grid array containing values
 * @param $x integer horizontal coordinate
 * @param $y integer vertical coordinate
 * @return array
 */
function GetCells($grid, $start_x, $start_y)
{
    $cells = [];
    for ($x = $start_x; $x <= $start_x +2; $x++) {
        for ($y = $start_y; $y <= $start_y +2; $y++) {
            $cells[] = $grid[$x][$y];
        }
    }

    return $cells;
}
