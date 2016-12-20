<?php

$directions = 'R5, L2, L1, R1, R3, R3, L3, R3, R4, L2, R4, L4, R4, R3, L2, L1, L1, R2, R4, R4, L4, R3, L2, R1, L4, R1, R3, L5, L4, L5, R3, L3, L1, L1, R4, R2, R2, L1, L4, R191, R5, L2, R46, R3, L1, R74, L2, R2, R187, R3, R4, R1, L4, L4, L2, R4, L5, R4, R3, L2, L1, R3, R3, R3, R1, R1, L4, R4, R1, R5, R2, R1, R3, L4, L2, L2, R1, L3, R1, R3, L5, L3, R5, R3, R4, L1, R3, R2, R1, R2, L4, L1, L1, R3, L3, R4, L2, L4, L5, L5, L4, R2, R5, L4, R4, L2, R3, L4, L3, L5, R5, L4, L2, R3, R5, R5, L1, L4, R3, L1, R2, L5, L1, R4, L1, R5, R1, L4, L4, L4, R4, R3, L5, R1, L3, R4, R3, L2, L1, R1, R2, R2, R2, L1, L1, L2, L5, L3, L1';

print CalculateMinimumMoves(explode(', ', $directions));
print "\n";
print CalculateMinimumMovesToFirstRepeat(explode(', ', $directions));

/**
 * Given some directions calculate the shortest moves required to get to the point indicated
 *
 * @param $moves string[] Each entry is a string comprising of direction {L,R} and blocks to move
 * @return integer number of blocks away
 */
function CalculateMinimumMoves($moves)
{
    $direction = 'N';
    $current_point = ['x' => 0, 'y' => 0];
    foreach ($moves as $move) {
        $turn = substr($move, 0, 1);
        $blocks = substr($move, 1);

        $direction = Turn($direction, $turn);
        $current_point = Move($current_point, $direction, $blocks);
    }
    return abs($current_point['x']) + abs($current_point['y']);
}

function CalculateMinimumMovesToFirstRepeat($moves)
{
    $direction = 'N';
    $current_point = ['x' => 0, 'y' => 0];
    $visited_points = [$current_point];
    foreach ($moves as $move) {
        $turn = substr($move, 0, 1);
        $blocks = substr($move, 1);

        $direction = Turn($direction, $turn);
        // Just move block by block, recording as we go
        for ($i = 0; $i < $blocks; $i++) {
            $current_point = Move($current_point, $direction, 1);
            if (in_array($current_point, $visited_points)) {
                return abs($current_point['x']) + abs($current_point['y']);
            }
            $visited_points[] = $current_point;
        }
    }
}

/**
 * Given a current direction, rotates 90 degrees left or right to calculate new direction
 *
 * @param $current_direction string N,E,S or W
 * @param $rotation L or R for rotate -90° or +90°
 * @param string Direction
 */
function Turn($current_direction, $rotation)
{
    // Could use degrees and calculate, this is clearer.
    $aTurns = [
        'N' => [
            'L' => 'W',
            'R' => 'E',
        ],
        'E' => [
            'L' => 'N',
            'R' => 'S',
        ],
        'S' => [
            'L' => 'E',
            'R' => 'W',
        ],
        'W' => [
            'L' => 'S',
            'R' => 'N',
        ],
    ];
    return $aTurns[$current_direction][$rotation];
}

/**
 * Move from $point to new point $blocks away due $direction
 * $point array current point
 * $direction string N,E,S or W
 * $blocks integer how many blocks to move
 * @return array The new point
 */
function Move($point, $direction, $blocks)
{
    switch ($direction) {
        case 'N':
            $point['y'] += $blocks;
            break;
        case 'E':
            $point['x'] += $blocks;
            break;
        case 'S':
            $point['y'] -= $blocks;
            break;
        case 'W':
            $point['x'] -= $blocks;
            break;
    }
    return $point;
}
