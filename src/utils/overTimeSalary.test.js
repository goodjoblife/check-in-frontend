
import assert from 'assert';

import {
    calcOverTimeSalary,
    workDayOTSalary,
    restDayOTSalary,
    routineDayOTSalary,
} from './overTimeSalary';

describe('加班費計算', function() {
    describe('平日加班費計算', function() {
        it('平日未加班，沒有平日加班費', function() {
            const checkIns = genTestCheckIns();
            const p = getTestParams();
            const result = workDayOTSalary(checkIns, p.restDayOff, p.routineDayOff, p.salaryType, p.hourlyWage, p.minPeriod, p.restHour);
            result.forEach(r => {
                assert.equal(r.OTSalary, 0);
            });
        });

        it('前兩小時 1.33 倍 (單一天）', function() {
            const checkIns = genTestCheckIns();
            const p = getTestParams();
            for(let i = 1; i <=2 ; i += 1) {
                checkIns[0].endTime = new Date(2018, 0, 1, 17 + i, 0, 0);
                const result = workDayOTSalary(checkIns, p.restDayOff, p.routineDayOff, p.salaryType, p.hourlyWage, p.minPeriod, p.restHour);
                result.forEach((r, index) => {
                    if (index === 0) {
                        assert.equal(r.OTSalary, Math.round(p.hourlyWage * (4 / 3) * i));
                    } else {
                        assert.equal(r.OTSalary, 0);
                    }
                });
            }
        });

        it('前兩小時 1.33 倍 (多天）', function() {
            const checkIns = genTestCheckIns();
            const p = getTestParams();
            for(let i = 1; i <=2 ; i += 1) {
                checkIns[0].endTime = new Date(2018, 0, 1, 17 + i, 0, 0);
                checkIns[2].endTime = new Date(2018, 0, 3, 17 + i, 0, 0);
                checkIns[4].endTime = new Date(2018, 0, 5, 17 + i, 0, 0);
                const result = workDayOTSalary(checkIns, p.restDayOff, p.routineDayOff, p.salaryType, p.hourlyWage, p.minPeriod, p.restHour);
                result.forEach((r, index) => {
                    if ([0, 2, 4].indexOf(index) >= 0) {
                        assert.equal(r.OTSalary, Math.round(p.hourlyWage * (4 / 3) * i));
                    } else {
                        assert.equal(r.OTSalary, 0);
                    }
                });
            }
        });

        it('第三小時後 1.66 倍 (單一天）', function() {
            const checkIns = genTestCheckIns();
            const p = getTestParams();
            for(let i = 1; i <=4 ; i += 1) {
                checkIns[0].endTime = new Date(2018, 0, 1, 17 + 2 + i, 0, 0);
                const result = workDayOTSalary(checkIns, p.restDayOff, p.routineDayOff, p.salaryType, p.hourlyWage, p.minPeriod, p.restHour);
                result.forEach((r, index) => {
                    if (index === 0) {
                        assert.equal(
                            r.OTSalary,
                            Math.round(p.hourlyWage * (4 / 3) * 2 + p.hourlyWage * (5 / 3) * i),
                        );
                    } else {
                        assert.equal(r.OTSalary, 0);
                    }
                });
            }
        });

        it('第三小時後 1.66 倍 (多天）', function() {
            const checkIns = genTestCheckIns();
            const p = getTestParams();
            for(let i = 1; i <=4 ; i += 1) {
                checkIns[0].endTime = new Date(2018, 0, 1, 17 + 2 + i, 0, 0);
                checkIns[2].endTime = new Date(2018, 0, 3, 17 + 2 + i, 0, 0);
                checkIns[4].endTime = new Date(2018, 0, 5, 17 + 2 + i, 0, 0);
                const result = workDayOTSalary(checkIns, p.restDayOff, p.routineDayOff, p.salaryType, p.hourlyWage, p.minPeriod, p.restHour);
                result.forEach((r, index) => {
                    if ([0, 2, 4].indexOf(index) >= 0) {
                        assert.equal(
                            r.OTSalary,
                            Math.round(p.hourlyWage * (4 / 3) * 2 + p.hourlyWage * (5 / 3) * i),
                        );
                    } else {
                        assert.equal(r.OTSalary, 0);
                    }
                });
            }
        });
    });
    describe('休息日加班費計算', function() {
        it('未出勤，沒有休息日加班費', function() {
            const checkIns = genTestCheckIns();
            const p = getTestParams();
            const result = restDayOTSalary(checkIns, p.restDayOff, p.routineDayOff, p.salaryType, p.hourlyWage, p.minPeriod, p.restHour);
            result.forEach(r => {
                assert.equal(r.OTSalary, 0);
            });
            assert(result.length, 5);
        });
        it('出勤小於四小時', function() {
            const checkIns = genTestCheckIns();
            const p = getTestParams();
            for(let i = 1; i <= 4; i += 1) {
                checkIns.push({
                    startTime: new Date(2018, 0, 6, 8, 0, 0),  // 2018-01-06 08:00:00 Mon.
                    endTime: new Date(2018, 0, 6, 8 + 1 + i, 0, 0), // 2018-01-06
                })
                const result = restDayOTSalary(checkIns, p.restDayOff, p.routineDayOff, p.salaryType, p.hourlyWage, p.minPeriod, p.restHour);
                assert(result[5].OTSalary, Math.round(2 * p.hourlyWage * (4 / 3) + 2 * p.hourlyWage * (5 / 3)));
            }
        });
        it('出勤四到八小時', function() {
            const checkIns = genTestCheckIns();
            const p = getTestParams();
            for(let i = 1; i <= 4; i += 1) {
                checkIns.push({
                    startTime: new Date(2018, 0, 6, 8, 0, 0),  // 2018-01-06 08:00:00 Mon.
                    endTime: new Date(2018, 0, 6, 8 + 1 + 4 + i, 0, 0), // 2018-01-06
                })
                const result = restDayOTSalary(checkIns, p.restDayOff, p.routineDayOff, p.salaryType, p.hourlyWage, p.minPeriod, p.restHour);
                assert(result[5].OTSalary, Math.round(2 * p.hourlyWage * (4 / 3) + 6 * p.hourlyWage * (5 / 3)));
            }
        });
        it('出勤八小時以上', function() {
            const checkIns = genTestCheckIns();
            const p = getTestParams();
            for(let i = 1; i <= 4; i += 1) {
                checkIns.push({
                    startTime: new Date(2018, 0, 6, 8, 0, 0),  // 2018-01-06 08:00:00 Mon.
                    endTime: new Date(2018, 0, 6, 8 + 1 + 8 + i, 0, 0), // 2018-01-06
                })
                const result = restDayOTSalary(checkIns, p.restDayOff, p.routineDayOff, p.salaryType, p.hourlyWage, p.minPeriod, p.restHour);
                assert(result[5].OTSalary, Math.round(
                    2 * p.hourlyWage * (4 / 3) + 6 * p.hourlyWage * (5 / 3) + i * p.hourlyWage * (8 / 3)
                ));
            }
        });
    });
    describe('例假日加班費計算', function() {
        it('未出勤，無加班費', function() {
            const checkIns = genTestCheckIns();
            const p = getTestParams();
            const result = routineDayOTSalary(checkIns, p.restDayOff, p.routineDayOff, p.salaryType, p.hourlyWage, p.minPeriod, p.restHour);
            result.forEach(r => {
                assert.equal(r.OTSalary, 0);
            });
            assert(result.length, 5);
        });
        it('有出勤，八小時內', function() {
            const checkIns = genTestCheckIns();
            const p = getTestParams();
            for(let i = 1; i <= 8; i += 1) {
                checkIns.push({
                    startTime: new Date(2018, 0, 7, 8, 0, 0),  // 2018-01-07 08:00:00 Mon.
                    endTime: new Date(2018, 0, 7, 8 + 1 + i, 0, 0), // 2018-01-07
                })
                const result = routineDayOTSalary(checkIns, p.restDayOff, p.routineDayOff, p.salaryType, p.hourlyWage, p.minPeriod, p.restHour);
                assert(result[5].OTSalary, Math.round(8 * p.hourlyWage));
            }
        });
        it('有出勤，大於八小時', function() {
            const checkIns = genTestCheckIns();
            const p = getTestParams();
            for(let i = 1; i <= 4; i += 1) {
                checkIns.push({
                    startTime: new Date(2018, 0, 7, 8, 0, 0),  // 2018-01-07 08:00:00 Mon.
                    endTime: new Date(2018, 0, 7, 8 + 1 + 8 + i, 0, 0), // 2018-01-07
                })
                const result = routineDayOTSalary(checkIns, p.restDayOff, p.routineDayOff, p.salaryType, p.hourlyWage, p.minPeriod, p.restHour);
                assert(result[5].OTSalary, Math.round(8 * p.hourlyWage + i * p.hourlyWage * 2));
            }
        });
    });
});

