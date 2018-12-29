<?php

// Bug in PHPs gc, see
// https://reddit.com/r/adventofcode/comments/a4kvmv/day_9_segfaulting_in_php_for_part_2/ebg64uq/
gc_disable();

$in = fgets(STDIN);
preg_match('/([0-9]*) players; last marble is worth ([0-9]*) points/', $in, $matches);

list(, $num_players, $last_marble) = $matches;

$score = Play($num_players, $last_marble);
        print memory_get_peak_usage();
print "The highest score is " . $score . "\n";

// Part two
$score = Play($num_players, $last_marble * 100);
print "When playing with 100 * more marbles, the highest score is " . $score . "\n";

/**
 * Play the "marble madness" game with the given number of players and marbles
 * @param integer $num_players
 * @param integer $last_marble
 * @return integer the winning scores
 */
function Play($num_players, $last_marble)
{
    $scores = array_fill_keys(range(1, $num_players), 0);

    $current_marble = new DoubleLinkedNode(0);

    $current_player = 1;

    for ($marble = 1; $marble <= $last_marble; $marble++) {
        if ($marble % 23 === 0) {
            $scores[$current_player] += $marble;
            for ($i = 0; $i < 7; $i++) {
                $current_marble = $current_marble->previous();
            }
            $scores[$current_player] += $current_marble->getValue();
            $current_marble = $current_marble->remove();
        } else {
            $current_marble = $current_marble->next()->addAfter($marble);
        }

        $current_player++;
        if ($current_player > $num_players) {
            $current_player = 1;
        }
    }
    return max($scores);
}


/**
 * Doubly linked node
 *
 * Each node has a value.
 * Each node is always linked to a previous and next node, if there's just one node then it's linked
 * to itself
 */
class DoubleLinkedNode
{
    private $value;
    private $previous;
    private $next;

    public function __construct($value, DoubleLinkedNode $previous = null, DoubleLinkedNode $next = null)
    {
        $this->value = $value;

        if ($previous === null) {
            $previous = $this;
        }
        $this->previous = $previous;

        if ($next === null) {
            $next = $this;
        }
        $this->next = $next;
    }

    public function getValue()
    {
        return $this->value;
    }

    public function setPrevious(DoubleLinkedNode $node)
    {
        $this->previous = $node;
    }

    public function previous(): DoubleLinkedNode
    {
        return $this->previous;
    }

    public function setNext(DoubleLinkedNode $next)
    {
        $this->next = $next;
    }

    public function next(): DoubleLinkedNode
    {
        return $this->next;
    }

    /**
     * Add a new node after this one with the given value
     *
     * @param $value The value to give to the node being added
     * @return DoubleLinkedNode The newly added node
     */
    public function addAfter($value): DoubleLinkedNode
    {
        $node = new DoubleLinkedNode($value, $this, $this->next);
        if ($this->next !== null) {
            $this->next->setPrevious($node);
        }
        $this->next = $node;
        return $node;
    }

    /**
     * Remove the node from the list
     *
     * @return DoubleLinkedNode the next node in the list before this one was removed
     */
    public function remove(): DoubleLinkedNode
    {
        $this->previous->setNext($this->next);
        $this->next->setPrevious($this->previous);
        // The PHP GC has an issue, so clean-up references
        $next = $this->next;
        $this->previous = null;
        $this->next = null;
        return $next;
    }
}
