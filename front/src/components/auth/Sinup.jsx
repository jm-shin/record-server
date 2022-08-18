import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import sendApi from 'apis/sendApi';
import CheckIcon from 'components/icon/CheckIcon';

import gradeData from 'assets/dummy/grade.json';

const Sinup = () => {
    const navigation = useNavigate();
    const [ checkState, setCheckState ] = useState({
        authority: true,
        id: false,
        pw1: false,
        pw2: false,
        name: false,
        email: false
    });
    const userAuthority = useRef();
    const userIdRef = useRef();
    const userPw1Ref = useRef();
    const userPw2Ref = useRef();
    const userNameRef = useRef();
    const userEmailRef = useRef();

    const onSubmit = (e) => {
        e.preventDefault();
        sendApi.postRegister({
            authority: JSON.parse(userAuthority.current.value),
            id: userIdRef.current.value,
            username: userNameRef.current.value,
            password: userPw1Ref.current.value,
            email: userEmailRef.current.value
        }).then(response => {  
            navigation('/');
        }).catch(error => {
            
        })
    }

    const deleteBlank = (str) => {
        return str.replaceAll(' ', '');
    }

    const handleSetCheckState = ({type, state}) => {
        if(checkState[type] !== state){
            setCheckState((prevState) => {
                return { ...prevState, [`${type}`]: state}
            })
        }
    }

    const checkId = (e) => {
        e.target.setCustomValidity('');
        clearTimeout(userIdRef.current.timeout);

        let isBlank = deleteBlank(userIdRef.current.value) === userIdRef.current.value;

        if(isBlank && userIdRef.current.value.length > 5){
            userIdRef.current.timeout = setTimeout(() => {
                sendApi.getRegisterCheckId(userIdRef.current.value)
                .then(() => {
                    userIdRef.current.check = true;
                    handleSetCheckState({type: 'id', state: true})
                })
                .catch(() => {
                    handleSetCheckState({type: 'id', state: false})
                    e.target.setCustomValidity('이미 있는 아이디입니다');
                })
            }, 300)
        }else if(!isBlank){
            handleSetCheckState({type: 'id', state: false})
            e.target.setCustomValidity('아이디에 공백이 들어갈 수 없습니다');
        }else{
            handleSetCheckState({type: 'id', state: false})
            e.target.setCustomValidity('아이디는 6글자 이상이어야 합니다');
        }
    }

    const checkPasswordStability = (e) => {
        e.target.setCustomValidity('');
        clearTimeout(userPw1Ref.current.timeout);

        const check = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,25}$/;
        let isBlank = deleteBlank(userPw1Ref.current.value) === userPw1Ref.current.value;

        if(isBlank){
            userPw1Ref.current.timeout = setTimeout(() => {
                if(check.test(userPw1Ref.current.value)){    
                    handleSetCheckState({type: 'pw1', state: true})
                }else{
                    handleSetCheckState({type: 'pw1', state: false})
                    e.target.setCustomValidity('비밀번호는 영문+숫자+특수문자 8자리 이상으로 이루어져야 합니다.')
                }
            }, 300) 
        }else{
            handleSetCheckState({type: 'pw1', state: false})
            e.target.setCustomValidity('비밀번호에 공백이 들어갈 수 없습니다');
        }
    }

    const checkPasswordSame = (e) => {
        e.target.setCustomValidity('');
        clearTimeout(userPw2Ref.current.timeout);

        userPw2Ref.current.timeout = setTimeout(() => {
            if(userPw2Ref.current.value.length === 0){
                handleSetCheckState({type: 'pw2', state: false})
            }else if(userPw1Ref.current.value === userPw2Ref.current.value && checkState.pw1){    
                handleSetCheckState({type: 'pw2', state: true})
            }
            else{
                handleSetCheckState({type: 'pw2', state: false})
                e.target.setCustomValidity('비밀번호가 일치하지 않습니다')
            }
        }, 300) 
    }

    const checkName = (e) => {
        e.target.setCustomValidity('');
        clearTimeout(userNameRef.current.timeout);

        let isBlank = deleteBlank(userPw1Ref.current.value) === userPw1Ref.current.value;
        if(isBlank){
            userNameRef.current.timeout = setTimeout(() => {
                if(userNameRef.current.value.length > 0){    
                    handleSetCheckState({type: 'name', state: true})
                }else{
                    handleSetCheckState({type: 'name', state: false})
                    e.target.setCustomValidity('이름을 입력해 주세요')
                }
            }, 300)
        }else{
            handleSetCheckState({type: 'name', state: false})
            e.target.setCustomValidity('이름에 공백이 들어갈 수 없습니다');
        }
    }

    const checkEmailStability = (e) => {
        e.target.setCustomValidity('');
        clearTimeout(userEmailRef.current.timeout);

        let isBlank = deleteBlank(userEmailRef.current.value) === userEmailRef.current.value;
        let isEmail = checkEmailForm(userEmailRef.current.value)

        if(isBlank){
            userEmailRef.current.timeout = setTimeout(() => {
                if(isEmail){
                    sendApi.getRegisterCheckEmail(userEmailRef.current.value)
                    .then((response) => {
                        console.log(userEmailRef.current.value);
                        console.log(response);
                        handleSetCheckState({type: 'email', state: true})
                    })
                    .catch((error) => {
                        handleSetCheckState({type: 'email', state: false})
                        e.target.setCustomValidity('이미 있는 이메일입니다');
                    })
                }else{
                    handleSetCheckState({type: 'email', state: false})
                    e.target.setCustomValidity('이메일 양식을 작성해 주세요');
                }
            }, 300)
        }else{
            handleSetCheckState({type: 'email', state: false})
            e.target.setCustomValidity('이메일에 공백이 들어갈 수 없습니다');
        }
    }

    const checkEmailForm = (str) => {
        if(str.includes('@') && str.split('@')[1] !== ''){
            return true;
        }else{
            return false;
        }
    }

    return (
        <Wrapper>
            <SinupWrapper>
                {/* <Logo /> */}
                <SinupTitle>
                    <Title>계정 추가</Title>
                </SinupTitle>
                <SinupForm onSubmit={onSubmit}>
                    <InputWrapperOut>
                        <Label>
                            권한
                        </Label>
                        <InputWrapperIn>
                            <SelectAuthority 
                                type='text'
                                id='authority'
                                ref={userAuthority}
                                autoComplete='off'
                                autoFocus='on'
                                required
                            >
                                {gradeData.map(({name, authority}) => (
                                    <OptionAuthority 
                                        key={gradeData + name} 
                                        value={JSON.stringify(authority)}
                                        title={JSON.stringify(authority)}
                                    >
                                        {name}
                                    </OptionAuthority>
                                ))}
                            </SelectAuthority>
                            <CheckIcon state={checkState.authority} />
                        </InputWrapperIn>
                    </InputWrapperOut>
                    <InputWrapperOut>
                        <Label>
                            아이디
                            <AlertMessage> - 6자리 이상</AlertMessage>
                        </Label>
                        <InputWrapperIn>
                            <InputId 
                                type='text'
                                id='id'
                                ref={userIdRef}
                                onChange={(e) => checkId(e)}
                                autoComplete='off'
                                required
                            />
                            <CheckIcon state={checkState.id} />
                        </InputWrapperIn>
                    </InputWrapperOut>
                    <InputWrapperOut>
                        <Label>
                            비밀번호
                            <AlertMessage> - 숫자+문자+특수문자 8자리이상 조합</AlertMessage>
                        </Label>
                        <InputWrapperIn>
                            <InputPw1
                                type='password'
                                id='pw1'
                                ref={userPw1Ref}
                                onChange={(e) => checkPasswordStability(e)}
                                autoComplete='off'
                                required
                            />
                            <CheckIcon state={checkState.pw1} />
                        </InputWrapperIn>
                    </InputWrapperOut>
                    <InputWrapperOut>
                        <Label>비밀번호 확인</Label>
                        <InputWrapperIn>
                            <InputPw2
                                type='password'
                                id='pw2'
                                ref={userPw2Ref}
                                onChange={e => checkPasswordSame(e)}
                                autoComplete='off'
                                required
                            />
                            <CheckIcon state={checkState.pw2} />
                        </InputWrapperIn>
                    </InputWrapperOut>
                    <InputWrapperOut>
                        <Label>이름</Label>
                        <InputWrapperIn>
                            <InputName
                                type='text'
                                id='name'
                                ref={userNameRef}
                                onChange={e => checkName(e)}
                                autoComplete='off'
                                required
                            />
                            <CheckIcon state={checkState.name} />
                        </InputWrapperIn>
                    </InputWrapperOut>
                    <InputWrapperOut>
                        <Label>이메일</Label>
                        <InputWrapperIn>
                            <InputEmail
                                type='text'
                                id='email'
                                ref={userEmailRef}
                                onChange={e => checkEmailStability(e)}
                                autoComplete='off'
                                required
                            />
                            <CheckIcon state={checkState.email} />
                        </InputWrapperIn>
                    </InputWrapperOut>
                    <SinupButton
                        type='submit'
                        value='확인'
                    />
                    <CancelButton to={'/'}>취소</CancelButton>    
                </SinupForm>
            </SinupWrapper>
        </Wrapper>
    )
}
const Wrapper = styled.div`
    ${({theme}) => theme.divCommon.flexColumnCenterCenter}
    width: fit-content;
    padding: 32px;
    //height: 100vh;
    background-color: #ffffffd5;
`;
const SinupWrapper = styled.div`
    ${({theme}) => theme.divCommon.flexColumnCenterCenter}
`;
const InputWrapperOut = styled.div`
    ${({theme}) => theme.divCommon.flexColumnCenter}
    padding-left: 24px;
    margin-bottom: 12px;
`;
const InputWrapperIn = styled.div`
    ${({theme}) => theme.divCommon.flexCenterCenter}
`;
const Label = styled.label`
    //color: #ffff42b6;
    font-family: 'Jua', sans-serif;
    font-size: 16px;
    margin-bottom: 2px;
    margin-top: 8px;
`;
const AlertMessage = styled(Label)`
    font-size: 12px;
    margin-top: 0;
`
const SinupTitle = styled.div`
    ${({theme}) => theme.divCommon.flexCenterCenter}
    margin-bottom: 8px;
`;
const Title = styled.div`
    ${({theme}) => theme.divCommon.flexColumnCenter}
    //color: #ffffff;
    font-family: 'Jua', sans-serif;
    font-size: 32px;
`;
const SinupForm = styled.form`
    ${({theme}) => theme.divCommon.flexColumnCenterCenter}
`;
const SelectAuthority = styled.select`
    height: 36px;
    width: 226px;
    border-radius: 4px;
    border: 0.5px solid black;
    text-indent: 16px;
    outline: none;
    :focus {background-color:#f8fae1;}
`;
const OptionAuthority = styled.option``;
const InputId = styled.input`
    height: 36px;
    width: 226px;
    border-radius: 4px;
    border: 0.5px solid black;
    text-indent: 16px;
    outline: none;
    :focus {background-color:#f8fae1;}
`;
const InputName = styled(InputId)``;
const InputPw1 = styled(InputId)``;
const InputPw2 = styled(InputId)``;
const InputEmail = styled(InputId)``;
const SinupButton = styled.input`
    ${({theme}) => theme.divCommon.flexColumnCenterCenter}
    height: 40px;
    width: 230px;
    margin-top: 16px;
    border-radius: 4px;
    background-color: #19bc31;
    border: none;
    color: #FFF;
    font-size: 18px;
    :hover{
        cursor: pointer;
    }
`;
const CancelButton = styled(Link)`
    margin-top: 8px;
    //color: #d7d6d6c4;
    font-size: 14px;
    text-decoration: none;
    :hover{
        cursor: pointer;
    }
`;

export default Sinup;