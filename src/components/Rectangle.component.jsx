import React from 'react';
import styled from 'styled-components';

const StyledRectangle = styled.a`
    border: 1px solid #FCD406;
    box-sizing: border-box;
    width: 250px;
    height: 250px;
    padding: 30px 20px;
    margin: 10px;
    color: #FCD406;
    text-decoration: none;
    text-align: center;
    svg path {
        fill: #FCD406;
    }
    p {
        color: white;
    }
    transition: background-color 0.75s ease;
    transition: color 0.25s ease;
    &:hover {
        background-color: #FCD406;
        border-color: #222;
        color: #222;
        text-decoration: none;
        cursor: ${props => props.href ? 'pointer': 'initial' };
        svg path {
            fill: #222;
        }
        p {
            color: #222;
        }
    }
    .rec-icon {
        width: 50px;
        height: 50px;
    }
`;

const Rectangle = ({ SVGIcon, title, content, href }) => {
    return (
        <StyledRectangle
            className="align-center"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
        >
            <SVGIcon className="rec-icon" alt="" />
            <h3 className="rec-title align-center">{title}</h3>
            <p className="rec-content align-center">{content}</p>
        </StyledRectangle>
    );
}

export default Rectangle;