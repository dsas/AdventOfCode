<?php

/**
 * Remove adjacent values of the same value in the opposite case
 * e.g. dabAcCaCBAcCcaDA becomes dabCBAcaDA
 *
 * The values are a-Z (obviously) and are expected on STDIN
 */

function react($polymer)
{
    $reacted = [];
    for ($i = 1; $i < strlen($polymer); $i++) {
        $unit = $polymer[$i];
        $last_unit = end($reacted);

        if ($last_unit && abs(ord($unit) - ord($last_unit)) === 32) {
            array_pop($reacted);
        } else {
            $reacted[] = $unit;
        }
    }

    return join('', $reacted);
}

$in = trim(fgets(STDIN));
$reacted = react($in);
print "Part1: " . strlen($reacted). "\n";

$lengths = [];
foreach (range('a', 'z') as $removal) {
    $to_remove = [$removal, strtoupper($removal)];
    $remaining_polymer = str_replace($to_remove, '', $reacted);
    $lengths[$removal] = strlen(react($remaining_polymer));
}

print "Part2: " . min($lengths) . "\n";
