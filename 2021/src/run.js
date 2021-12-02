/**
 * Requires one argument - the day to run
 */

const fs = require('fs');
const readline = require('readline');

const dayDirectoryPrefix = 'Day';

const question = (questionText) => {
  return new Promise( (resolver) => {
    rl.question(questionText, answer => { resolver(answer)})
  });
};

const validateDay = (day) => {
  if (isNaN(day)) {
    return false;
  }
  if (! fs.existsSync(__dirname + '/' + dayDirectoryPrefix + day)) {
    return false;
  }
  return true;
}

const normaliseDay = (day) => {
  day = day.replace(/Day([\d]*)/i, '$1');
  day = day.padStart(2, "0");
  return day;
};

let rl = readline.createInterface( {input: process.stdin, output: process.stdout } );

(async () => {

let day;

const args = process.argv.slice(2);
if (args.length) {
  day = args[0];
  day = normaliseDay(day);
  if (!validateDay(day)) {
    console.error(day + ' is not a valid day');
    process.exit(1);
  }
} else {
  let validDay = false;
  while (!validDay) {
    const answerDay = await question('Which day should run? ')
    day = normaliseDay(answerDay);
    validDay = validateDay(day);
    if (!validDay) {
     console.info(answerDay + ' is not a valid day');
    }
  }
}
rl.close();

console.info("Running for day " + day);

const solver = require('./' + dayDirectoryPrefix + day);

let input = fs.readFileSync('./src/Day' + day + '/input.txt',  {"encoding":"ascii"});

console.log("Part 1:")
console.log(solver.partOne(input))

console.log("Part 2:");
console.log(solver.partTwo(input));

})();