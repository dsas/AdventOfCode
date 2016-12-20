<?php

function read_stdin()
{
    while ($line = fgets(STDIN)) {
        yield $line;
    }
}

$current_pos = ['x' => 1, 'y' => 1];
$pad = [
    range(1, 3),
    range(4, 6),
    range(7, 9),
];
$code = '';

foreach (read_stdin() as $line) {
    foreach (str_split($line) as $move) {
        $current_pos = Move($current_pos, $move);
    }
    $code .= $pad[$current_pos['y']][$current_pos['x']];
}
print $code . "\n";

function Move($current_pos, $direction)
{
    if ($direction == 'U' && $current_pos['y'] != 0) {
        $current_pos['y']--;
    } elseif ($direction == 'D' && $current_pos['y'] != 2) {
        $current_pos['y']++;
    } elseif ($direction == 'L' && $current_pos['x'] != 0) {
        $current_pos['x']--;
    } elseif ($direction == 'R' && $current_pos['x'] != 2) {
        $current_pos['x']++;
    }
    return $current_pos;
}
