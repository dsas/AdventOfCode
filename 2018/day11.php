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

// Find the subset of the grid that has the highest total for part 1 all
// subsets must be 3x3, for part 2 they may be any size
$highest_cell = [];
$highest_square_power = 0;
for ($size = 1; $size < 300; $size++) {
    for ($x = 1; $x + $size < 300; $x++) {
        for ($y = 1; $y + $size < 300; $y++) {
            $cells = GetCells($fuel_cells, $x, $y, $size);
            $square_power = array_sum($cells);
            if ($square_power > $highest_square_power) {
                $highest_cell['x'] = $x;
                $highest_cell['y'] = $y;
                $highest_cell['size'] = $size;
                $highest_square_power = $square_power;
            }
        }
    }
}

print_r($highest_cell);

/**
 * Returns the values of a size square subset of the grid starting from the coordinates given
 *
 * @param $grid array containing values
 * @param $x integer horizontal coordinate
 * @param $y integer vertical coordinate
 * @param $size integer the size of the square subset
 * @return array
 */
function GetCells($grid, $start_x, $start_y, $size)
{
    $cells = [];
    for ($x = $start_x; $x < $start_x + $size; $x++) {
        for ($y = $start_y; $y < $start_y + $size; $y++) {
            // Any out of bounds result mean it's not a square and isn't eliglble.
            if (!isset($grid[$x][$y])) {
                return [];
            }
            $cells[] = $grid[$x][$y];
        }
    }

    return $cells;
}
