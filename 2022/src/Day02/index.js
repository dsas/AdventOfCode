/*
 * Calculate my total score over all games
 * Scoring algorithm:
 *  6 points for a win: X > C, Y > A, Z > B
 *  3 points for a draw: X = A, Y = B, Z = C
 *  0 points for a loss: X < B, Y < C, Z < A
 *  Bonus points: X = 1, Y = 2, Z = 3
 *
 * My approach here was to manually pre-compute all possible games and the resulting scores and then just look up the score for each game.
 *
 * @param {string} input - A string of games, one per line, their play and my play, space separated e.g. 'A X' means they played A and I played X (ergo we drew)
 * @returns {number} - My total score over all games
 */
const partOne = (input) => {
  const scorePermutations = {
    // Oponent's play, my play => bonus points + score
    'A X': 1 + 3,
    'A Y': 2 + 6,
    'A Z': 3 + 0,
    'B X': 1 + 0,
    'B Y': 2 + 3,
    'B Z': 3 + 6,
    'C X': 1 + 6,
    'C Y': 2 + 0,
    'C Z': 3 + 3,
  }

  const parsedInput = parseInputString(input);
  return parsedInput.reduce( (score, fixture) => scorePermutations[fixture] + score, 0);
}

/*
 * Calculate my total score over all games
 * Scoring algorithm:
 *  6 points for a win: Z (A > C, B > A, C > B)
 *  3 points for a draw: Y (A = A, B = B, C = C)
 *  0 points for a loss: X (A < B, B < C, C < A)
 *  Bonus points: A = 1, B = 2, C = 3
 *
 * My approach here was to manually pre-compute all possible games and the resulting scores and then just look up the score for each game.
 *
 * @param {string} input - A string of games, one game per line, their play, game result, space separated e.g. 'A X' means they played A and won (ergo I played C)
 * @returns {number} - My total score over all games
 */
const partTwo = (input) => {
  const scorePemutations = {
    // Oponent's play, game result => bonus points + score
    'A X': 3 + 0,
    'A Y': 1 + 3,
    'A Z': 2 + 6,
    'B X': 1 + 0,
    'B Y': 2 + 3,
    'B Z': 3 + 6,
    'C X': 2 + 0,
    'C Y': 3 + 3,
    'C Z': 1 + 6,
  };
  let parsedInput = parseInputString(input);
  return parsedInput.reduce( (score, fixture) => scorePemutations[fixture] + score, 0);
}


const parseInputString = (input) => input.trim().split("\n").map(s => s.trim());

module.exports = {partOne, partTwo};
