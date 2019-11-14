import { courseModule } from "../../api/api";

import {
    GET_ALL_QUESANS
} from "../actionTypes";

export const reactjs = () => {
    return async (dispatch) => {
        await courseModule.getQuesans()
            .then(res => {
                var data = {
                    type: GET_ALL_QUESANS,
                    payload: res
                }
                dispatch(data);
            })
            .catch(error => {
                throw (error);
            });
    };
}