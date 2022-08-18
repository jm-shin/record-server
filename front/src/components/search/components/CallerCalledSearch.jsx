import React from 'react';
import styled from 'styled-components';

import Title from './Title';

const CallerCalledSearch = () => {
    const defaultData = [
        {title:'발신'},
        {title:'착신'}
    ]

    return (
        <Wrapper>
            {defaultData.map(({title}) => (
                <CallerCalledWrapper key={title}>
                    <Title title={title} />
                    <Input 
                        type={'text'}
                    />
                </CallerCalledWrapper>
            ))}
        </Wrapper>
    )
}
const Wrapper = styled.div`
    display: flex;
    //border: 1px solid black;
    padding: 8px;
`;
const CallerCalledWrapper = styled.div`
    display: flex;
`;
const Input = styled.input`
    margin-left: 8px;
    margin-right: 32px;
    width: 200px;
    font-size: 16px;
    padding: 0 12px;
    border-radius: 8px;
    border: 1.5px solid black;
`;

export default React.memo(CallerCalledSearch);