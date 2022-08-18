import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import NavigationTitle from './component/NavigationTitle';
import NavigationButton from './component/NavigationButton';
import ModalWrapper from 'components/modal/ModalWrapper';
import NavigateModal from 'components/modal/NavigateModal';
import Logo from 'components/Logo';

import localStoreService from 'utils/localStoreService';
import navigationData from 'assets/dummy/navigation.json';

const DefaultNavigation = () => {
    const { page } = useParams();
    const [ isOpenModal, setIsOpenModal ] = useState(false);

    const onClickModal = () => {
        setIsOpenModal(!isOpenModal);
    }
    const storeClear = () => {
        localStoreService.delete('token');
    }

    return (
        <Wrapper>
            { isOpenModal && 
                <ModalWrapper>
                    <NavigateModal 
                        onClickModal={onClickModal}
                        nextFrunction={storeClear}
                        text={'로그아웃 하시겠습니까'}
                        path={'/'}
                    />
                </ModalWrapper>
            }
            <Logo size={10} background={'#00000045'} padding={20}/>
            {navigationData.map(({title, list}, index) => (
                <NavigationButtonWrapper key={`navigationData` + index}>
                    <NavigationTitle title={title} />
                    {list.map(({admin ,path, text}) => (
                        <NavigationButton 
                            key={path}
                            auth={admin}
                            path={path} 
                            text={text}
                            click={(path.split('/')[path.split('/').length - 1] === page).toString()}
                        />
                    ))}
                </NavigationButtonWrapper>
            ))}
            <Logout onClick={onClickModal}>로그아웃</Logout>
        </Wrapper>
    )
}
const Wrapper = styled.div`
    height: 100vh;
    width: 216px;
    border-right: 1px solid black;
    background-color: #1f2e54;
`;
const Logout = styled.div`
    ${({theme}) => theme.divCommon.flexColumnCenterCenter}
    position: absolute;
    bottom: 0;
    width: inherit;
    height: 40px;
    background-color: #00000045;
    border: none;
    color: #FFF;
    font-size: 16px;
    :hover{
        cursor: pointer;
    }
`;
const NavigationButtonWrapper = styled.div`
    margin: 36px 0;
`;

export default React.memo(DefaultNavigation);