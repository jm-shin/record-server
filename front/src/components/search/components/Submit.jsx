import React from 'react';
import styled from 'styled-components';

const Submit = () => {
    return (
        <SubmitButton
            type={'submit'}
            value={'검색'}
        />
    )
}
const SubmitButton = styled.input`
    border: none;
    color: white;
    background-color: #19bc31b1;
    padding: 4px 16px;
    border-radius: 16px;
    font-size: 14px;
    font-weight: 700;
    :hover{
        cursor: pointer;
        background-color: #044bfd94;
    }
`;

export default React.memo(Submit);