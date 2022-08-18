import React from 'react';
import styled from 'styled-components';

import Sinup from 'components/auth/Sinup';

const SinupPage = () => {
    return (
        <Wrapper>
            <Sinup />
        </Wrapper>
    )
}
const Wrapper = styled.div``;

export default SinupPage;