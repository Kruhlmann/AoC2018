const fs = require("fs");
const request = require("request");

var get_top_n = (arr, prop, n) => {
    var clone = arr.slice(0); 
    clone.sort(function(x, y) {
        if (x[prop] == y[prop]) return 0;
        else if (parseInt(x[prop]) < parseInt(y[prop])) return 1;
        else return -1;
    });
    return clone.slice(0, n || 1);
}

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

var is_polymer_reacting = (polymer, active_combinations) => {
    for (let element of active_combinations) {
        if (polymer.indexOf(element) !== -1) return true;
    }
    return false;
}

var do_deep_reaction = (polymer, active_combinations) => {
    while(is_polymer_reacting(polymer, active_combinations)){
        for (let element of active_combinations) polymer = polymer.replace(element, "");
    }
    return polymer
}

var do_reaction = (polymer, active_combinations) => {
    for (let element of active_combinations) polymer = polymer.replace(element, "");
    return polymer;
}

var find_biggest_length_contributer = (polymer, active_combinations) => {
    let elements = {};
    for (let element of active_combinations){
        let clone = do_deep_reaction(polymer, make_polarity_indiscriminate_element(element));
        while(is_polymer_reacting(clone, active_combinations)){
            clone = do_reaction(clone, active_combinations);
        }
        let diff = polymer.length - clone.length;
        console.log(`Element ${element} has a diff of ${diff} and the final length was ${clone.length - diff}`)
        elements[element] = clone.length - diff;
    }
    return elements;
}

var make_polarity_indiscriminate_element = e => {
    let elements = [];
    elements.push(`${e[0].toUpperCase()}${e[1].toLowerCase()}`);
    elements.push(`${e[0].toLowerCase()}${e[1].toUpperCase()}`);
    elements.push(`${e[0].toLowerCase()}${e[1].toLowerCase()}`);
    elements.push(`${e[0].toUpperCase()}${e[1].toUpperCase()}`);
    return elements;
}


(async () => {
    let polymer = await get_puzzle_input(5);
    let polymerparts = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    let active_combinations = [];
    let no_polarity_combinations = [];

    polymer = polymer[0];
    polymerparts.forEach(e => {
        active_combinations.push(`${e}${e.toLowerCase()}`);
        active_combinations.push(`${e.toLowerCase()}${e}`);
    });
    
    while(is_polymer_reacting(polymer, active_combinations)){
        polymer = do_reaction(polymer, active_combinations);
    }
    console.log(polymer.length)

    console.log(find_biggest_length_contributer(polymer, active_combinations));

})();

