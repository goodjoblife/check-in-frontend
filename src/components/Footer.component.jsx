import React from 'react';
import styled from 'styled-components';
import BlankLink from './BlankLink.component';
import logo from '../assets/logo-and-name.png';
import goodjobLogo from '../assets/goodjob-and-name.png';

const StyledFooter = styled.div`
    background-color: #222;
    border-top: 1px solid #FCD406;
    padding-top: 15px;
    text-align: center;
    span {
        color: white;
    }
    .item:not(:last-child) {
        margin-bottom: 10px;
    }
    .item a {
        color: white;
        cursor: pointer;
        text-decoration: none;
        &:visited {
            color: white;
        }
        &:hover {
            color: #FCD406;
        }
    }
    .logo {
        height: 45px;
        margin-bottom: 10px;
    }
    .goodjob-and-logo {
        height: 30px;
    }
    .powered-by {
        vertical-align: middle;
    }
`;

const Footer = () => {
    return (
        <StyledFooter>
            <div className="logo">
                <a href={`${process.env.PUBLIC_URL}/`}>
                    <img src={logo} alt="GoodJob 功德無量打卡機" className="logo"/>
                </a>
            </div >
            <div className="item">
                <span className="powered-by"> Powered By </span>
                <a target="_blank" rel="noopener noreferrer" href="https://www.goodjob.life/">
                    <img src={goodjobLogo} alt="GoodJob 好工作評論網" className="goodjob-and-logo"/>
                </a>
            </div>
            <div className="item">
                <BlankLink href="https://www.facebook.com/goodjob.life/"> Facebook 臉書專頁 </BlankLink> /
                <BlankLink href="https://github.com/goodjoblife/LaborUnion"> Github Repo </BlankLink>
            </div>
        </StyledFooter>
    );
};

export default Footer;