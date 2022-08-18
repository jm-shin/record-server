import React, { Suspense, lazy} from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import DefaultNavigation from 'components/navigation/DefaultNavigation';
import Loading from 'components/Loading';
import SinupPage from './SinupPage';

const ManagementPage = () => {
    const  { page } = useParams();

    const renderSwitch = () => {
        switch(page){
            case 'account-create' :
                return <SinupPage />
            default :
                return <div>찾는 페이지가 없습니다</div>
        }
    }

    return (
        <Wrapper>
            <DefaultNavigation />
            <MainWrapper>
                <Suspense fallback={<Loading />}>
                    {renderSwitch()}
                </Suspense>
            </MainWrapper>
        </Wrapper>
    )
}
const Wrapper = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
`;
const MainWrapper = styled.div`
    ${({theme}) => theme.divCommon.flexCenterCenter}
    height: 100%;
    flex:1;
    background-color: rgb(194, 194, 194);
`;

export default ManagementPage;