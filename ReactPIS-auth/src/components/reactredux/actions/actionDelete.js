import { DELETE_PRODUCT } from './actions';
const deleteAction = (product) => {
    console.log(product);
    return {
        type: DELETE_PRODUCT,
        payload: product
    }
}
export default deleteAction;