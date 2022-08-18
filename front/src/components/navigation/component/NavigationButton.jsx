import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import useAuthority from 'hooks/useAuthority';

const NavigationButton = ({auth, path, text, click}) => {
    return (
        useAuthority(auth) ?
        <Wrapper 
            id={path} 
            to={path}
            click={click}
            draggable={false}
        >
            {text}
        </Wrapper>
        :
        null
    )
}
const Wrapper = styled(Link)`
    display: flex;
    padding: 12px 0 12px 32px;
    color: #ffffffe5;
    text-decoration: none;
    font-weight: 600;
    font-size: 14px;
    &{
        background-color: ${({click}) => click === 'true' && '#55a9fdaa'};
    }
`;

export default React.memo(NavigationButton);