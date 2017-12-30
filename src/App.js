import React, { Component } from 'react';

import StyledMain from './App.style';
import WorkingHours from './components/WorkingHours.component';
import Rectangle from './components/Rectangle.component';
import Header from './components/Header.component';
import Footer from './components/Footer.component';

/* eslint-disable import/no-webpack-loader-syntax */
import docSVG from '-!svg-react-loader!./assets/doc.svg';
/* eslint-enable import/no-webpack-loader-syntax */

class App extends Component {
  render() {
    return (
      <StyledMain>
        <Header />
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
        <Footer />
      </StyledMain>
    );
  }
}

export default App;
