
/**
 *
 * @param {*} n number to be padded
 * @param {*} width total width of final string
 * @param {*} z padding sign
 */
export function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

export function formatDate(date, divider='/') {
    const yyyy = date.getFullYear();
    const mm = date.getMonth() + 1;
    const dd = date.getDate();
    return `${pad(yyyy, 4)}${divider}${pad(mm, 2)}${divider}${pad(dd, 2)}`;
}

export function formatTime(date) {
    const hh = date.getHours();
    const mm = date.getMinutes();
    return `${hh} 點 ${mm} 分`;
}

export function formatDuration(timeObj) {
    let str = "";
    const { hrs, mins } = timeObj;
    if (hrs === 0 && mins === 0) {
      return "不到一分鐘";
    }
    if (hrs > 0) {
      str = `${hrs}小時`;
    }
    if (mins > 0) {
      str = `${str} ${mins}分鐘`;
    }
    return str;
}
