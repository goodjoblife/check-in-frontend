import styled from 'styled-components';
import { MEDIA } from '../constants/style.constant';

const StyledTable = styled.table`
  background-color: white;
  width: 100%;

  th {
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

  tbody tr:hover {
    @media (min-width: 1100px) {
      background-color: rgba(0,0,0,.025);
    }
  }

  td {
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

    .button {
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
}
`;

export default StyledTable;