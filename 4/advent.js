const fs = require("fs");
const request = require("request");
const moment = require("moment");

var get_puzzle_input = async day => {
    return new Promise((resolve, reject) => {
        let cookie_file = fs.readFileSync("../cookie.secret", "utf8");
        let cookie = request.cookie(`session=${cookie_file}`);
        let cookie_jar = request.jar();
        let url = `https://adventofcode.com/2018/day/${day}/input`
        cookie_jar.setCookie(cookie, url);
        request({url: url, jar: cookie_jar}, (error, response, body) => error ? reject(error) : resolve(body.split(/\n/g)));
    }).catch(error => console.error(error));
}

var minute_diff = (d1, d2) => moment(d1, "YYYY-MM-DD HH:mm").diff(moment(d2, "YYYY-MM-DD HH:mm"), "minutes");

var sort_events = events => {
    let split_events = {};
    let sorted_events = {};
    for (let event of events) {
        let split_event = event.split(" ");
        let datetime = split_event.slice(0, 2).join(" ").replace("]", "").replace("[", "");
        let event_occurred = split_event.slice(2).join(" ")
        split_events[datetime] = event_occurred;
    }
    Object.keys(split_events).sort().forEach(key => sorted_events[key] = split_events[key]);
    return sorted_events;
}

var get_laziest_guard = guards => {
    let laziest_guard_id = "";
    let laziest_guard_minutes = -1;
    for (let id in guards) {
        laziest_guard_id = guards[id].total_minutes > laziest_guard_minutes ? id : laziest_guard_id;
        laziest_guard_minutes = guards[id].total_minutes > laziest_guard_minutes ? guards[id].total_minutes : laziest_guard_minutes;
    }
    return laziest_guard_id;
}

var get_guard_favorite_minute = guard => {
    let max = -1;
    let key = "";
    for (let minute in guard.minutes) {
        if (guard.minutes[minute] > max) {
            max = guard.minutes[minute];
            key = minute;
        }
    } 
    return key;
}

var get_punctilious_guard = guards => {
    let highest_count_guard_id = "";
    let highest_count = -1;
    let highest_count_minute = -1;
    for (let id in guards) {
        let guard = guards[id];
        if (guard.favorite_minute.count > highest_count) {
            highest_count_guard_id = id;
            highest_count = guard.favorite_minute.count;
            highest_count_minute = guard.favorite_minute.minute;
        }
    }
    return highest_count_guard_id;
}

var get_guard_data = events => {
    let guards = {};
    let current_guard_id = "";
    let current_guard_sleep_datetime = "";
    sleeping = false;
    for (let datetime in events){
        let event = events[datetime];
        let current_minutes = moment(datetime, "YYYY-MM-DD HH:mm:ss").minutes();
        current_guard_id = event.endsWith("begins shift") ? event.replace("Guard #", "").replace(" begins shift", "") : current_guard_id;
        
        if (current_guard_id === "") continue;
        if (event === "falls asleep") {
            current_guard_sleep_datetime = datetime;
            sleeping = true;
        }
        if (event === "wakes up") {
            sleeping = false;
            if (!guards.hasOwnProperty(current_guard_id)) guards[current_guard_id] = {total_minutes: 0, minutes: {}};
            for (let m = moment(current_guard_sleep_datetime, "YYYY-MM-DD HH:mm").minutes(); m < current_minutes; m++) {
                if (!guards[current_guard_id].minutes.hasOwnProperty(m)) guards[current_guard_id].minutes[String(m)] = 1;
                else guards[current_guard_id].minutes[String(m)] ++
                guards[current_guard_id].total_minutes ++;
            }
        }
    }
    for (let id in guards) {
        let guard = guards[id];
        let favorite_minute = get_guard_favorite_minute(guard);
        guard["favorite_minute"] = {minute: favorite_minute, count: guard.minutes[favorite_minute]}
    }
    return guards;
}

(async () => {
    const input = await get_puzzle_input(4);
    let events = sort_events(input);
    let guards = get_guard_data(events)
    let laziest_guard_id = get_laziest_guard(guards);
    let laziest_guard_favorite_minute = get_guard_favorite_minute(guards[laziest_guard_id]);
    console.log(laziest_guard_id)
    console.log(guards[laziest_guard_id].favorite_minute.minute)

    let punctilious_guard_id = get_punctilious_guard(guards);
    console.log(punctilious_guard_id);
    console.log(guards[punctilious_guard_id].favorite_minute.minute)
    
})();