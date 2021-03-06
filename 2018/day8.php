<?php

/**
 * Build a tree from the input
 * For part 1 return the sum of the values of each node
 * For part 2 instead of the simple sum of each nodes values, only use
 * the values of nodes which are mentioned in it's parents metadata.
 *
 * The input looks like a string of numbers, e.g.
 * 2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2
 *
 * The first character is the number of child nodes.
 * The second character is the number of "metadata" entries
 * This is then repeated by the definitions of any child nodes
 * This is then followed by any "metadata" entries.
 *
 * The number given above parses to:
 * A - 1,1,2
 * | - B - 10,11,12
 * | - C - 2
 *     | - D - 99
 */

$input = explode(' ', trim(fgets(STDIN)));

$cursor = 0;
$tree = buildTree($input, $cursor);

print "The sum of all metadata is " . sumMetadata($tree) . "\n";
print "The calculated total is " . calculateTotal($tree) . "\n";

function buildTree($input, &$cursor)
{
    $node = new stdClass();
    $node_count = $input[$cursor];
    $cursor++;
    $metadata_count = $input[$cursor];
    $cursor++;

    $node->children = [];
    for ($i = 1; $i <= $node_count; $i++) {
        $node->children[] = buildTree($input, $cursor);
    }

    $metadata = [];
    if ($metadata_count) {
        $metadata = array_slice($input, $cursor, $metadata_count);
    }
    $cursor += $metadata_count;

     $node->metadata = $metadata;

    return $node;
}

function sumMetadata($node)
{
    $meta_sum = array_sum($node->metadata);
    foreach ($node->children as $child) {
        $meta_sum += sumMetadata($child);
    }

    return $meta_sum;
}

function calculateTotal($node)
{
    if (count($node->children) === 0) {
        return array_sum($node->metadata);
    }
    $total = 0;
    foreach ($node->metadata as $v) {
        if (isset($node->children[$v - 1])) {
            $total += calculateTotal($node->children[$v - 1]);
        }
    }
    return $total;
}
