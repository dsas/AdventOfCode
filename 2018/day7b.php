<?php

/**
 * Order some steps so that they are done in the correct order.
 * Then output how many seconds until all the work has been done, each step
 * takes 60 seconds plus the characters numeric value. Each job can be done
 * by one worker, there are 5 workers.
 *
 * Essentially a graph problem really...
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
 * gives 15 with two workers and 1 second steps
 */

$raw_steps = file('php://stdin', FILE_IGNORE_NEW_LINES);
$steps = array_fill_keys(range('A', 'Z'), []);
// parse each line, storing as dependancy => blockers
foreach ($raw_steps as $raw_step) {
    preg_match('/Step ([A-Z]{1}) .* step ([A-Z]{1})/', $raw_step, $matches);
    $steps[$matches[2]][] = $matches[1];
}
ksort($steps);

$steps_complete = [];
$steps_working = [];
$max_workers = 5;
$busy_workers = 0;
$time = 0;

while ($steps) {
    if ($busy_workers !== $max_workers) {
        // There are free workers, find them some work to do, no other
        // worker must be working it and it must not already be complete.
        foreach ($steps as $step => $prerequisites) {
            if (!array_key_exists($step, $steps_working)
                && !array_diff($prerequisites, $steps_complete)) {
                $busy_workers++;
                $steps_working[$step] = 60 + ord($step) - 64;
                if ($busy_workers === $max_workers) {
                    break;
                }
            }
        }
    }

    foreach ($steps_working as $step => &$work_left) {
        $work_left--;
        if ($work_left === 0) {
            $busy_workers--;
            $steps_complete[] = $step;
        }
    }
    $steps = array_diff_key($steps, array_flip($steps_complete));
    $time++;
}

print $time . "\n";
