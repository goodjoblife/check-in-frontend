
export function calcTime(ms) {
    let secs = Math.round(ms / 1000);
    let mins = Math.floor(secs / 60);
    secs = secs % 60;
    let hrs = Math.floor(mins / 60);
    mins = mins % 60;
    return { hrs, mins, secs };
}

// convert yyyy-MM-mm to { year, month, day }
export function parseDate(dateStr) {
    let arr = dateStr.split('-').map(v => parseInt(v, 10));
    return { year: arr[0], month: arr[1], day: arr[2] };
}

// convert yyyy-MM-mm to date object with local timezone
// e.g. "2018-01-01" => 2018-01-01 00:00:00 GMT+8 if your timezone is Taipei
//      the real UTC+0 time should be 2017-12-31 16:00:00
export function newDate(dateStr) {
    const { year, month, day } = parseDate(dateStr);
    return new Date(year, month - 1, day);
}
