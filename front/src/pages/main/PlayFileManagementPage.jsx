import React from 'react';
import styled from 'styled-components';

import useAuthority from 'hooks/useAuthority';
import PlayFileManagementSearch from 'components/search/PlayFileManagementSearch';

const PlayFileManagementPage = () => {
    const adminName = 'play';

    return (
        <Wrapper>
            {useAuthority(adminName) ? 
                <PlayFileManagementSearch />
                :
                <div>권한이 없습니다.</div>
            }
        </Wrapper>
    )
}
const Wrapper = styled.div`
`;


export default PlayFileManagementPage;