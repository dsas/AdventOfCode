const assert = require( 'assert' );
const solver = require( './' );

describe( 'Day 07 part one', function () {
	it( 'should return 95437 with input', function () {
		let input = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;
		assert.strictEqual( solver.partOne( input ), 95437 );
	} );
} );

describe( 'Day 07 part two', function () {
	it( 'should return 24933642 with input', function () {
		let input = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;
		assert.strictEqual( solver.partTwo( input ), 24933642 );
	} );
} );
