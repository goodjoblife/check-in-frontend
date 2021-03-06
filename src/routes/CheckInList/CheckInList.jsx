
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import update from 'immutability-helper';
import { Element as ScrollElement, scroller } from 'react-scroll';

import StyledTable from '../../styles/table.style';
import Button from '../../components/Button.component';

import {
    formatDate,
    formatTime,
    formatDuration,
} from '../../utils/format';

import { newDate, calcTime } from '../../utils/date';
import { calcOverTimeSalary } from '../../utils/overTimeSalary';

import StyledCheckInList from './CheckInList.style';

import { apiEndpoint } from '../../constants/config.constant';

class CheckInList extends React.Component {
    static propTypes = {
        params: PropTypes.oneOfType([PropTypes.object]).isRequired,
    }

    constructor(props) {
        super(props);
        const now = new Date();
        // get first date of month
        const start = new Date(now.getFullYear(), now.getMonth(), 1);
        // format to yyyy-MM-dd string for date input
        const startDate = formatDate(start, '-');
        const endDate = formatDate(now, '-');
        this.state = {
            checkIns: null,
            startDate,
            endDate,
            salary: 22000,
            salaryType: 'month',
            routineDayOff: '0', // Sunday
            restDayOff: '6', // Saturday
            OTSalary: null,
            reCalculated: false,
        }
    }

    componentDidMount() {
        this.getCheckIns();
    }

    getCheckIns = () => {
        const key = this.props.params.key;
        const url = `${apiEndpoint}/api/users/${key}/check-ins`;
        // Notice, do not use new Date("yyyy-MM-dd"), different browser has different behavior.
        const startDate = newDate(this.state.startDate);
        const endDate = new Date(newDate(this.state.endDate).getTime() + 86400000);

        axios.get(url, {
            params: {
                startDate,
                endDate,
            }
        }).then(response => {
            this.setState({
                checkIns: response.data.map((checkIn) => ({
                    ...checkIn,
                    startTime: new Date(checkIn.startTime),
                    endTime: new Date(checkIn.endTime),
                })),
            });
            this.calcOverTimeSalary();
        });
    }

    handleSalaryButton = (event) => {
        this.setState({
            salaryType: event.target.value,
        });
    }

    handleWeekDayButton = (field) => (event) => {
        if (
            (field === 'routineDayOff' && this.state.restDayOff === event.target.value) ||
            (field === 'restDayOff' && this.state.routineDayOff === event.target.value)
        ) {
            return;
        }
        this.setState({ [field]: event.target.value });
    }

    calcHourlyWage = () => {
        const salary = this.state.salary ? parseInt(this.state.salary, 10) : 0;
        switch (this.state.salaryType) {
            case 'month':
                return Math.round(salary / 240);
            case 'day':
                return Math.round(salary / 8);
            case 'hour':
                return Math.round(salary);
            default:
                return 0;
        }
    }

    calcOverTimeSalary = () => {
        // prepare data
        const restDayOff = parseInt(this.state.restDayOff, 10);
        const routineDayOff = parseInt(this.state.routineDayOff, 10);
        const hourlyWage = this.calcHourlyWage();
        const overTimeSalary = calcOverTimeSalary(this.state.checkIns, restDayOff, routineDayOff, this.state.salaryType, hourlyWage);
        this.setState({ OTSalary: overTimeSalary });
    }

    calcTotalOTSalary = () => {
        if (!this.state.OTSalary) { return 0; }
        else {
            return this.state.OTSalary.reduce((accu, curr) => (accu + curr.OTSalary), 0);
        }
    }

    deleteCheckIn = (checkInId) => () => {
        if (window.confirm("你確定要刪除這筆功德嗎？")) {
            const key = this.props.params.key;
            const url = `${apiEndpoint}/api/users/${key}/check-ins/${checkInId}`;
            axios.delete(url).then(response => {
                if (response.data.success) {
                    window.alert("你的功德已經煙消雲散！");
                    const index = this.state.checkIns.findIndex((checkin) => ( checkin._id === checkInId ));
                    if (index >= 0) {
                        const newCheckIns = update(this.state.checkIns, {
                            $splice: [[index, 1]],
                        });
                        this.setState({ checkIns: newCheckIns });
                    }
                } else {
                    window.alert("你的功德捨不得離開你，刪不掉呀");
                }
            });
        }
    }

    renderMenuBar() {
        return (
            <div className="menu-bar">
                <div className="date-container">
                    <div className="date-picker">
                        <label>起始日：</label>
                        <input
                            type="date"
                            name="start-date"
                            value={this.state.startDate}
                            onChange={(event) => { this.setState({ startDate: event.target.value }) }}
                        />

                    </div>
                    <div className="date-picker">
                        <label>結算日：</label>
                        <input
                            type="date"
                            name="end-date"
                            value={this.state.endDate}
                            onChange={(event) => { this.setState({ endDate: event.target.value }) }}
                        />
                    </div>
                </div>
                <Button className="search-btn" onClick={this.getCheckIns}>查詢</Button>
            </div>
        )
    }

