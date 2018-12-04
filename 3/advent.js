/* https://adventofcode.com/2018/day/3 */
const fs = require("fs");

let dataset = fs.readFileSync("3/input.txt", "utf8");
const sections = dataset.split(/\n/g);

let fabric = [];
for (let x = 0; x < 1000; x++){
    fabric[x] = [];
    for (let y = 0; y < 1000; y++) fabric[x][y] = 0;
}

let rectagles = [];
for (let rectangle of sections) {
    let id = rectangle.slice((rectangle.indexOf('#')),(rectangle.indexOf('@') - 1));
    let left = Number(rectangle.slice((rectangle.indexOf('@') + 2), rectangle.indexOf(',')));
    let top = Number(rectangle.slice((rectangle.indexOf(',') + 1), rectangle.indexOf(':')));
    let width = Number(rectangle.slice((rectangle.indexOf(':') + 2), rectangle.indexOf('x')));
    let height = Number(rectangle.slice((rectangle.indexOf('x') + 1), rectangle.length));
    let tiles = [];
    for(let y = top; y < top + height; y++){
        for(var x = left; x< left + width; x++){
            fabric[x][y] ++;
            tiles.push({x: x, y: y});
        }
    }
    rectagles[id] = tiles;
}

let claims = 0;
for (let x in fabric) {
    for (let y in fabric[x]) {
        if (fabric[x][y] > 1) claims++; 
    }
}

var find_non_overlapping_rect = rectangles => {
    for (let id in rectagles) {
        let rectangle = rectagles[id];
        let no_found = false;
        for (let coordinate of rectangle){
            if (fabric[coordinate.x][coordinate.y] > 1) no_found = true;
        }
        if(!no_found) return id;
    }
}

module.exports = {
    part_1: () => claims,
    part_2: () => find_non_overlapping_rect(rectagles),

}