<?php

/**
 * Given a list of points and their movement, iterate until the points
 * spell out a word.
 *
 * Input should be in the form of:
 * position=< 9,  1> velocity=< 0,  2>
 * position=< 7,  0> velocity=<-1,  0>
 */

$points = [];
foreach (file('php://stdin', FILE_IGNORE_NEW_LINES) as $raw_line) {
    preg_match('/<([0-9- ]+), ([0-9- ]+)> velocity=<([0-9- ]+), ([0-9- ]+)/', $raw_line, $matches);
    $points[] = [
        'position' => [$matches[1], $matches[2],],
        'velocity' => [$matches[3], $matches[4],]
    ];
}
$frames = 0;
// iterate until the bounding box stops decreasing
do {
    $previous_points = $points;
    foreach ($points as &$point) {
        $point['position'][0] += $point['velocity'][0];
        $point['position'][1] += $point['velocity'][1];
        $point['sum_point'] = array_sum($point['position']);
    }

    $last_bound_range = $bound_range ?? INF;
    // figure out bounding range
    $sum_points = array_column($points, 'sum_point');
    $bound_range = max($sum_points) - min($sum_points);

    $frames++;
} while ($last_bound_range > $bound_range);

DisplayBoard($previous_points);
$frames--; // It's the next to last frame that has the right answer
print "\nThis would take $frames seconds to appear\n";

function DisplayBoard($points)
{
    // Build a board
    $board = [];
    foreach ($points as $point) {
        $position = $point['position'];
        $board[$position[0]][$position[1]] = '#';
        $max_x = max($position[0], $max_x ?? -INF);
        $min_x = min($position[0], $min_x ?? INF);
        $max_y = max($position[1], $max_y ?? -INF);
        $min_y = min($position[1], $min_y ?? INF);
    }

    for ($y = $min_y; $y <= $max_y; $y++) {
        for ($x = $min_x; $x <= $max_x; $x++) {
            print $board[$x][$y] ?? ' ';
        }
        print "\n";
    }
}
