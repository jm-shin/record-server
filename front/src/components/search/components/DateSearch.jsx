import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import CheckBox from 'components/common/CheckBox';
import Title from './Title';

import getDateTime from 'utils/getDateTime';

const DateSearch = () => {
    let nowDate = getDateTime();
    const [ startDate, setStartDate ] = useState(getDateTime('start'));
    const [ endDate, setEndDate ] = useState(nowDate);
    const [ isClickAll, setIsClickAll ] = useState(true);

    const checkStartDateValidate = (start) => {
        if(start > endDate){
            alert('시작 시각이 마감 시각보다 늦을 순 없습니다.');
            start = startDate;
        }else{
            setStartDate(start);
        }
    }
    const checkEndDateValidate = (end) => {
        if(startDate > end){
            alert('마감 시각이 시작 시각보다 빠를 순 없습니다.');
            end = endDate;
        }else{
            setEndDate(end);
        }
    }
    const changeCheckBoxChecked = (click) => {
        setIsClickAll(click !== undefined ? click : !isClickAll)
    }

    return (
        <Wrapper>
            <Title title={'날짜 선택'} />
            <DateWrapper>
                <InputBox 
                    type={'datetime-local'}
                    max={getDateTime()}
                    value={startDate}
                    readOnly={isClickAll}
                    onChange={(e) => checkStartDateValidate(e.target.value)}
                    onFocus={() => changeCheckBoxChecked(false)}
                    required
                />
                {'\u00A0 ~ \u00A0'}
                <InputBox 
                    id='endTime'
                    type={'datetime-local'}
                    min={startDate}
                    value={endDate}
                    readOnly={isClickAll}
                    onChange={(e) => checkEndDateValidate(e.target.value)}
                    onFocus={() => changeCheckBoxChecked(false)}
                    required
                />
            </DateWrapper>
            <CheckBox 
                name='date'
                value='all'
                text='전체'
                checked={isClickAll}
                left={0}
                func={changeCheckBoxChecked}
            />
        </Wrapper>
    )
}
const Wrapper = styled.div`
    display: flex;
    align-items: center;
    //border: 1px solid black;
    padding: 8px;
`;
const DateWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-left: 16px;
    font-weight: 700;
`;
const InputBox = styled.input`
    height: 24px;
    width: 232px;
    padding: 3px 16px;
    border-radius: 16px;
    border: 1.5px solid black;
    font-weight: 700;
    :focus {
        background-color: #0055ff14;
    }
`;
export default React.memo(DateSearch);