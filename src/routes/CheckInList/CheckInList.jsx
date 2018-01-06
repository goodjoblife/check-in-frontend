
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Button from '../../components/Button.component';

import {
    formatDate,
    formatTime,
    formatDuration,
} from '../../utils/format';

import { newDate, calcTime } from '../../utils/date';
import { calcOverTimeSalary } from '../../utils/overTimeSalary';

import StyledCheckInList from './CheckInList.style';

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
        }
    }

    componentDidMount() {
        this.getCheckIns();
    }

    getCheckIns = () => {
        const key = this.props.params.key;
        const url = `https://test3.markchen.space/api/check-ins/${key}`;
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

    renderMenuBar() {
        return (
            <div className="menu-bar">
                <div className="date-container">
                    <div className="start-date date-picker">
                        <label>起始日：</label>
                        <input
                            type="date"
                            name="start-date"
                            value={this.state.startDate}
                            onChange={(event) => { this.setState({ startDate: event.target.value }) }}
                        />

                    </div>
                    <div className="end-date date-picker">
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
                <table className="table">
                    <thead>
                        <tr>
                            <th> 起始時間 </th>
                            <th> 結束時間 </th>
                            <th> 功德量 </th>
                            <th> 加班費 </th>
                        </tr>
                    </thead>
                    <tbody>
                        {checkIns.map((checkIn, index) => {
                            return this.renderCheckInRow(checkIn, index);
                        })}
                    </tbody>
                </table>
            </div>
        );
    }

    renderCheckInRow(checkIn, index) {
        const key = checkIn._id;
        const { startTime, endTime } = checkIn;
        return (
            <tr key={key}>
                <td>{formatDate(startTime)} {formatTime(startTime)}</td>
                <td>{formatDate(endTime)} {formatTime(endTime)}</td>
                <td>{formatDuration(calcTime(endTime.getTime() - startTime.getTime()))}</td>
                <td>{this.state.OTSalary ? this.state.OTSalary[index].OTSalary : 0}</td>
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
                <div className="flex flex-align-center">
                <label> 請輸入你的底薪以計算加班費：</label>
                {this.renderSalaryTypeButton('month', '月薪')}
                {this.renderSalaryTypeButton('day', '日薪')}
                {this.renderSalaryTypeButton('hour', '時薪')}
                <input
                    type="number"
                    min="0"
                    value={this.state.salary}
                    onChange={(e) => this.setState({ salary: e.target.value })}
                />
                <span className="money-unit">元</span>
                </div>
                <div>
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
            <div>
                <label className="form-group">請設定你的休息日、例假日：</label>
                <div className="flex flex-align-center">
                    <label>例假日：</label>
                    {dayNum.map((n, index) => (this.renderWeekDayButton('routine-day-off', n, dayChar[index], 'routineDayOff')))}
                </div>
                <div className="flex flex-align-center">
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
                    <div className="flex calc-container">
                        <Button className="btn btn-default" onClick={this.calcOverTimeSalary}>重新計算加班費</Button>
                    </div>
                </div>
            </StyledCheckInList>
        );
    }
}

export default CheckInList;