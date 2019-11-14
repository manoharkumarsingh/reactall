import {
    GET_ALL_SKILL
} from "../actionTypes";

const initialState = {
    courses: { data: [] }
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ALL_SKILL:
            return {
                ...state,
                courses: action.payload
            };
        default:
            return state;
    }
}
