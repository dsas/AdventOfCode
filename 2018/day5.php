<?php

/**
 * Prints the length of a polymer fully reacted
 *
 * Prints the length of the shortest polymer after stripping all units
 * of a type.
 *
 * Reacting a polymer means removing all letters that are adjacent to
 * the same letter of the opposite case.
 *
 * input is expected to be a single line on STDIN
 */

/**
 * Remove letters adjacent to the same letters of the opposite case
 * e.g. dabAcCaCBAcCcaDA becomes dabCBAcaDA
 *
 * @param string $polymer a-Z
 * @return string reacted poymer
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
