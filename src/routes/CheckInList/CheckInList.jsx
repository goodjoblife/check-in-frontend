
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import {
    formatDate,
    formatTime,
    calcTime,
    formatDuration,
} from '../../utils/format';

import StyledCheckInList from './CheckInList.style';

class CheckInList extends React.Component {
    static propTypes = {
        params: PropTypes.oneOfType([PropTypes.object]).isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            checkIns: null,
        }
    }

    componentDidMount() {
        const key = this.props.params.key;
        const url = `https://test3.markchen.space/api/check-ins/${key}`;
        axios.get(url).then(response => {
            this.setState({
                checkIns: response.data,
            });
        });
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
                        <th> 詳細資訊 </th>
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
                <td>{formatDate(startTime)}<br />{formatTime(startTime)}</td>
                <td>{formatDate(endTime)}<br />{formatTime(endTime)}</td>
                <td>{formatDuration(calcTime(endTime - startTime))}</td>
                <td><button> 詳細資訊 </button></td>
            </tr>
        );
    }

    render() {
        return (
            <StyledCheckInList>
                <h2> 查看我的功德 </h2>
                {this.renderCheckInTable(this.state.checkIns)}
            </StyledCheckInList>
        );
    }
}

export default CheckInList;