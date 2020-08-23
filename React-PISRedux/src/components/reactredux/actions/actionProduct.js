import { ALL_PRODUCTS } from './actions';
export const sendProducts = (allProducts) => {
    console.log(allProducts);
    return {
        type: ALL_PRODUCTS,
        payload: allProducts
    }
}
// export default sendProducts;