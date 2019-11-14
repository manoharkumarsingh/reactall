import { Cart } from "../../json/index";
import {
    GET_CART_DETAILS,
    UPDATE_CART_DETAILS
} from "../actionTypes";

export const cartdetails = () => {
    return async (dispatch) => {
        var json = await Cart.mycart()
        var data = {
            type: GET_CART_DETAILS,
            payload: json
        }
        await dispatch(data);
    };
}

export const updatedcart = (json) => {
    console.log(json);
    return async (dispatch) => {
        var data = {
            type: UPDATE_CART_DETAILS,
            payload: json
        }
        await dispatch(data);
    };
}