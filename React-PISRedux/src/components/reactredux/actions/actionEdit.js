import {UPDATE_PRODUCT} from './actions';
const editAction = (product) =>{
    console.log(product);
    return {
        type:UPDATE_PRODUCT,
        payload:product
    }
}
export default editAction;