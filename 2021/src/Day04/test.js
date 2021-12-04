const assert = require('assert');
const solver = require('./');

describe('Day 04 part one', function() {
  it('should return 4512 with input', function() {
    let input = `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19
    
 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6
    
14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`;
    assert.strictEqual(solver.partOne(input), 4512);
  });
});

describe('Day 04 parse input', function() {
  it('should find three decks and a call with input', function() {
    let input = `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19
    
 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6
    
14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`;

    const [actualCalls, actualDeck] = solver.parseInputString(input);

    const expectedCalls = [7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1];
    const expectedDeck = [
      [
        [22,13,17,11,0],
        [8,2,23,4,24],
        [21,9,14,16,7],
        [6,10,3,18,5],
        [1,12,20,15,19],
      ],
      [
        [3,15, 0, 2,22],
        [9,18,13,17, 5],
        [19, 8, 7,25,23],
        [20,11,10,24, 4],
        [14,21,16,12, 6],
      ],
      [
        [14,21,17,24, 4],
        [10,16,15, 9,19],
        [18, 8,23,26,20],
        [22,11,13, 6, 5],
        [2, 0,12, 3, 7],
      ]
    ];

    assert.deepEqual(actualCalls, expectedCalls);
    assert.deepEqual(actualDeck, expectedDeck);
  });
});


describe('Day 04 - hasWon', function() {
  it('should be true if has a full row', function()  {
    let input = [
      ['X', 'X', 'X', 'X', 'X'],
      [ 1,   2,   3,   4,   5],
      [ 1,   2,   3,   4,  'X'],
      [ 1,   2,  'X', 'X', 'X'],
      [ 1,  'X', 'X', 'X', 'X'],
    ]
    assert.strictEqual(solver.hasWon(input), true);
  })
  it('should be true if has a full column', function()  {
    let input = [
      ['X', 'X', 'X', 'X', 'X'],
      [ 1,   2,   3,   4,  'X'],
      [ 1,   2,   3,   4,  'X'],
      [ 1,   2,  'X', 'X', 'X'],
      [ 1,  'X', 'X', 'X', 'X'],
    ]
    assert.strictEqual(solver.hasWon(input), true);
  })

  it('should be false for no full columns or rows', function() {
    let input = [
      [1, 'X', 'X', 'X', 'X'],
      [1,  2,  'X', 'X', 'X'],
      [1,  2,   3,  'X', 'X'],
      [1,  2,   3,   4,  'X'],
      [1,  2,   3,   4,   5],
    ]
    assert.strictEqual(solver.hasWon(input), false);

  })
})

describe('Day 04 - scoreCard', function() {
  it('Should give a score of 200 - board sums to 40 and caller is 5', function() {
    let input = [
      ['X', 'X', 'X', 'X', 'X'],
      [1, 2, 3, 4, 'X'],
      [1, 2, 3, 4, 'X'],
      [1, 2, 3, 4, 'X'],
      [1, 2, 3, 4, 'X'],
    ]
    assert.strictEqual(solver.scoreCard(input, 5), 200);
  });
})

describe('Day 04 part two', function() {
  it('should return 1924 with input', function() {
    let input = `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19
    
 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6
    
14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`;
    assert.strictEqual(solver.partTwo(input), 1924);
  });
});