/**
 * 
 */
const partOne = (input) => {
    const parsed = parseInputString(input)
    const bits_per_number = parsed[0].length;
    const most_common_threshold = parsed.length / 2;
    let gamma_binary = '';

    for (let i = 0; i < bits_per_number; i++) {
        let count_of_zeros = parsed.filter((bit_field) => bit_field[i] == 0).length;
        gamma_binary += ( count_of_zeros > most_common_threshold ? '0' : '1');
    }
    let gamma = parseInt(gamma_binary, 2)

    let epsilon_binary = gamma_binary.replace(/[01]/g, (b) => b == '0' ? '1' : '0')
    let epsilon = parseInt(epsilon_binary, 2);

    return gamma * epsilon;
}

/**
 * 
 */
const partTwo = (input) => {
    const parsed = parseInputString(input)

    let oxygen_candidates = parsed;
    let bit = 0;
    while (oxygen_candidates.length != 1) {
        let count_of_zeros = oxygen_candidates.filter(bit_field => bit_field[bit] == 0).length;
        let value_to_keep = count_of_zeros > oxygen_candidates.length / 2 ? '0' : '1';
        oxygen_candidates = oxygen_candidates.filter( (candidate) => candidate[bit] == value_to_keep);
        bit++; 
    }
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
