import React, { Component } from 'react';

import StyledTotalWorkingTime from './TotalWorkingTime.style';
import WorkingHours from '../../components/WorkingHours.component';
import Rectangle from '../../components/Rectangle.component';

/* eslint-disable import/no-webpack-loader-syntax */
import docSVG from '-!svg-react-loader!../../assets/doc.svg';
/* eslint-enable import/no-webpack-loader-syntax */

class TotalWorkingTime extends Component {
  render() {
    return (
      <StyledTotalWorkingTime>
        <div className="main">
          <h1 className="title">
            全台灣勞工製造的功德數
          </h1>
          <div className="circle">
            <WorkingHours />
          </div>
          <div className="call-to-action">
            <Rectangle
              SVGIcon={docSVG}
              title='分享你的職場現況'
              content='讓台灣其他人知道，你的工時有多長？ 被雇主如何對待？'
              href='https://www.goodjob.life/share'
            />
          </div>
        </div>
      </StyledTotalWorkingTime>
    );
  }
}

export default TotalWorkingTime;
