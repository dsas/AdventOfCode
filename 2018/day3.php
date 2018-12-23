<?php

/**
 * Find overlapping areas
 *
 * The input is expected on STDIN and consists of multiple lines looking
 * like "#1 @ 1,3: 4x4" where #1 is the id of the area, 1,3 is the x,y
 * coordinates of where the area started and 4x4 are the dimensions of the
 * area.
 *
 * Will output the number of points with overlapping claims and the only
 * claim that doesn't overlap.
 */
$grid = [];
$disjoint_claims = [];

while ($line = fgets(STDIN)) {
    preg_match('/#([0-9]*) @ ([0-9]{1,4}),([0-9]{1,4}): ([0-9]{1,4})x([0-9]{1,4})/', $line, $matches);

    list(, $id, $start_x, $start_y, $width, $height) = $matches;

    foreach (range($start_x, $start_x + $width - 1) as $x) {
        foreach (range($start_y, $start_y + $height - 1) as $y) {
            $grid[$x][$y][] = $id;
        }
    }
    $disjoint_claims[] = $id;
}

$has_overlaps_count = 0;
foreach ($grid as $row) {
    foreach ($row as $claims) {
        if (count($claims) > 1) {
            $has_overlaps_count++;
            $disjoint_claims = array_diff($disjoint_claims, $claims);
        }
    }
}

print "Part1: The number of overlapping claims is $has_overlaps_count\n";
print "Part2: The only claim that doesn't overlap any other is " . array_pop($disjoint_claims) . "\n";
