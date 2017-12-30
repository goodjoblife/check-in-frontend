import React from 'react';
import styled from 'styled-components';
import { pad } from '../utils/format';

const StyledWorkingHours = styled.div`
    padding: 65px 35px 60px 40px;
    text-align: center;
    .hrs-num {
        font-size: 42pt;
        margin-right: 5px;
    }
    .mins-num, .secs-num {
        font-size: 36pt;
        margin-right: 5px;
    }
    .secs-num {
        margin-left: 20px;
    }
    .flex {
        display: flex;
    }

`;

class WorkingHours extends React.Component {
    constructor(props) {
        super(props);
        this.state =  {
            hrs: 0,
            mins: 0,
            secs: 0,
            miniSecs: 0,
            nCurrentWorking: 37,
        }
    }

    componentDidMount(){
        this.timer = this.setTimer(100);
    }

    setTimer(interval) {
        return setInterval(() => {
            const offsetMiniSecs = interval * this.state.nCurrentWorking;
            const { hrs, mins, secs, miniSecs } = this.state;
            const newTime = this.calcTime(hrs, mins, secs, miniSecs, offsetMiniSecs);
            this.setState(newTime);
        }, interval)
    }

    calcTime(hrs, mins, secs, miniSecs, offsetMiniSecs) {
        miniSecs = miniSecs + offsetMiniSecs;
        secs = secs + Math.floor(miniSecs / 1000);
        miniSecs = miniSecs % 1000;
        mins = mins + Math.floor(secs / 60);
        secs = secs % 60;
        hrs = hrs + Math.floor(mins / 60);
        mins = mins % 60;
        return { hrs, mins, secs, miniSecs };
    }

    render() {
        const { hrs, mins, secs } = this.state;
        return (
            <StyledWorkingHours>
                <div>
                    <span className="hrs-num">{hrs}</span>
                    <span>時</span>
                </div>
                <div>
                    <span className="mins-num">{pad(mins, 2)}</span>
                    <span>分</span>
                    <span className="secs-num">{pad(secs, 2)}</span>
                    <span>秒</span>
                </div>
            </StyledWorkingHours>
        );
    }
}

export default WorkingHours;