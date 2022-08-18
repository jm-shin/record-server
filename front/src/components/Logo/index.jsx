import React from 'react';
import styled from 'styled-components';

import logo from 'assets/imgs/p_logo.png';

const Logo = ({size, background, padding}) => {
    return (
        <Wrapper background={background} padding={padding}>
            <LogoImage src={logo} size={size} draggable={false} />
            <Title size={size}>
                POINT-I
                <SubTitle size={size}>
                    RECORDING SERVER
                </SubTitle>
            </Title>
        </Wrapper>
    )
}
const Wrapper = styled.div`
    ${({theme}) => theme.divCommon.flexCenterCenter}
    background-color: ${({background}) => background};
    padding: ${({padding}) => padding}px;
    margin-bottom: 24px;
    user-select: none;
`;
const Title = styled.div`
    ${({theme}) => theme.divCommon.flexColumnCenter}
    color: #ffffff;
    font-family: 'Jua', sans-serif;
    font-size: ${({size}) => size * 2.5}px;
    margin-top: 8px;
`;
const SubTitle = styled.div`
    color: #d7d7d7d8;
    font-family: 'Jua', sans-serif;
    font-size: ${({size}) => size}px;
    margin-left: 16px;
    margin-top: -8px;
`;
const LogoImage = styled.img`
    width: ${({size}) => size * 4}px;
    margin-right: 8px;
    margin-top: 4px;
`;

export default React.memo(Logo);