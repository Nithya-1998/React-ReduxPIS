import axios from "axios";
const addProductReducer = (state = null, action) => {
    console.log(action);
    switch (action.type) {
        case 'ADD_PRODUCT': {
            var product = {
                "name": action.payload
            }
            console.log(product);
            axios.post('http://localhost:3000/allProduct/', product).then((response) => {
                console.log(response.data);
                return [...state, response.data];
            }, (error) => {
                console.log(error.data)
            })
        }
            break;
        default:
            break;
    }

    return state;
}
export default addProductReducer;