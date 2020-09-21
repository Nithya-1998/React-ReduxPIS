import { combineReducers } from "redux";
import allProductReducer from './allProductReducer'
import allUserReducer from "./allUserReducer";
import userNameReducer from "./nameReducer";
// import addProductReducer from "./addProductReducer";
const allReducers = combineReducers({

    allProducts: allProductReducer,
    allUser: allUserReducer,
    userName: userNameReducer,
    isLoggedIn:allUserReducer
    // addProduct:allProductReducer
});
export default allReducers;