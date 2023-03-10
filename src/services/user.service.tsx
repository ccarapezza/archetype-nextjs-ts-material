import getConfig from 'next/config';
import { fetchWrapper } from '../helpers/fetchWrapper';

const { publicRuntimeConfig } = getConfig();
//const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;

export const userService = {
    register,
    /*
    getAll,
    getById,
    update,
    delete: _delete
    */
};

class UserRegistration{
    email: String | undefined;
    username: String | undefined;
    password: String | undefined;
}

function register(user: UserRegistration) {
    console.log("publicRuntimeConfig ",publicRuntimeConfig)
    return fetchWrapper.post(`${publicRuntimeConfig.apiUrl}/api/auth/signup`, user)
    .then(async res => {
        if(res.ok){
            return res.json();
        }else{
            return Promise.reject(res);
        }
    });
}
/*
function getAll() {
    return fetchWrapper.get(baseUrl);
}

function getById(id: Number) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function update(id: Number, params: Object) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id: Number) {
    return fetchWrapper.delete(`${baseUrl}/${id}`);
}
*/