import React from 'react';
import styled from 'styled-components';

import CallTypeSearch from './components/CallTypeSearch';
import DateSearch from './components/DateSearch';

const StatisticsManagementSearch = () => {
    return (
        <Wrapper>
                <DateSearch />
                <CallTypeSearch />
        </Wrapper>
    )
}
const Wrapper = styled.div`
    margin: 16px;
    padding: 8px;
    background-color: #FFF;
`;

export default React.memo(StatisticsManagementSearch);