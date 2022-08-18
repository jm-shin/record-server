export const SET_USER = 'user/SET_USER';

export const setUser = (data) => {
    return {
        type: SET_USER,
        data,
    };
}

const initialState = {
    id: null,
    email: null,
    username: null,
    auth: {
        "super": 1,
        "play": 0,
        "download": 0,
        "statistics": 0,
        "nms": 0,
        "process": 0,
        "acLookup": 0,
        "acCreate": 0,
        "auLookup": 0,
        "auCreate": 0
    }
}

export default function setUserReducer ( state = initialState, action ) {
    switch(action.type){
        case SET_USER:
            return {
                ...initialState,
                id: action.data.id,
                email: action.data.email,
                username: action.data.username,
            }
        default:
            return state
    }
}