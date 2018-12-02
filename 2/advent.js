/* https://adventofcode.com/2018/day/2 */
const fs = require("fs");

let find_unique_chars = str => {
    let unique = [];
    for (let item of str) if (unique.indexOf(item) === -1) unique.push(item)
    return unique;
}

let char_count = (haystack, needle) => {
    let c = 0;
    for (let item of haystack) if (item === needle) c ++;
    return c;
}

let find_related_candidate = candidates => {
    for (let candidate of candidates){
        for (let partner_candidate of candidates) {
            if (candidate === partner_candidate) continue;
            let discrepancy_indecies = [];
            let common_chars = [];
            for (let i in candidate) {
                if (candidate[i] !== partner_candidate[i]) discrepancy_indecies.push(i);
                else common_chars.push(candidate[i]);
            }
            if (discrepancy_indecies.length === 1) {
                let index = discrepancy_indecies[0];
                let result = common_chars.join(""); 
                return  `${candidate} -> ${partner_candidate} had a discrepancy ${candidate[discrepancy_indecies[0]]}/${partner_candidate[discrepancy_indecies[0]]} position ${discrepancy_indecies[0]}. Result is ${result}`;
            }
        }
    }
}

let dataset = fs.readFileSync("input.txt", "utf8");
let double_count = 0;
let triple_count = 0;
let final_box_candidates = [];
const box_ids = dataset.split(/\n/g);

for (let box_id of box_ids) {
    let box_id_chars = box_id.replace(/[\n\r]+/g, '').split("");
    let needles = find_unique_chars(box_id);
    let added_double = false;
    let added_triple = false;

    for(let needle of needles){
        if (needle === "" || needle === " " || needle === "\n" || needle === "\r") continue;
        if(char_count(box_id_chars, needle) === 2 && !added_double) {
            added_double = true;
            double_count ++;
            final_box_candidates.push(find_unique_chars(box_id_chars).join(""))
        }
        else if(char_count(box_id_chars, needle) === 3 && !added_triple) {
            added_triple = true;
            triple_count ++;
            final_box_candidates.push(find_unique_chars(box_id_chars).join(""))
        }
    }
}

// Part 1
console.log(`Found ${double_count} instances of two identical characters.`)
console.log(`Found ${triple_count} instances of three identical characters.`)
console.log(`Checksum: ${double_count * triple_count}`)

// Part 2
console.log(find_related_candidate(final_box_candidates))