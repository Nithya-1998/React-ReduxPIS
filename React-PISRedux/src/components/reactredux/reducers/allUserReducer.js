import { ALL_USERS, ADD_USER, LOGGED_IN } from '../actions/actions';
import axios from 'axios';
const allUserReducer = (state = [], action) => {
    // console.log(action);
    let allUser = []
    switch (action.type) {
        case ALL_USERS:
            console.log(allUser)
            allUser = action.payload;
            console.log(allUser)
            state = allUser
            return action.payload;
        case LOGGED_IN:
            console.log(action.payload);
            return true;
        case ADD_USER:
            console.log(action.payload);
            axios.post('http://localhost:3000/login', action.payload).then((response) => {
                console.log([...state, response.data]);
                console.log(state);
                allUser = response.data
                return [...state, response.data];
            }, (error) => {
                console.log(error.data);
            })
            break;
        default:
            break;
    }
    return state;
}
export default allUserReducer;