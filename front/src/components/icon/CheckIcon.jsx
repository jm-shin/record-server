import React from 'react';
import styled from 'styled-components';

import { BsFillCheckCircleFill, BsXCircleFill } from 'react-icons/bs';

const CheckIcon = ({state}) => {
    return(
        <Wrapper>
            {state ? 
                <BsFillCheckCircleFill 
                    color='#19bc31'
                    size={16}
                /> 
                : 
                <BsXCircleFill 
                    color='red'
                    size={16}
                />}
        </Wrapper>
    )
}
const Wrapper = styled.div`
    ${({theme}) => theme.divCommon.flexColumnCenterCenter}
    margin-left: 8px;
`;

export default React.memo(CheckIcon);