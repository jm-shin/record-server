import React from 'react';
import styled from 'styled-components';

import Login from 'components/auth/Login';

const LoginPage = () => {
    return (
        <Wrapper>
            <Login />
        </Wrapper>
    )
}
const Wrapper = styled.div``;

export default LoginPage;