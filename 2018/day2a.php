<?php

/**
 * Scan the likely candidate boxes (puzzle input), counting the number that
 * have an ID containing exactly two of any letter and then separately
 * counting those with exactly three of any letter. You can multiply those
 * two counts together to get a rudimentary checksum.
 *
 * The IDs are alphabetical and are expected on STDIN, one ID per-line
 */

$box_ids = file('php://stdin', FILE_IGNORE_NEW_LINES);
$saw_twice_count = 0;
$saw_thrice_count = 0;

foreach ($box_ids as $box_id) {
    $word_has_two = false;
    $word_has_three = false;
    $character_frequencies = count_chars($box_id, 1);
    foreach ($character_frequencies as $character => $frequency) {
        if ($frequency === 2) {
            $word_has_two = true;
        } elseif ($frequency === 3) {
            $word_has_three = true;
        }
    }
    if ($word_has_two) {
        $saw_twice_count++;
    }
    if ($word_has_three) {
        $saw_thrice_count++;
    }
}

print $saw_twice_count * $saw_thrice_count . "\n";
