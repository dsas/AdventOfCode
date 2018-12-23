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
while ($line = fgets(STDIN)) {
    preg_match('/#[0-9]* @ ([0-9]{1,4}),([0-9]{1,4}): ([0-9]{1,4})x([0-9]{1,4})/', $line, $matches);

    list(, $start_x, $start_y, $width, $height) = $matches;

    foreach (range($start_x, $start_x + $width - 1) as $x) {
        foreach (range($start_y, $start_y + $height - 1) as $y) {
            $grid[$x][$y] = ($grid[$x][$y] ?? 0) + 1;
        }
    }
}

$claim_distributions = array_count_values(array_merge(...$grid));
// Don't care about those squares that don't have overlapping areas
unset($claim_distributions[1]);
print array_sum($claim_distributions) . "\n";
