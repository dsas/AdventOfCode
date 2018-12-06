<?php

/**
 * Given some unsorted log entries find out which guard is asleep most
 * often and which minute is the guard most often asleep
 *
 * Expects input on STDIN one log entry per line
 * For example given the input below
 * [1518-11-01 00:00] Guard #10 begins shift
 * [1518-11-01 00:05] falls asleep
 * [1518-11-01 00:25] wakes up
 * [1518-11-01 00:30] falls asleep
 * [1518-11-01 00:55] wakes up
 * [1518-11-01 23:58] Guard #99 begins shift
 * [1518-11-02 00:40] falls asleep
 * [1518-11-02 00:50] wakes up
 * [1518-11-03 00:05] Guard #10 begins shift
 * [1518-11-03 00:24] falls asleep
 * [1518-11-03 00:29] wakes up
 * [1518-11-04 00:02] Guard #99 begins shift
 * [1518-11-04 00:36] falls asleep
 * [1518-11-04 00:46] wakes up
 * [1518-11-05 00:03] Guard #99 begins shift
 * [1518-11-05 00:45] falls asleep
 * [1518-11-05 00:55] wakes up
 * Expects guard #10 and minute 24
 */

$logs = file('php://stdin', FILE_IGNORE_NEW_LINES);
sort($logs);

function get_minute($entry)
{
    preg_match('/\d{2}:(\d{2})/', $entry, $matches);
    return $matches[1];
}

function get_guard($entry)
{
    preg_match('/Guard #(\d*)/', $entry, $matches);
    return $matches[1];
}

// Parse the logs
$guard_snoozes = [];
foreach ($logs as $entry) {
    if (strpos($entry, 'Guard')) {
        $guard_id = get_guard($entry);
        if (!isset($guard_snoozes[$guard_id])) {
            $guard_snoozes[$guard_id] = [];
        }
    } elseif (strpos($entry, 'falls asleep')) {
        $asleep_at = get_minute($entry);
    } else {
        // must be waking up
        $slept_minutes = range($asleep_at, get_minute($entry) - 1);
        $guard_snoozes[$guard_id] = array_merge($guard_snoozes[$guard_id], $slept_minutes);
    }
}

// query the parsed data for the guard with most minutes asleep
$biggest_snoozer = null;
$longest_snooze= 0;
foreach ($guard_snoozes as $guard => $snoozes) {
    $time_snoozing = array_sum(array_count_values($snoozes));
    if ($time_snoozing > $longest_snooze) {
        $biggest_snoozer = $guard;
        $longest_snooze = $time_snoozing;
    }
}

// query the parsed data for which minute that guard was most often asleep
$mins_to_counts = array_count_values($guard_snoozes[$biggest_snoozer]);
arsort($mins_to_counts);
$most_sleepy_minute = key($mins_to_counts);

print "Part 1:\n";
print "The sleepiest guard was $biggest_snoozer\n";
print "Who was most often asleep at $most_sleepy_minute\n";
print "Multipled this is " . $biggest_snoozer * $most_sleepy_minute . "\n";


// Part 2:
// Of all guards, which guard is most frequently asleep at the same minute
$most_regular_guard = null;
$most_regular_minute = 0;
$frequency = 0;
foreach ($guard_snoozes as $guard => $snoozes) {
    $minute_counts = array_count_values($snoozes);
    arsort($minute_counts);
    $most_frequent_for_guard = reset($minute_counts);
    if ($most_frequent_for_guard > $frequency) {
        $most_regular_guard = $guard;
        $most_regular_minute = key($minute_counts);
        $frequency = $most_frequent_for_guard;
    }
}

print "Part 2:\n";
print "The most regular guard was $most_regular_guard\n";
print "Who was most often asleep at $most_regular_minute\n";
print "Multiplied this is " . $most_regular_guard * $most_regular_minute . "\n";
