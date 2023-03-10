export const fetchWrapper = {
    get,
    post,
    put,
    delete: _delete
};

function get(url, props = {}) {
    const requestOptions = {
        method: 'GET',
        ...props
    };
    return fetch(url, requestOptions);
}

function post(url, body, props = {}) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        ...props
    };
    return fetch(url, requestOptions);
}

function put(url, body, props = {}) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        ...props
    };
    return fetch(url, requestOptions);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url, props = {}) {
    const requestOptions = {
        method: 'DELETE',
        ...props
    };
    return fetch(url, requestOptions);
}