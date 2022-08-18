import React, { Suspense, lazy} from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import DefaultNavigation from 'components/navigation/DefaultNavigation';
import Loading from 'components/Loading';
import PlayFileManagementPage from './PlayFileManagementPage';
import StatistcsManagementPage from './StatistcsManagementPage';


const MainPage = () => {
    const  { page } = useParams();

    const renderSwitch = () => {
        switch(page){
            case 'play-file-management' :
                return <PlayFileManagementPage />
            case 'statistics-management' :
                return <StatistcsManagementPage />
            case 'manager' :
                return 
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
    height: 100;
`;
const MainWrapper = styled.div`
    height: 100%;
    flex:1;
    background-color: rgb(242, 242, 242);
`;

export default MainPage;