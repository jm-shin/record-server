import React from 'react';
import styled from 'styled-components';

import CallTypeSearch from './components/CallTypeSearch';
import DateSearch from './components/DateSearch';
import CallerCalledSearch from './components/CallerCalledSearch';
import Submit from './components/Submit';

const PlayFileManagementSearch = () => {
    return (
        <Wrapper>
                <DateSearch />
                <CallTypeSearch />
                <CallerCalledSearchWapper>
                    <CallerCalledSearch />
                    <SubmitWrapper>
                        <Submit />
                    </SubmitWrapper>
                </CallerCalledSearchWapper>
        </Wrapper>
    )
}
const Wrapper = styled.div`
    margin: 16px;
    padding: 8px;
    background-color: #FFF;
`;
const CallerCalledSearchWapper = styled.div`
    display: flex;
`;
const SubmitWrapper= styled.div`
    ${({theme}) => theme.divCommon.flexColumnCenterCenter};
    padding: 8px;
`;

export default React.memo(PlayFileManagementSearch);