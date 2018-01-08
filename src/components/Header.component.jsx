import React from 'react';
import styled from 'styled-components';

import LinkButton from './LinkButton.component';
import logo from '../assets/logo-and-name.png';

import { MEDIA } from '../constants/style.constant';
import { botUrl } from '../constants/config.constant';

const StyledHeader = styled.div`
    background-color: #222;
    box-shadow: 0 0 8px rgba(0,0,0,.11);
    font-weight: 300;
    border-bottom: 1px solid #FCD406;
    position: fixed;
    top: 0;
    width: 100%;
    height: 65px;
    z-index: 10000;
    @media (max-width: ${MEDIA.SM_MAX}px) {
        height: 55px;
    }
    .header-container {
        max-width: 1100px;
        margin: auto;
        padding: 0 50px;
        @media (max-width: ${MEDIA.SM_MAX}px) {
            max-width: 100%;
            padding: 0 10px;
        }
        @media (max-width: ${MEDIA.XS_MAX}px) {
            max-width: 100%;
            padding: 0 10px;
        }
        .header-logo {
            padding: 10px 0;
            height: 65px;
            @media (max-width: ${MEDIA.SM_MAX}px) {
                height: 55px;
            }
        }
        .cta-button {
            margin-top: 8px;
            padding: 10px 20px;
            float: right;
            @media (max-width: ${MEDIA.SM_MAX}px) {
                margin-top: 8px;
                padding: 7px 10px;
                font-size: 16px;
            }
            @media (max-width: ${MEDIA.XS_MAX}px) {
                margin-top: 8px;
                padding: 7px 10px;
                font-size: 14px;
            }
        }
    }
`;

const Header = () => {
    return (
        <StyledHeader>
            <div className="header-container">
                <a href={`${process.env.PUBLIC_URL}/`}><img src={logo} className="header-logo" alt="GoodJob 功德無量打卡機"></img></a>
                <LinkButton href={botUrl} alt="馬上開始使用" className="cta-button"> 開始做功德 </LinkButton>
            </div>
        </StyledHeader>
    );
};

export default Header;