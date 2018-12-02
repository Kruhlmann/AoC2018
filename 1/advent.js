const fs = require("fs");
const frequency_dataset = JSON.parse(fs.readFileSync('data.json', 'utf8'));

let dataset = fs.readFileSync("input.txt", "utf8");

get_frequency_total = (dataset) => {
    const deltas = input.split(/\n/g);
    deltas.forEach(delta => final_frequency += parseInt(frequency_delta))
    return final_frequency;
}

get_first_dupplicate = (input) => {
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
};

//let res1 = get_frequency_total(dataset);
let res2 = get_first_dupplicate(dataset);

console.log("=== Results ===")
//console.log(`1: ${res1}`);
console.log(`2: ${res2}`);