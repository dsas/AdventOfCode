<?php

define('BOARD_SIZE', 50);

$landscape = [];
while ($line = fgets(STDIN)) {
    $landscape[] = str_split(trim($line));
}

$time = 0;
while ($time < 10) {
    $landscape_update = $landscape;
    for ($x=0; $x < BOARD_SIZE; $x++) {
        for ($y=0; $y < BOARD_SIZE; $y++) {
            $acre = $landscape[$x][$y];

            $adjacents = GetAdjacents($landscape, $x, $y);
            $adjacents = array_count_values($adjacents);

            switch ($acre) {
                case '.':
                    if (($adjacents['|'] ?? 0) >= 3) {
                        $acre = '|';
                    }
                    break;
                case '|':
                    if (($adjacents['#'] ?? 0) >= 3) {
                        $acre = '#';
                    }
                    break;
                case '#':
                    if (($adjacents['#'] ?? 0) < 1
                        || ($adjacents['|'] ?? 0) < 1) {
                        $acre = '.';
                    }
                    break;
            }
            $landscape_update[$x][$y] = $acre;
        }
    }

    $landscape = $landscape_update;
    $time++;
}

$flat_landscape = array_merge(...$landscape);
$totals = array_count_values($flat_landscape);
$value = ($totals['|'] ?? 0) * ($totals['#'] ?? 0);

print "The resource value is  $value\n";


function GetAdjacents($landscape, $x, $y)
{
    $min_x = max(0, $x - 1);
    $min_y = max(0, $y - 1);
    $max_x = min(BOARD_SIZE - 1, $x + 1);
    $max_y = min(BOARD_SIZE - 1, $y + 1);

    $adjacents = [];
    foreach (range($min_x, $max_x) as $adjacent_x) {
        foreach (range($min_y, $max_y) as $adjacent_y) {
            if (!($adjacent_x === $x && $adjacent_y === $y)) {
                $adjacents[] = $landscape[$adjacent_x][$adjacent_y];
            }
        }
    }

    return $adjacents;
}
