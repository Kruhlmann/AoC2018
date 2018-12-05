"use strict";
const fs = require("fs");
const request = require("request");

var get_puzzle_input = async day => {
    return new Promise((resolve, reject) => {
        let cookie_file = fs.readFileSync("../cookie.secret", "utf8");
        let cookie = request.cookie(`session=${cookie_file}`);
        let cookie_jar = request.jar();
        let url = `https://adventofcode.com/2018/day/${day}/input`;
        cookie_jar.setCookie(cookie, url);
        request({url: url, jar: cookie_jar}, (error, response, body) => error ? reject(error) : resolve(body.split(/\n/g)));
    }).catch(error => console.error(error));
}

class Task {
    constructor(mod) {
        this.part_1 = mod.part_1;
        this.part_2 = mod.part_2;
    }
}

(async () => {
    for (let i = 0; i < 3; i++){
        let task = new Task(require(`./${i + 1}/advent.js`))
        console.log(`============== December ${i > 0 ? "0" : ""}${i + 1} ==============`);
        console.log(`\tTask 1: ${task.part_1()}`);
        console.log(`\tTask 2: ${task.part_2()}`);
        console.log("=========================================\n");
    }
})();

module.exports = {
    get_puzzle_input: get_puzzle_input
}