    renderCheckInTable(checkIns) {
        if (!checkIns) { return null; }
        return (
            <div className="section">
                <StyledTable className="table">
                    <thead>
                        <tr>
                            <th> 起始時間 </th>
                            <th> 結束時間 </th>
                            <th> 功德量 </th>
                            <th> 加班費 </th>
                            <th> 操作 </th>
                        </tr>
                    </thead>
                    <tbody>
                        {checkIns.map((checkIn, index) => {
                            return this.renderCheckInRow(checkIn, index);
                        })}
                        <tr className="ot-salary-total">
                            <td colSpan="3">加班費總計</td>
                            <td data-th="加班費總計">
                                <ScrollElement name="ot-salary-total"></ScrollElement>
                                {this.calcTotalOTSalary()}
                                <span className={`ot-salary-hint ${this.state.reCalculated  ? 're-calculate': ''}`}>&nbsp;已重新計算</span>
                            </td>
                            <td />
                        </tr>
                    </tbody>
                </StyledTable>
            </div>
        );
    }

    renderCheckInRow(checkIn, index) {
        const key = checkIn._id;
        const { startTime, endTime } = checkIn;
        return (
            <tr key={key}>
                <td data-th="起始時間">{formatDate(startTime)} {formatTime(startTime)}</td>
                <td data-th="結束時間">{formatDate(endTime)} {formatTime(endTime)}</td>
                <td data-th="功德量">{formatDuration(calcTime(endTime.getTime() - startTime.getTime()))}</td>
                <td data-th="加班費">{this.state.OTSalary ? this.state.OTSalary[index].OTSalary : 0}</td>
                <td data-th="操作"><Button className="button" onClick={this.deleteCheckIn(key)}>刪除</Button></td>
            </tr>
        );
    }

    renderSalaryTypeButton(value, text) {
        return (
            <div className={`radio-button ${this.state.salaryType === value ? 'checked' : ''}`}>
                <label htmlFor={`salary-type-${value}`}> {text} </label>
                <input
                    id={`salary-type-${value}`}
                    className="btn btn-default salary-btn"
                    name="salary-type"
                    type="radio"
                    value={value}
                    checked={this.state.salaryType === value}
                    onChange={this.handleSalaryButton}
                >
                </input>
            </div>
        );
    }

    renderSalarySection() {
        return (
            <div className="salary-section form-group flex flex-align-center flex-space-between">
                <div className="salary-input-group">
                    <label> 請輸入你的底薪以計算加班費：</label>
                    {this.renderSalaryTypeButton('month', '月薪')}
                    {this.renderSalaryTypeButton('day', '日薪')}
                    {this.renderSalaryTypeButton('hour', '時薪')}
                    <div className="salary-input">
                        <input
                            type="number"
                            min="0"
                            value={this.state.salary}
                            onChange={(e) => this.setState({ salary: e.target.value })}
                        />
                        <span className="money-unit">元</span>
                    </div>
                </div>
                <div className="hourly-wage">
                    <label>每小時工資：</label><span>{this.calcHourlyWage()}</span>
                </div>
            </div>
        )
    }

    renderWeekDayButton(name, value, text, field) {
        return (
            <div
                key={`${name}${value}`}
                className={`radio-button ${this.state[field] === value ? 'checked' : ''}`}
            >
                <label htmlFor={`${name}${value}`}> {text} </label>
                <input
                    id={`${name}${value}`}
                    className="btn btn-default"
                    name={name}
                    type="radio"
                    value={value}
                    checked={this.state[field] === value}
                    onChange={this.handleWeekDayButton(field)}
                >
                </input>
            </div>
        );
    }

    renderDayOffSection() {
        const dayChar = ['一', '二', '三', '四', '五', '六', '日'];
        const dayNum = ['1', '2', '3', '4', '5', '6', '0'];
        return (
            <div className="day-off-section">
                <label className="form-group">請設定你的休息日、例假日：</label>
                <div className="day-off-group">
                    <label>例假日：</label>
                    {dayNum.map((n, index) => (this.renderWeekDayButton('routine-day-off', n, dayChar[index], 'routineDayOff')))}
                </div>
                <div className="day-off-group">
                    <label>休息日：</label>
                    {dayNum.map((n, index) => (this.renderWeekDayButton('rest-day-off', n, dayChar[index], 'restDayOff')))}
                </div>
            </div>
        );
    }

    render() {
        return (
            <StyledCheckInList>
                <h1 className="title"> 查看我的功德 </h1>
                {this.renderMenuBar()}
                {this.renderCheckInTable(this.state.checkIns)}

                <h4>加班費試算設定</h4>
                <div className="setting-section section">
                    {this.renderSalarySection()}
                    {this.renderDayOffSection()}
                    <div className="calc-container">
                        <Button className="btn btn-default" onClick={
                            (event) => {
                                this.calcOverTimeSalary();
                                this.setState({ reCalculated: true });
                                scroller.scrollTo('ot-salary-total', {
                                    duration: 1500,
                                    delay: 100,
                                    smooth: true,
                                    offset: -500, // Scrolls to element + 50 pixels down the page
                                });
                            }
                        }>
                            重新計算加班費
                        </Button>
                    </div>
                </div>
            </StyledCheckInList>
        );
    }
}

export default CheckInList;