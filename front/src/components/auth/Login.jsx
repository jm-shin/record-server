import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import sendApi from 'apis/sendApi';
import { setUser } from 'store/user.js';
import Logo from 'components/Logo';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ alertMessage, setAlertMessage ] = useState('아이디와 비밀번호를 입력하세요');
    const warnningText = ['* 부여받은 아이디가 없으면 로그인할 수 없습니다.', '* 로그인이 안 될 경우 관리자에게 문의하세요.'];
    const userIdRef = useRef();
    const userPwRef = useRef();

    const onSubmit = (e) => {
        e.preventDefault();
        sendApi.postLogin({
            id: userIdRef.current.value, 
            password: userPwRef.current.value
        }).then((response) => {
            localStorage.setItem('token', response.data.access_token)
            sendApi.getUser(userIdRef.current.value)
            .then((response) => {
                dispatch(setUser(response.data))
                navigate('/main/play-file-management');
            }).catch((error) => {
                console.log(error);
            })
        }).catch((error) => {
            setAlertMessage('아이디와 비밀번호가 일치하지 않습니다')
        })
    }

    return (
        <Wrapper>
            <LoginWrapper>
                <Logo size={16} />
                <LoginForm onSubmit={onSubmit}> 
                    <InputId 
                        type='text'
                        id='id'
                        placeholder='아이디'
                        ref={userIdRef}
                        onInvalid={e => {e.target.setCustomValidity('아이디를 입력해 주세요')}}
                        onInput={e => e.target.setCustomValidity('')}
                        autoComplete='off'
                        required
                    />
                    <InputPw 
                        type='password'
                        id='pw'
                        placeholder='비밀번호' 
                        ref={userPwRef}
                        onInvalid={e => e.target.setCustomValidity('비밀번호를 입력해 주세요')}
                        onInput={e => e.target.setCustomValidity('')}
                        autoComplete='off'
                        required
                    />
                    <LoginButton
                        id='submit'
                        type='submit'
                        value='로그인'
                    />
                    <ErrorMessage>{alertMessage}</ErrorMessage>
                </LoginForm>
                <WrappingWrapper>
                    {warnningText.map((text, index) => (
                        <WranningText key={`wranning-text-${index}`}>{text}</WranningText>
                    ))}
                </WrappingWrapper>
            </LoginWrapper>
        </Wrapper>
    )
}
const Wrapper = styled.div`
    ${({theme}) => theme.divCommon.flexColumnCenterCenter}
    width: 100vw;
    height: 100vh;
    background-color: #1a2647;
`;
const LoginWrapper = styled.div`
    ${({theme}) => theme.divCommon.flexColumnCenterCenter}
`;
const LoginForm = styled.form`
    ${({theme}) => theme.divCommon.flexColumnCenterCenter}
`;
const InputId = styled.input`
    height: 40px;
    width: 226px;
    margin-bottom: 11px;
    border-radius: 4px;
    border: none;
    text-indent: 16px;
    outline: none;
    :focus {background-color:#f8fae1;}
`;
const InputPw = styled(InputId)``;
const LoginButton = styled.input`
    ${({theme}) => theme.divCommon.flexColumnCenterCenter}
    height: 47px;
    width: 226px;
    margin-top: 11px;
    border-radius: 4px;
    background-color: #19bc31;
    border: none;
    color: #FFF;
    font-size: 18px;
    :hover{
        cursor: pointer;
    }
`;
const ErrorMessage = styled.div`
    margin-top: 16px;
    width: fit-content;
    color: #ffe46bdb;
    font-size: 14px;
`;
const WrappingWrapper = styled.div`
    margin: 16px auto;
`;
const WranningText = styled.div`
    text-align: center;
    font-size: 14px;
    color: #7f8595;
    width: 300px;
    line-height: 20px;
`;

export default Login;