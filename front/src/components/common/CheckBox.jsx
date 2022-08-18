import React from 'react';
import styled from 'styled-components';

import checkBoxReset from 'utils/checkBoxReset';

const CheckBox = ({name, value, text, checked, multiple, left, func}) => {
    return (
        <Label>
            {multiple ?             
                <InputBox 
                    type={'checkbox'}
                    name={name}
                    value={value}
                    defaultChecked={checked}
                    onChange={(e) => {
                        multiple && checkBoxReset(e.target)
                    }}
                    left={left}
                />
                :
                <InputBox 
                    type={'checkbox'}
                    name={name}
                    value={value}
                    checked={checked}
                    onChange={(e) => func()}
                    left={left}
                />
            }
            {text}
        </Label>
    )
}
const Label = styled.label`
    display: flex;
    margin: auto 16px;
    font-size: 16px;
    cursor: pointer;
`;
const InputBox = styled.input`
    appearance: none;
    border: 2px solid gainsboro;
    border-radius: 50%;
    margin: auto 6px auto ${({left}) => left !== undefined ? left : 20}px;
    padding: 5px;
    cursor: pointer;
    &:checked {
        border-color: transparent;
        background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
        background-size: 90% 90%;
        background-position: 50%;
        background-repeat: no-repeat;
        background-color: #044bfd94;      
    }
    &:hover {
        &:checked {
            background-color: #044bfd94;
        }
        background-color: #044bfd48;
    }
`;

export default React.memo(CheckBox);