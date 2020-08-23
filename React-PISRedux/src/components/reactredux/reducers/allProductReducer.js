import axios from "axios";
import { ALL_PRODUCTS, ADD_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT } from '../actions/actions';
var initialState = axios.get('http://localhost:3000/allProduct/').then((response) => {
    console.log(response.data)
}, (error) => {
    console.log(error.data);
})
const allProductReducer = (state = initialState, action) => {
    console.log(action);

    console.log(state)
    // var allProduct = [];
    switch (action.type) {
        case ALL_PRODUCTS:
            console.log(action.payload);
            // state = action.payload;
            console.log(state);
            return action.payload;
        case ADD_PRODUCT:
            console.log(action.payload);
            axios.post('http://localhost:3000/allProduct/', action.payload).then((response) => {
                console.log(state);
                console.log([...state, response.data]);
                return ([...state, response.data]);
            }, (error) => {
                console.log(error.data)
                return error.data;
            });
            break;
        case UPDATE_PRODUCT:
            let prod = action.payload
            console.log(action.payload.id);
            axios.put('http://localhost:3000/allProduct/' + action.payload.id, prod).then((response) => {
                console.log(state);
                console.log(response.data);
                return (state);
            }, (error) => {
                console.log(error.data)
            });
            break;
        case DELETE_PRODUCT:
            axios.delete('http://localhost:3000/allProduct/' + action.payload.id).then((response) => {
                console.log(state);
                axios.get('http://localhost:3000/allProduct/').then((res) => {
                    state = res.data;
                    console.log(res.data);
                    console.log(state);
                })
                return (state);
            }, (error) => {
                console.log(error.data)
            });
            break;
        default:
            break;
    }
    return state;
}
export default allProductReducer;