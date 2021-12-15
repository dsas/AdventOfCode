const assert = require('assert');
const solver = require('./');

describe('Day 14 part one', function() {
  it('should return 1588 with input', function() {
    let input = `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`;
    assert.strictEqual(solver.partOne(input), 1588);
  });
});

describe('Day 14 part two', function() {
  it('should return 2188189693529 with input', function() {
    let input = `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`;
    assert.strictEqual(solver.partTwo(input), 2188189693529);
  });
});