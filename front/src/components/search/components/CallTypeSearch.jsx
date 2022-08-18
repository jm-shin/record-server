import React from 'react';
import styled from 'styled-components';

import CheckBox from 'components/common/CheckBox';
import Title from './Title';

const CallTypeSearch = () => {
    const callType = [
        {value: 'All', text:'All'},
        {value: 'LTE Call', text:'LTE'},
        {value: 'PPT Call', text:'PPT'},
        {value: 'Group Call', text:'Group'},
        {value: 'Unknown', text: 'Unknown'},
    ]

    return (
        <Wrapper>
            <Title title={'호유형'} />
            <CheckBoxWrapper>
                {callType.map(({value, text}, index) => (
                    <CheckBox 
                        key={value}
                        name={'call-type'}
                        value={value}
                        text={text}
                        checked={index === 0 ? true : false}
                        multiple={true}
                    />
                ))}
            </CheckBoxWrapper>
        </Wrapper>
    )
}
const Wrapper = styled.div`
    display: flex;
    //border: 1px solid black;
    padding: 8px;
    user-select: none;
`;
const CheckBoxWrapper = styled.div`
    display: flex;
`;

export default React.memo(CallTypeSearch);