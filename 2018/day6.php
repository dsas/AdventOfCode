<?php

/**
 * Calculate which of the given coordinates has the largest area
 * of points which are closest to that coordinate according to Manhatten
 * distance. Exclude any coordinates that has an area which abuts the
 * boundaries
 */

$in = file('php://stdin', FILE_IGNORE_NEW_LINES);
$coords = [];
foreach ($in as $line) {
    $coords[$line] = explode(', ', $line);
}

// calculate bounds
$max_x = max(array_column($coords, 0));
$min_x = 0;
$max_y = max(array_column($coords, 1));
$min_y = 0;

// for every point within the bounds, work out it's closest coordinate
// using manhattan distance.
for ($x = $min_x; $x <= $max_x; $x++) {
    for ($y = $min_y; $y <= $max_y; $y++) {
        // Work out the distance to all coordinates
        $coord_distances = [];
        foreach ($coords as $coord_name => $coord) {
            $distance = abs($coord[0] - $x) + abs($coord[1] - $y);
            $coord_distances[$coord_name] = $distance;
        }

        // Record the smallest distance, if there are two the same then
        // discard this point.
        asort($coord_distances);
        $closest_two = array_values(array_slice($coord_distances, 0, 2));
        if ($closest_two[0] !== $closest_two[1]) {
            $coord_points[key($coord_distances)][] = [$x, $y];
        }
    }
}

$most_points_count = 0;
// see which coordinate has the largest number of points
foreach ($coord_points as $coord => $points) {
    if (count($points) <= $most_points_count) {
        continue;
    }
    // if any of a coordinates points touch bounds it's ruled out
    $xborder = array_column($points, 0);
    if (array_intersect([$min_x, $max_x], $xborder)) {
        continue;
    }

    $yborder = array_column($points, 1);
    if (array_intersect([$min_y, $max_y], $yborder)) {
        continue;
    }

    $most_points_count = count($points);
}

print $most_points_count;
