const assert = require('assert');
const solver = require('./');

describe('Day 12 part one', function() {
  it('should return 10 with input', function() {
    let input = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`;
    assert.strictEqual(solver.partOne(input), 10);
  });

  it('should return 226 with input', function() {
    let input = `fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW`;
    assert.strictEqual(solver.partOne(input), 226);
  })
});

describe('Day 12 part two', function() {
  it('should return 36 with input', function() {
    let input = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`;
    assert.strictEqual(solver.partTwo(input), 36);
  });
  it('should return 103 with input', function() {
    let input = `dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc`;
    assert.strictEqual(solver.partTwo(input), 103);
  });
  it('should return 3509 with input', function() {
    let input = `fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW`;
    assert.strictEqual(solver.partTwo(input), 3509);
  })
});