import styled from 'styled-components';

import { MEDIA } from '../../constants/style.constant';

const StyledCheckInList = styled.div`
    @media (max-width: ${MEDIA.SM_MAX}px) {
        padding: 0 35px;
    }
    @media (max-width: ${MEDIA.XS_MAX}px) {
        padding: 0 10px;
    }

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
        }
        .date-picker:first-child {
            margin-right: 25px;
        }
        @media (max-width: ${MEDIA.SM_MAX}px) {
            display: inherit;
            .date-picker:first-child {
                margin-right: 0px;
            }
            .date-container {
                display: inherit;
            }
            .date-picker {
                margin-bottom: 15px;
            }
            .date-picker input {
                width: 100%;
            }
            .search-btn {
                width: 100%;
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

        @media (max-width: ${MEDIA.SM_MAX}px) {
            display: none;
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

        .delete-button {
            font-size: 15px;
            font-weight: 400;
        }

        &[data-th="操作"] {
            padding: 8px 5px;
        }

        @media (max-width: ${MEDIA.SM_MAX}px) {
            display: flex !important;
            width: 100%;
            padding: 10px 20px;

            &[data-th="操作"] {
                padding: 10px 20px;
            }

            &:last-child {
                border-bottom: 6px solid #eeeeed;
            }

            &::before {
                content: attr(data-th);
                flex: 0 0 100px;
                margin-right: 10px;
                width: 100px;
                text-align: left;
                font-size: .95em;
                line-height: 1.2em;
                letter-spacing: 0.05em;
                color: #777;
            }
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

            .salary-input-group {
                display: flex;
                align-items: center;
            }
            .salary-input-group .radio-button label {
                width: 100%;
                height: 100%;
            }
            .salary-input input{
                width: calc(100% - 30px);
                text-align: right;
            }
            .hourly-wage {
                text-align: right;
            }
            .money-unit {
                margin-left: 5px;
            }
        }

        @media (max-width: ${MEDIA.SM_MAX}px) {
            .salary-section {
                display: inherit;
                > label {
                    display: block;
                }
                .salary-input-group {
                    display: inherit;
                    .radio-button {
                        text-align: center;
                        margin-bottom: 5px;
                    }
                }
                .salary-input {
                    margin-bottom: 15px;
                }
            }
        }
    }

    .day-off-section {
        .day-off-group {
            display: flex;
            align-items: center;
        }

        @media (max-width: ${MEDIA.SM_MAX}px) {
            .day-off-group {
                display: inherit;
            }
            .day-off-group > label {
                display: block;
            }
            .day-off-group .radio-button {
                margin-bottom: 5px;
                text-align: center;
            }
        }
    }

    .calc-container {
        display: flex;
        justify-content: flex-end;
        button {
            padding-top: 10px;
            padding-bottom: 10px;
        }
        margin-top: 15px;

        @media (max-width: ${MEDIA.SM_MAX}px) {
            display: block;
            button {
                width: 100%;
            }
        }
    }
`;

export default StyledCheckInList;