<?php

/**
 * Order some steps so that they are done in the correct order.
 *
 * Essentially a graph problem.
 *
 * Expects the instructions on stdin one per-line
 *
 * Step C must be finished before step A can begin.
 * Step C must be finished before step F can begin.
 * Step A must be finished before step B can begin.
 * Step A must be finished before step D can begin.
 * Step B must be finished before step E can begin.
 * Step D must be finished before step E can begin.
 * Step F must be finished before step E can begin.
 *
 * gives CABDFE
 */

$raw_steps = file('php://stdin', FILE_IGNORE_NEW_LINES);
$steps = array_fill_keys(range('A', 'Z'), []);
// parse each line, storing as dependancy => blockers
foreach ($raw_steps as $raw_step) {
    preg_match('/Step ([A-Z]{1}) .* step ([A-Z]{1})/', $raw_step, $matches);
    $steps[$matches[2]][] = $matches[1];
}

$steps_complete = [];
ksort($steps);

while ($steps) {
    foreach ($steps as $step => $prerequisites) {
        if (!array_diff($prerequisites, $steps_complete)) {
            print $step;
            $steps_complete[] = $step;
            break;
        }
    }
    $steps = array_diff_key($steps, array_flip($steps_complete));
}

print "\n";
