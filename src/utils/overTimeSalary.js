/**
 *
 * @param {*} checkIns
 * @param {*} restDayOff
 * @param {*} routineDayOff
 * @param {*} salaryType
 * @param {*} hourlyWage
 */
export function calcOverTimeSalary(checkIns, restDayOff, routineDayOff, salaryType, hourlyWage) {
    const minPeriod = 0.5; // 最小時間單位（小時）
    const restHour = 1; // 上班中間的休息時間。例如：午休。（小時）
    const r1 = workDayOTSalary(checkIns, restDayOff, routineDayOff, salaryType, hourlyWage, minPeriod, restHour);
    const r2 = restDayOTSalary(checkIns, restDayOff, routineDayOff, salaryType, hourlyWage, minPeriod, restHour);
    const r3 = routineDayOTSalary(checkIns, restDayOff, routineDayOff, salaryType, hourlyWage, minPeriod, restHour);
    const final = [];
    for (let i = 0; i < r1.length; i += 1) {
        final.push({ OTSalary: r1[i].OTSalary + r2[i].OTSalary + r3[i].OTSalary });
    }
    return final;
}

/**
 * Rule 24-1: 平日加班費
 * 雇主延長勞工工作時間者，其延長工作時間之工資依下列標準加給：
 *  一、延長工作時間在二小時以內者，按平日每小時工資額加給三分之一以上。
 *  二、再延長工作時間在二小時以內者，按平日每小時工資額加給三分之二以上。
 *  三、依第三十二條第三項規定，延長工作時間者，按平日每小時工資額加倍發給。
 */
export function workDayOTSalary(checkIns, restDayOff, routineDayOff, salaryType, hourlyWage, minPeriod, restHour) {
    const result = checkIns.map(() => ({
        OTSalary: 0,
    }));
    checkIns.forEach((checkIn, index) => {
        const { startTime, endTime } = checkIn;
        if (startTime && endTime) {
            // TODO: 待確認：假如工作跨日，工時要算在哪一日？ （牽涉到休息日、例假日）
            // 目前以起始時間的日期為準
            const day = startTime.getDay();
            // 假如是休息日或例假日，跳過掉這個 24-1 平日加班費的計算
            if (day === restDayOff || day === routineDayOff) { return; }

            // 開始計算加班費
            const hrs = calcTimeDiffInHours(endTime, startTime, minPeriod, restHour);
            if (hrs === 0) { return; }

            let OTSalary = 0;
            if (hrs > 8 && hrs <=10) {
                OTSalary += (hrs - 8) * hourlyWage * (4 / 3);
            } else if (hrs > 10) {
                OTSalary += 2 * hourlyWage * (4 / 3);
                OTSalary += (hrs - 10) * hourlyWage * (5 / 3);
            }
            result[index].OTSalary = Math.round(OTSalary);
        }
    });
    return result;
}

/**
 * Rule 24-2: 休息日加班費
 * 雇主使勞工於第三十六條所定休息日工作，工作時間在二小時以內者，其工資按平日每
 * 小時工資額另再加給一又三分之一以上；工作二小時後再繼續工作者，按平日每小時工
 * 資額另再加給一又三分之二以上。前項休息日之工作時間及工資之計算，四小時以內者，
 * 以四小時計；逾四小時至八小時以內者，以八小時計；逾八小時至十二小時以內者，以
 * 十二小時計。
 */
export function restDayOTSalary(checkIns, restDayOff, routineDayOff, salaryType, hourlyWage, minPeriod, restHour) {
    const result = checkIns.map(() => ({
        OTSalary: 0,
    }));
    checkIns.forEach((checkIn, index) => {
        const { startTime, endTime } = checkIn;
        if (startTime && endTime) {
            // TODO: 待確認：假如工作跨日，工時要算在哪一日？ （牽涉到休息日、例假日）
            // 目前以起始時間的日期為準
            const day = startTime.getDay();
            // 假如不是休息日，跳過 24-2 條的加班費計算
            if (day !== restDayOff) { return; }

            // 開始計算加班費
            let hrs = calcTimeDiffInHours(endTime, startTime, minPeriod);
            if (hrs === 0) { return; }
            hrs = hrs > 0 && hrs <=4 ? 4 : hrs;
            hrs = hrs > 4 && hrs <=8 ? 8 : hrs;
            hrs = hrs > 8 && hrs <=12 ? 12 : hrs;

            let OTSalary = 0;
            // 前兩小時加班費
            OTSalary += 2 * hourlyWage * (4 / 3);

            // 第二小時起加班費
            OTSalary += (hrs - 2) * hourlyWage * (5 / 3);

            // 第九小時起要多給本薪
            OTSalary += hrs > 8 ? ((hrs - 8) * hourlyWage) : 0;

            result[index].OTSalary = Math.round(OTSalary);
        }
    });
    return result;
}


/**
 * Rule : 例假日加班費
 */
export function routineDayOTSalary(checkIns, restDayOff, routineDayOff, salaryType, hourlyWage, minPeriod, restHour) {
    const result = checkIns.map(() => ({
        OTSalary: 0,
    }));
    checkIns.forEach((checkIn, index) => {
        const { startTime, endTime } = checkIn;
        if (startTime && endTime) {
            // TODO: 待確認：假如工作跨日，工時要算在哪一日？ （牽涉到休息日、例假日）
            // 目前以起始時間的日期為準
            const day = startTime.getDay();
            // 假如不是例假日，跳過例假日加班費計算
            if (day !== routineDayOff) { return; }

            // 開始計算加班費
            let hrs = calcTimeDiffInHours(endTime, startTime, minPeriod);
            if (hrs === 0) { return; }

            let OTSalary = 0;
            // 只要有出勤，就要給八小時工資
            OTSalary += hrs > 0 ? (8 * hourlyWage) : 0;

            // TODO: 待確認：例假日工作超過八小時怎麼算？
            // 目前參考勞動部勞基法計算機，超過八小時的部分，要加給本薪
            OTSalary += hrs > 8 ? ((hrs - 8) * hourlyWage * 2) : 0;

            result[index].OTSalary = Math.round(OTSalary);
        }
    });
    return result;
}

/**
 * get time difference in hours
 * @param {Date} startTime starting time
 * @param {Date} endTime ending time
 * @return {Number} time difference in hours (floating number)
 */
export function calcTimeDiffInHours(startTime, endTime, minPeriod = 1, restHour = 1) {
    const ms = startTime.getTime() - endTime.getTime();
    let hrs = ms / 3600000;  // 60 mins * 60 secs * 1000 mini-seconds
    if (minPeriod > 0) {
        hrs = Math.floor(hrs / minPeriod) * minPeriod;
    }
    hrs = (hrs - restHour > 0) ? hrs - restHour : 0;
    return hrs;
}
