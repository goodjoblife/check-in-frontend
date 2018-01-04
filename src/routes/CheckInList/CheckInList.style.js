import styled from 'styled-components';

const StyledCheckInList = styled.div`
    .title {
        text-align: center;
        margin-bottom: 40px;
        padding-top: 20px;
    }
    .table {
        background-color: white;
    }

    .table th {
        font-size: .95em;
        line-height: 1.2em;
        letter-spacing: 0.05em;
        color: #777;
        padding: 30px 5px 10px 5px;
        border-bottom: 2px solid #ddd;
        vertical-align: bottom;

        &:first-child {
            padding-left: 20px;
        }
    }

    .table tbody tr:hover {
        background-color: rgba(0,0,0,.025);
    }

    .table td {
        text-align: left;
        font-size: .95em;
        line-height: 1.3em;
        font-size: .95em;
        line-height: 1.3em;
        border-bottom: 1px solid #ededed;
        padding: 12px 5px;
        transition: background-color .3s;

        &:first-child {
            padding-left: 20px;
        }
    }
`;

export default StyledCheckInList;