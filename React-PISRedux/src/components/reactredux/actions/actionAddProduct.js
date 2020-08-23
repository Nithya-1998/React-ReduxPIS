// export default ADD_PRODUCT = 'ADD_PRODUCT';
import { ADD_PRODUCT } from './actions';
export const addProduct = (product) => {
    console.log(product);
    return {
        type: ADD_PRODUCT,
        payload: product
    }
}