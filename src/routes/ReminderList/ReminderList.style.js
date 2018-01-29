
import styled from 'styled-components';
import { MEDIA } from '../../constants/style.constant';

const StyledReminderList = styled.div`
    @media (max-width: 1100px) {
        padding: 0 35px;
    }
    @media (max-width: ${MEDIA.SM_MAX}px) {
        padding: 0 35px;
    }
    @media (max-width: ${MEDIA.XS_MAX}px) {
        padding: 0 10px;
    }

    .title {
        text-align: center;
        margin-bottom: 40px;
        padding-top: 20px;
    }

    .section {
        margin-bottom: 40px;
    }
`;

export default StyledReminderList;