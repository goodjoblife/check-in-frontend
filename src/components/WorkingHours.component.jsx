import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { pad } from '../utils/format';
import { MEDIA } from '../constants/style.constant';

const StyledWorkingHours = styled.div`
    padding: 65px 35px 60px 40px;
    text-align: center;

    @media (max-width: ${MEDIA.XS_MAX}px) {
      padding: 55px 35px 60px 40px;
    }
    .accuHrs-num {
        font-size: 42pt;
        margin-right: 5px;
        @media (max-width: ${MEDIA.XS_MAX}px) {
          font-size: 32pt;
        }
    }
    .accuMins-num, .accuSecs-num {
        font-size: 36pt;
        margin-right: 5px;
        @media (max-width: ${MEDIA.XS_MAX}px) {
          font-size: 32pt;
        }
    }
    .accuSecs-num {
        margin-left: 20px;
    }
    .flex {
        display: flex;
    }

`;

class WorkingHours extends React.Component {
  static propTypes = {
    accuHrs: PropTypes.number.isRequired,
    accuMins: PropTypes.number.isRequired,
    accuSecs: PropTypes.number.isRequired,
    nCurrentWorking: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props);
    this.state =  {
      accuHrs: 0,
      accuMins: 0,
      accuSecs: 0,
      accuMiliSecs: 0,
      nCurrentWorking: 0,
    }
  }

  componentWillReceiveProps(nextProps) {
    const { accuHrs, accuMins, accuSecs, nCurrentWorking } = nextProps;
    if (this.timer) {
      window.clearInterval(this.timer);
    }
    this.setState({
      accuHrs,
      accuMins,
      accuSecs,
      nCurrentWorking,
      accuMiliSecs: 0,
    });
  }

  componentDidMount(){
    this.setTimer(200);
  }

  componentDidUpdate() {
    this.setTimer(200);
  }

  setTimer(interval) {
    if (this.timer) {
      window.clearInterval(this.timer);
    }
    this.timer = setInterval(() => {
      const offsetMiliSecs = interval * this.state.nCurrentWorking;
      const { accuHrs, accuMins, accuSecs, accuMiliSecs } = this.state;
      const newTime = this.calcTime(accuHrs, accuMins, accuSecs, accuMiliSecs, offsetMiliSecs);
      this.setState(newTime);
    }, interval);
  }

  calcTime(accuHrs, accuMins, accuSecs, accuMiliSecs, offsetMiliSecs) {
    let newAccuMiliSecs = accuMiliSecs + offsetMiliSecs;
    let newAccuSecs = accuSecs + Math.floor(newAccuMiliSecs / 1000);
    newAccuMiliSecs = newAccuMiliSecs % 1000;
    let newAccuMins = accuMins + Math.floor(newAccuSecs / 60);
    newAccuSecs = newAccuSecs % 60;
    let newAccuHrs = accuHrs + Math.floor(newAccuMins / 60);
    newAccuMins = newAccuMins % 60;
    return { accuHrs: newAccuHrs, accuMins: newAccuMins, accuSecs: newAccuSecs, accuMiliSecs: newAccuMiliSecs };
  }

    render() {
        const { accuHrs, accuMins, accuSecs } = this.state;
        return (
            <StyledWorkingHours>
                <div>
                    <span className="accuHrs-num">{accuHrs}</span>
                    <span>時</span>
                </div>
                <div>
                    <span className="accuMins-num">{pad(accuMins, 2)}</span>
                    <span>分</span>
                    <span className="accuSecs-num">{pad(accuSecs, 2)}</span>
                    <span>秒</span>
                </div>
            </StyledWorkingHours>
        );
    }
}

export default WorkingHours;