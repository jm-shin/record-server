import React from 'react';
import styled from 'styled-components';

import { BiSlideshow } from 'react-icons/bi'

const NavigationTitle = ({title}) => {
    const renderSwicth = () => {
        switch(title){
            case '시스템 관리':
                return (
                    <IconWrapper>
                        
                    </IconWrapper>
                )    
            default: 
                return (
                    <IconWrapper>
                        <BiSlideshow color={'#6eb6ff'} size={18}/>
                    </IconWrapper>
                )           
        }
    }

    return (
        <Wrapper>
            {renderSwicth()}
            {title}
        </Wrapper>
    )
}
const Wrapper = styled.div`
    display: flex;
    color: #6eb6ff;
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 8px;
`;
const IconWrapper = styled.div`
    color: white;
    margin: 0 8px 0 24px;
`;

export default NavigationTitle;