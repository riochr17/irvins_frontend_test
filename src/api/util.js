const endpoint = 'http://localhost:3001';

function _get(path, success, failure) {
    fetch(`${endpoint}${path}`).then(res => res.json()).then(success, failure);
}

function _else(method, path, body, success, failure) {
    fetch(`${endpoint}${path}`, {
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(res => res.json()).then(success, failure);
}

function _post(path, body, success, failure) {
    return _else("POST", path, body, success, failure);
}

function _put(path, body, success, failure) {
    return _else("PUT", path, body, success, failure);
}

function _delete(path, body, success, failure) {
    return _else("DELETE", path, body, success, failure);
}

export {
    _get, _post, _put, _delete
}