import { ADD_USER } from "./actions";

const addUserAction = (newUser) => {
    console.log(newUser);
    return {
        type: ADD_USER,
        payload: newUser
    }
}
export default addUserAction;