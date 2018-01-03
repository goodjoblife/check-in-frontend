import styled from 'styled-components';

const StyledRoot = styled.div`
    .body-container {
        background-color: ${props => (props.theme === 'black' ? '#222' : '#f9f9f9')};
    }
    .content-container {
        max-width: 1100px;
        min-height: 500px;
        margin: auto;
        padding-top: 75px;
    }
`;

export default StyledRoot;