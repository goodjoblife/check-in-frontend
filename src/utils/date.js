
export function calcTime(ms) {
    let secs = Math.round(ms / 1000);
    let mins = Math.floor(secs / 60);
    secs = secs % 60;
    let hrs = Math.floor(mins / 60);
    mins = mins % 60;
    return { hrs, mins, secs };
}

/**
 * get time difference in { hrs, mins, secs } format
 * @param {Date} startTime starting time
 * @param {Date} endTime ending time
 */
export function calcTimeDiff(startTime, endTime) {
    return calcTime(startTime.getTime() - endTime.getTime());
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

/**
 * function to calculate local time in given UTC offset
 * reference: https://stackoverflow.com/questions/10087819/convert-date-to-another-timezone-in-javascript
 *
 * 用途：假如使用者系統設定不在時區 UTC+8，convertTimeZone(date, 8) 會轉換成 UTC+8 的時間，讓取得年月日的時候正確。
 */
export function convertTimeZone(date, offset) {
    // convert to msec
    // add local time zone offset
    // get UTC time in msec
    var utc = date.getTime() + (date.getTimezoneOffset() * 60000);

    // create new Date object for different city
    // using supplied offset
    var nd = new Date(utc + (3600000 * offset));

    return nd;
}
