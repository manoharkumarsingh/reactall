import {
    GET_ALL_QUESANS
} from "../actionTypes";

const initialState = {
    quesans: { data: [] }
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ALL_QUESANS:
            return {
                ...state,
                quesans: action.payload
            };
        default:
            return state;
    }
}
