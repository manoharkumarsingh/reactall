import {
    GET_CART_DETAILS,
    UPDATE_CART_DETAILS
} from "../actionTypes";

const initialState = {
    mycart: [{}]
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CART_DETAILS:
            return {
                ...state,
                mycart: action.payload
            };
        case UPDATE_CART_DETAILS:
            return {
                ...state,
                mycart: action.payload
            };
        default:
            return state;
    }
}
