<?php

$in = 'dabAcCaCBAcCcaDA';

for ($i = 0; $i < strlen($in); $i++) {
    $curr_char = ord($in[$i]);
    if (isset($in[$i+1])) {
        $next_char = ord($in[$i + 1]);
        if (abs($curr_char - $next_char) === 32) {
            $in = substr_replace($in, '', $i, 2);
            $i-=2;
        }
    }
}
print $in;
