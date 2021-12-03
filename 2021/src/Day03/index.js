/**
 * Parse a list of bitfields, take the most common bit in each position to generate a new number and
 * multiply that by the number generated from the least common bit
 */
const partOne = (input) => {
    const parsed = parseInputString(input)
    const bits_per_number = parsed[0].length;
    const most_common_threshold = parsed.length / 2;
    let gamma_binary = '';

    // Generate a bitfield from the most common bit in each bit field position.
    for (let i = 0; i < bits_per_number; i++) {
        let count_of_zeros = parsed.filter((bit_field) => bit_field[i] == 0).length;
        gamma_binary += ( count_of_zeros > most_common_threshold ? '0' : '1');
    }
    let gamma = parseInt(gamma_binary, 2)

    // Generate a bitfield from the least common bit in each bit field position.
    // This must be the exact opposite of the value for the most common bit, so just
    // (clumsily) invert it
    let epsilon_binary = gamma_binary.replace(/[01]/g, (b) => b == '0' ? '1' : '0')
    let epsilon = parseInt(epsilon_binary, 2);

    return gamma * epsilon;
}

/**
 * Filter the list of bitfields to find which bitfield has the most common bit in each position,
 * repeat for least common bit and multiply the two
 */
const partTwo = (input) => {
    const parsed = parseInputString(input)

    // Find bitfield which always has the most common bit in each position
    let oxygen_candidates = parsed;
    let bit = 0;
    while (oxygen_candidates.length != 1) {
        let count_of_zeros = oxygen_candidates.filter(bit_field => bit_field[bit] == 0).length;
        let value_to_keep = count_of_zeros > oxygen_candidates.length / 2 ? '0' : '1';
        oxygen_candidates = oxygen_candidates.filter( (candidate) => candidate[bit] == value_to_keep);
        bit++; 
    }

    // Find bitfield which always has the least common bit in each position
    bit = 0;
    let co2_candidates = parsed;
    while (co2_candidates.length != 1) {
        let count_of_zeros = co2_candidates.filter(bit_field => bit_field[bit] == 0).length;
        let value_to_keep = count_of_zeros <= co2_candidates.length / 2 ? '0' : '1';
        co2_candidates = co2_candidates.filter( (candidate) => candidate[bit] == value_to_keep);
        bit++; 
    }

    return parseInt(co2_candidates[0], 2) * parseInt(oxygen_candidates[0], 2);
}

const parseInputString = (input) => input.split("\n");

module.exports = {partOne, partTwo};
