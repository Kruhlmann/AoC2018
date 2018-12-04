const fs = require("fs");

let dataset = fs.readFileSync("1/input.txt", "utf8");

get_frequency_total = dataset => {
    let final_frequency = 0;
    const deltas = dataset.split(/\n/g);
    deltas.forEach(delta => final_frequency += parseInt(delta))
    return final_frequency;
}

get_first_dupplicate = input => {
    const deltas = input.split(/\n/g);
    const seen = {};
    let frequency = 0;

    while (true) {
        for (const delta of deltas) {
            frequency += Number(delta);
            if (seen[frequency]) return frequency;
            seen[frequency] = true;
        }
    }
}

module.exports = {
    part_1: () => get_frequency_total(dataset),
    part_2: () => get_first_dupplicate(dataset)
}