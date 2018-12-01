<?php

/**
 * Starting with a frequency of zero, apply specified frequency changes
 * until the same number is reached twice.
 *
 * The frequency changes (the puzzle input) look like +n or -n and are
 * expected on STDIN, one change per-line.
 */

$instructions = file('php://stdin', FILE_IGNORE_NEW_LINES);
$seen_frequencies = [];
$current_frequency = 0;
while (true) {
    foreach ($instructions as $instruction) {
        $current_frequency += $instruction;
        if (!in_array($current_frequency, $seen_frequencies)) {
            $seen_frequencies[] = $current_frequency;
        } else {
            print $current_frequency . "\n";
            exit(0);
        }
    }
}
