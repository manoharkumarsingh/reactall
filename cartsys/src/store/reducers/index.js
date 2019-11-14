import { combineReducers } from "redux";
import Cart from "./cart-reducer";
const allReducers = combineReducers({
    Cart: Cart
});

export default allReducers;