function genTestCheckIns() {
    return [
        {
            startTime: new Date(2018, 0, 1, 8, 0, 0),  // 2018-01-01 08:00:00 Mon.
            endTime: new Date(2018, 0, 1, 17, 0, 0), // 2018-01-01 17:00:00 Mon.
        }, {
            startTime: new Date(2018, 0, 2, 8, 0, 0),  // 2018-01-02 08:00:00 Tue.
            endTime: new Date(2018, 0, 2, 17, 0, 0), // 2018-01-02 19:00:00 Tue.
        }, {
            startTime: new Date(2018, 0, 3, 8, 0, 0),  // 2018-01-03 08:00:00 Wed.
            endTime: new Date(2018, 0, 3, 17, 0, 0), // 2018-01-03 21:00:00 Wed.
        }, {
            startTime: new Date(2018, 0, 4, 8, 0, 0),  // 2018-01-04 08:00:00 Thur.
            endTime: new Date(2018, 0, 4, 17, 0, 0), // 2018-01-04 23:00:00 Thur.
        }, {
            startTime: new Date(2018, 0, 5, 8, 0, 0),  // 2018-01-05 08:00:00 Fri.
            endTime: new Date(2018, 0, 5, 17, 0, 0), // 2018-01-05 21:00:00 Fri.
        },
    ]
}

function getTestParams() {
    return {
        restDayOff: 6,
        routineDayOff: 0,
        salaryType: 'month',
        hourlyWage: 100,
        minPeriod: 1,
        restHour: 1,
    };
}