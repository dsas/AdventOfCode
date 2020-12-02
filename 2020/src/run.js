/**
 * Requires one argument - the day to run
 */

const fs = require('fs');

const args = process.argv.slice(2);
if (!args.length) {
  console.error("No arguments provided, provide the day number");
  process.exit(1);
}

let day = args[0];
day = day.replace(/Day([\d]*)/i, '$1');
day = day.padStart(2, "0");

if (isNaN(day)) {
  console.error(day + " is not a number");
  process.exit(1);
}

console.info("Running for day " + day);

const solver = require('./Day' + day);

let input = fs.readFileSync('./src/Day' + day + '/input.txt',  {"encoding":"ascii"});

console.log("Part 1:")
console.log(solver.partOne(input))

console.log("Part 2:");
console.log(solver.partTwo(input));