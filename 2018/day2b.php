<?php

/**
 * Find the two IDs that differ by exactly one character and output all
 * letters that they have  in common.
 *
 * The IDs are alphabetical and are expected on STDIN, one ID per-line
 */

$box_ids = file('php://stdin', FILE_IGNORE_NEW_LINES);

$id_count = count($box_ids);

for ($outer = 0; $outer != $id_count; $outer++) {
    $outer_id = $box_ids[$outer];
    for ($inner = $outer + 1; $inner != $id_count; $inner++) {
        $inner_id = $box_ids[$inner];
        if (levenshtein($outer_id, $inner_id) === 1) {
            $common_letters = '';
            $id_length = strlen($outer_id);
            for ($char_pos = 0; $char_pos < $id_length; $char_pos++) {
                if ($inner_id[$char_pos] === $outer_id[$char_pos]) {
                    $common_letters .= $outer_id[$char_pos];
                }
            }
        }
    }
}

print $common_letters . "\n";
