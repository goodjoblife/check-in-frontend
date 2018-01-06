
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import {
    formatDate,
    formatTime,
    formatDuration,
} from '../../utils/format';

import { newDate, calcTime } from '../../utils/date';

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
                checkIns: response.data,
            });
        });
    }

    renderMenuBar() {
        return (
            <div className="menu-bar">
                起始日：
                <input
                    type="date"
                    name="start-date"
                    value={this.state.startDate}
                    onChange={(event) => { this.setState({ startDate: event.target.value }) }}
                />
                結算日：
                <input
                    type="date"
                    name="end-date"
                    value={this.state.endDate}
                    onChange={(event) => { this.setState({ endDate: event.target.value }) }}
                />
                <button onClick={this.getCheckIns}>查詢</button>
            </div>
        )
    }

    renderCheckInTable(checkIns) {
        if (!checkIns) { return null; }
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th> 起始時間 </th>
                        <th> 結束時間 </th>
                        <th> 功德量 </th>
                    </tr>
                </thead>
                <tbody>
                    {checkIns.map((checkIn) => {
                        return this.renderCheckInRow(checkIn);
                    })}
                </tbody>
            </table>
        );
    }

    renderCheckInRow(checkIn) {
        const key = checkIn._id;
        const startTime = new Date(checkIn.startTime);
        const endTime = new Date(checkIn.endTime);
        return (
            <tr key={key}>
                <td>{formatDate(startTime)} {formatTime(startTime)}</td>
                <td>{formatDate(endTime)} {formatTime(endTime)}</td>
                <td>{formatDuration(calcTime(endTime - startTime))}</td>
            </tr>
        );
    }

    render() {
        return (
            <StyledCheckInList>
                <h1 className="title"> 查看我的功德 </h1>
                {this.renderMenuBar()}
                {this.renderCheckInTable(this.state.checkIns)}
            </StyledCheckInList>
        );
    }
}

export default CheckInList;