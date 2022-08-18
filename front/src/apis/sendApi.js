import api from './common';

export default {
    postLogin: ({id, password}) => {
        return api.post(`/api/auth/login`, {id, password})
    },

    postRegister: ({id,username,password,email}) => {
        return api.post(`/api/register`, {id, username, password, email});
    },

    getRegisterCheckId: (id) => {
        return api.get(`/api/register/dupcheck/id/${id}`);
    },

    getRegisterCheckEmail: (email) => {
        return api.get(`/api/register/dupcheck/email/${email}`);
    },

    getUser: (id) => {
        return api.get(`/api/users/${id}`);
    }
}