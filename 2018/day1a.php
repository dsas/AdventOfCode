<?php

/**
 * Starting with a frequency of zero, what is the resulting frequency
 * after all of the changes in frequency have been applied?
 *
 * The frequency changes (the puzzle input) look like +n or -n and are
 * expected on STDIN, one change per-line.
 */


print array_sum(file('php://stdin', FILE_IGNORE_NEW_LINES));
