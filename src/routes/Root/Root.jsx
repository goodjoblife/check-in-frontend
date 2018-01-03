import React from 'react';

import StyledRoot from './Root.style';
import Header from '../../components/Header.component';
import Footer from '../../components/Footer.component';

const Root = ({ children }) => (
    <StyledRoot>
        <Header />
        <div className="main">
            {children}
        </div>
        <Footer />
    </StyledRoot>
);

export default Root;
