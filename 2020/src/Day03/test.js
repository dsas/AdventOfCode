const assert = require('assert');
const solver = require('./');

describe('Day 03 part one', function() {
  it('should hit seven trees moving ⇨ 3 locations and ⇩ one on this field', function() {
    let input = `..##.......
    #...#...#..
    .#....#..#.
    ..#.#...#.#
    .#...##..#.
    ..#.##.....
    .#.#.#....#
    .#........#
    #.##...#...
    #...##....#
    .#..#...#.#`;
    assert.strictEqual(solver.partOne(input), 7);
  });
});

describe('Day 3 part two', function() {
  it('product of trees hit across 5 runs of varying trajectories should be 336', function() {
    let input = `..##.......
    #...#...#..
    .#....#..#.
    ..#.#...#.#
    .#...##..#.
    ..#.##.....
    .#.#.#....#
    .#........#
    #.##...#...
    #...##....#
    .#..#...#.#`;
    assert.strictEqual(solver.partTwo(input), 336);
  });
});