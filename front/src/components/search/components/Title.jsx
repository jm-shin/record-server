import React from 'react';
import styled from 'styled-components';

const Title = ({title}) => {
    return (
        <TitleWrapper>{title}</TitleWrapper>
    )
}
const TitleWrapper = styled.div`
    width: fit-content;
    background-color: #e7e7e7;
    padding: 4px 16px;
    border-radius: 12px;
    user-select: none;
`;

export default React.memo(Title);