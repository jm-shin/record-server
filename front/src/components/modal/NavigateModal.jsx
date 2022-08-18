import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const NavigateModal = ({onClickModal, nextFrunction, text, path}) => {
    const navigate = useNavigate();
    return (
        <Wrapper>
            <WarningMessage>{text}</WarningMessage>
            <ButtonWrapper>
                <CancelButton onClick={onClickModal}>취소</CancelButton>
                <ConfirmButton onClick={() => {
                    nextFrunction()
                    onClickModal()
                    navigate(path)
                }}>확인</ConfirmButton>
            </ButtonWrapper>
        </Wrapper>
    )
}
const Wrapper = styled.div`
    ${({theme}) => theme.divCommon.flexColumnCenterCenter}
    font-family: 'Jua', sans-serif;
    width: 320px;
`;
const WarningMessage = styled.div`
    margin-bottom: 32px;
    padding: 16px;
    font-size: 24px;
    text-align: center;
    word-break: keep-all;
`;
const ButtonWrapper = styled.div`
    display: flex;
`;
const Button = styled.div`
    ${({theme}) => theme.divCommon.flexCenterCenter}
    position: absolute;
    bottom: 0;
    border-top: 1px solid black;
    width: 160px;
    height: 34px;
    :hover{
        cursor: pointer;
        background-color: #1f2e54;
        color: white;
    }
`;
const CancelButton = styled(Button)`
    left: 0;
    border-right: 1px solid black;
    :hover{
        border-bottom-left-radius: 16px;
    }
`;
const ConfirmButton = styled(Button)`
    border-left: 1px solid black;
    :hover{
        border-bottom-right-radius: 16px;
    }
`;

export default React.memo(NavigateModal);