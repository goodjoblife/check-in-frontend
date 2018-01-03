import styled from 'styled-components';

const StyledMain = styled.div`
    background-color: #222;
    color: white;
    max-width: 1100px;
    margin: auto;
    padding: 0 50px;

    .title {
        color: #fcd406;
        text-align: center;
        margin-bottom: 60px;
    }

    @keyframes pulse {
        0% { box-shadow:0 0 30px #fcd406, inset 0 0 10px #fcd406; }
        50% { box-shadow:0 0 150px #fcd406, inset 0 0 20px #fcd406; }
        100% { box-shadow:0 0 30px #fcd406, inset 0 0 10px #fcd406; }
    }
    .circle {
        margin: auto;
        color: #fcd406;
        background-color: transparent;
        width: 300px;
        height: 300px;
        border-radius: 50%;
        box-shadow: 0 0 150px #fcd406, inset 0 0 20px #fcd406;
        -webkit-animation: pulse 2s linear 1s infinite;
    }

    .circle p {
        display: block;
        text-align: center;
        line-height: 100px;
        font-size: 24px;
        color: #fcd406;
        text-shadow: 0 0 4px #fcd406;
    }

    .call-to-action {
        margin-top: 100px;
        margin-bottom: 50px;
        display: flex;
        justify-content: center;
    }
`;

export default StyledMain;