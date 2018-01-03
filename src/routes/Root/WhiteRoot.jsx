import React from 'react';

import StyledRoot from './Root.style';
import Header from '../../components/Header.component';
import Footer from '../../components/Footer.component';

const Root = ({ children }) => (
    <StyledRoot theme="white">
        <div className="body-container">
            <Header />
            <div className="content-container">
                {children}
            </div>
            <Footer />
        </div>
    </StyledRoot>
);

export default Root;
