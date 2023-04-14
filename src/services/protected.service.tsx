import getConfig from 'next/config';
import { fetchWrapper } from '../helpers/fetchWrapper';

const { publicRuntimeConfig } = getConfig();

export const protectedService = {
    _protected,   
};

function _protected() {
    return fetchWrapper.post(`${publicRuntimeConfig.apiUrl}/api/protected/protected`)
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