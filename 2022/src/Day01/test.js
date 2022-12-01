const assert = require('assert');
const solver = require('./');

describe('Day 01 part one', function() {
  it('should give the calorie count from the 4th group - 24k', function() {
    let input = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;
    assert.strictEqual(solver.partOne(input), 24000);
  });
});

describe('Day 01 part two', function () {
  it('should give the calorie count from the top 3 most calorific elves 45k', function () {
    let input = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;
    assert.strictEqual(solver.partTwo(input), 45000);
  });
});
