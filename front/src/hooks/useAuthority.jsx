import { useSelector } from 'react-redux';

const useAuthority = (target) => {
    const authority = useSelector(state => state.setUserReducer.auth)

    if(authority.super){    
        return 1;
    }else{
        return authority[`${target}`];
    }
}

export default useAuthority;