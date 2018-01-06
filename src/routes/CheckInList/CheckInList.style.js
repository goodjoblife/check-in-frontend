import styled from 'styled-components';

const StyledCheckInList = styled.div`
    input {
        border: 1px solid #FCD406;
        padding: 5px;
    }

    .flex {
        display: flex;
    }
    .flex-space-between {
        justify-content: space-between;
    }
    .flex-align-center {
        align-items: center;
    }

    .title {
        text-align: center;
        margin-bottom: 40px;
        padding-top: 20px;
    }

    .menu-bar {
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;
        .date-container {
            display: flex;

            .start-date {
                margin-right: 25px;
            }
        }
    }

    .section {
        margin-bottom: 40px;
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

    .radio-button {
        background-color: #F0F0F0;
        margin-right: 10px;
        &:hover {
            background-color: #FCD406;
        }
        &:hover, & *:hover {
            cursor: pointer;
        }
        input {
            display: none;
        }
        label {
            margin: 0;
            padding: 5px 10px;
        }
    }
    .radio-button.checked {
        background-color: #FCD406;
    }

    .setting-section {
        padding: 20px;
        background-color: white;
        .salary-section {
            display: flex;
            align-items: center;

            .money-unit {
                margin-left: 5px;
            }
        }
    }
    .calc-container {
        justify-content: flex-end;
        button {
            padding-top: 10px;
            padding-bottom: 10px;
        }
    }
`;

export default StyledCheckInList;