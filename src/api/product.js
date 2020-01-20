import {
    _get, _post, _put, _delete
} from './util';

const getAllProduct = (success, failure) => _get('/products', success, failure);
const postNewProduct = (body, success, failure) => _post('/products', body, success, failure);
const putProductChanges = (body, success, failure) => _put(`/products/${body.id}`, body, success, failure);
const deleteProduct = (body, success, failure) => _delete(`/products/${body.id}`, body, success, failure);

export {
    getAllProduct,
    postNewProduct,
    putProductChanges,
    deleteProduct
}